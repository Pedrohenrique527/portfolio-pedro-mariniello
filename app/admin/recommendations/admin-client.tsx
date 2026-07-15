"use client";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFirebaseBrowserServices } from "../../../lib/firebase/client";

const ADMIN_EMAIL = "pedromarinho527@gmail.com";

type Item = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  photo: string | null;
  email: string;
  stars: number;
  comment: string;
  status: "pendente" | "aprovado" | "rejeitado";
  createdAt: string;
  approvedAt: string | null;
};

export default function AdminRecommendations() {
  const firebase = useMemo(() => getFirebaseBrowserServices(), []);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebase) {
      setAuthLoading(false);
      return;
    }

    return onAuthStateChanged(firebase.auth, (nextUser) => {
      setUser(nextUser);
      setAuthLoading(false);
    });
  }, [firebase]);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const token = await user.getIdToken();
      const response = await fetch("/api/admin/recommendations", {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível carregar as recomendações.");
      setItems(data.recommendations || []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Erro ao carregar recomendações.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user?.email?.toLowerCase() === ADMIN_EMAIL) void load();
  }, [user, load]);

  const patch = async (id: string, body: Record<string, unknown>) => {
    if (!user) return;
    setError("");
    const token = await user.getIdToken();
    const response = await fetch("/api/admin/recommendations", {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, ...body }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Não foi possível atualizar a recomendação.");
      return;
    }
    setEditing(null);
    await load();
  };

  const remove = async (id: string) => {
    if (!user || !confirm("Excluir esta recomendação permanentemente?")) return;
    const token = await user.getIdToken();
    const response = await fetch(`/api/admin/recommendations?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Não foi possível excluir a recomendação.");
      return;
    }
    await load();
  };

  const signIn = async () => {
    if (!firebase) return;
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(firebase.auth, provider);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Não foi possível entrar com o Google.");
    }
  };

  if (!firebase) {
    return (
      <AdminMessage
        title="Firebase não configurado"
        text="Adicione as variáveis públicas NEXT_PUBLIC_FIREBASE_* na Vercel."
      />
    );
  }
  if (authLoading) return <AdminMessage title="Verificando acesso" text="Aguarde um instante…" />;
  if (!user) {
    return (
      <main className="admin-login">
        <section>
          <span>PORTFÓLIO · ÁREA RESTRITA</span>
          <h1>Moderação de recomendações</h1>
          <p>Entre com a conta Google autorizada para revisar os depoimentos enviados pelo site.</p>
          {error && <p className="admin-auth-error">{error}</p>}
          <button onClick={signIn}>Entrar com Google</button>
          <a href="/">Voltar ao portfólio</a>
        </section>
      </main>
    );
  }
  if (user.email?.toLowerCase() !== ADMIN_EMAIL) {
    return (
      <main className="admin-login">
        <section>
          <span>ACESSO RESTRITO</span>
          <h1>Conta não autorizada</h1>
          <p>Use a conta {ADMIN_EMAIL} para acessar este painel.</p>
          <button onClick={() => signOut(firebase.auth)}>Sair desta conta</button>
          <a href="/">Voltar ao portfólio</a>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-recommendations">
      <header>
        <div>
          <span>PORTFÓLIO · MODERAÇÃO</span>
          <h1>Recomendações</h1>
          <p>Revise, edite e publique apenas depoimentos profissionais autênticos.</p>
        </div>
        <div>
          <a href="/">Ver portfólio ↗</a>
          <button onClick={() => signOut(firebase.auth)}>Sair</button>
        </div>
      </header>
      <section className="admin-summary">
        {(["pendente", "aprovado", "rejeitado"] as const).map((status) => (
          <article key={status}>
            <strong>{items.filter((item) => item.status === status).length}</strong>
            <span>{status}</span>
          </article>
        ))}
      </section>
      {error && <p className="admin-auth-error">{error}</p>}
      {loading ? (
        <p>Carregando recomendações…</p>
      ) : (
        <section className="admin-list">
          {items.length === 0 ? (
            <div className="admin-empty">Nenhuma recomendação recebida ainda.</div>
          ) : (
            items.map((item) => (
              <article key={item.id} className={`status-${item.status}`}>
                <header>
                  {item.photo ? <img src={item.photo} alt="" /> : <span>{item.name[0]}</span>}
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.role}{item.company ? ` · ${item.company}` : ""}</p>
                    <small>{item.email} · {new Date(item.createdAt).toLocaleDateString("pt-BR")}</small>
                  </div>
                  <b>{"★".repeat(item.stars)}</b>
                </header>
                {editing === item.id ? (
                  <EditForm
                    item={item}
                    onCancel={() => setEditing(null)}
                    onSave={(values) => patch(item.id, values)}
                  />
                ) : (
                  <blockquote>{item.comment}</blockquote>
                )}
                <footer>
                  <div>
                    <button onClick={() => patch(item.id, { status: "aprovado" })}>Aprovar</button>
                    <button onClick={() => patch(item.id, { status: "rejeitado" })}>Rejeitar</button>
                    <button onClick={() => setEditing(item.id)}>Editar</button>
                  </div>
                  <button className="delete" onClick={() => remove(item.id)}>Excluir</button>
                </footer>
              </article>
            ))
          )}
        </section>
      )}
    </main>
  );
}

function AdminMessage({ title, text }: { title: string; text: string }) {
  return (
    <main className="admin-login">
      <section>
        <span>PORTFÓLIO · CONFIGURAÇÃO</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <a href="/">Voltar ao portfólio</a>
      </section>
    </main>
  );
}

function EditForm({
  item,
  onCancel,
  onSave,
}: {
  item: Item;
  onCancel: () => void;
  onSave: (values: Record<string, unknown>) => void;
}) {
  return (
    <form
      className="admin-edit"
      onSubmit={(event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        onSave({
          name: form.get("name"),
          role: form.get("role"),
          company: form.get("company"),
          stars: Number(form.get("stars")),
          comment: form.get("comment"),
        });
      }}
    >
      <input name="name" defaultValue={item.name} />
      <input name="role" defaultValue={item.role} />
      <input name="company" defaultValue={item.company || ""} />
      <select name="stars" defaultValue={item.stars}>
        {[1, 2, 3, 4, 5].map((stars) => (
          <option value={stars} key={stars}>{stars} estrelas</option>
        ))}
      </select>
      <textarea name="comment" defaultValue={item.comment} rows={6} />
      <div>
        <button type="submit">Salvar edição</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}
