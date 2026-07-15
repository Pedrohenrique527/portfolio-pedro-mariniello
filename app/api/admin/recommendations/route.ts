import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { requireFirebaseAdmin } from "../../../../lib/firebase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type AdminRecommendationRow = {
  name?: string;
  role?: string;
  company?: string | null;
  photo?: string | null;
  email?: string;
  stars?: number;
  comment?: string;
  status?: "pendente" | "aprovado" | "rejeitado";
  createdAt?: Timestamp | Date | string | null;
  approvedAt?: Timestamp | Date | string | null;
};

function unauthorized() {
  return Response.json({ error: "Acesso não autorizado." }, { status: 403 });
}

function toISOString(value: Timestamp | Date | string | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return value.toDate().toISOString();
}

export async function GET(request: Request) {
  const firebase = await requireFirebaseAdmin(request);
  if (!firebase) return unauthorized();

  try {
    const snapshot = await firebase.db.collection("recommendations").limit(200).get();
    const data = snapshot.docs
      .map((document) => ({ id: document.id, ...(document.data() as AdminRecommendationRow) }))
      .sort((a, b) => (toISOString(b.createdAt) || "").localeCompare(toISOString(a.createdAt) || ""));

    return Response.json({
      recommendations: data.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        company: row.company,
        photo: row.photo,
        email: row.email,
        stars: row.stars,
        comment: row.comment,
        status: row.status,
        createdAt: toISOString(row.createdAt),
        approvedAt: toISOString(row.approvedAt),
      })),
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao carregar recomendações." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const firebase = await requireFirebaseAdmin(request);
  if (!firebase) return unauthorized();

  try {
    const payload = (await request.json()) as {
      id?: string;
      status?: "pendente" | "aprovado" | "rejeitado";
      name?: string;
      role?: string;
      company?: string;
      stars?: number;
      comment?: string;
    };
    const id = typeof payload.id === "string" ? payload.id.trim() : "";
    if (!id) return Response.json({ error: "ID inválido." }, { status: 400 });

    const values: Record<string, string | number | null | FieldValue> = {};
    if (payload.status && ["pendente", "aprovado", "rejeitado"].includes(payload.status)) {
      values.status = payload.status;
      values.approvedAt = payload.status === "aprovado" ? FieldValue.serverTimestamp() : null;
    }
    if (typeof payload.name === "string") values.name = payload.name.trim().slice(0, 100);
    if (typeof payload.role === "string") values.role = payload.role.trim().slice(0, 120);
    if (typeof payload.company === "string") values.company = payload.company.trim().slice(0, 120) || null;
    if (typeof payload.comment === "string") values.comment = payload.comment.trim().slice(0, 1800);
    if (Number.isInteger(payload.stars) && Number(payload.stars) >= 1 && Number(payload.stars) <= 5) {
      values.stars = Number(payload.stars);
    }
    if (!Object.keys(values).length) {
      return Response.json({ error: "Nenhuma alteração recebida." }, { status: 400 });
    }

    await firebase.db.collection("recommendations").doc(id).update(values);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao atualizar recomendação." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const firebase = await requireFirebaseAdmin(request);
  if (!firebase) return unauthorized();

  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) return Response.json({ error: "ID inválido." }, { status: 400 });

    await firebase.db.collection("recommendations").doc(id).delete();
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao excluir recomendação." },
      { status: 500 },
    );
  }
}
