import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { getFirebaseAdminServices } from "../../../lib/firebase/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RecommendationPayload = {
  name?: string;
  role?: string;
  company?: string;
  photo?: string;
  email?: string;
  stars?: number;
  comment?: string;
  website?: string;
};

type RecommendationRow = {
  name: string;
  role: string;
  company: string | null;
  photo: string | null;
  email: string;
  stars: number;
  comment: string;
  status: "pendente" | "aprovado" | "rejeitado";
  createdAt?: Timestamp | Date | string | null;
  approvedAt?: Timestamp | Date | string | null;
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function toISOString(value: Timestamp | Date | string | null | undefined) {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  return value.toDate().toISOString();
}

function validate(payload: RecommendationPayload) {
  const name = clean(payload.name, 100);
  const role = clean(payload.role, 120);
  const company = clean(payload.company, 120);
  const email = clean(payload.email, 180).toLowerCase();
  const comment = clean(payload.comment, 1800);
  const stars = Number(payload.stars);
  const photo = typeof payload.photo === "string" ? payload.photo : "";

  if (payload.website) return { error: "Não foi possível enviar." };
  if (name.length < 2 || role.length < 2) return { error: "Informe nome e cargo." };
  if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Informe um e-mail válido." };
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return { error: "Escolha de 1 a 5 estrelas." };
  if (comment.length < 30) return { error: "Escreva um depoimento com pelo menos 30 caracteres." };
  if (photo && (!/^data:image\/(jpeg|png|webp);base64,/.test(photo) || photo.length > 220_000)) {
    return { error: "A foto é inválida ou muito grande." };
  }

  return {
    values: {
      name,
      role,
      company: company || null,
      email,
      comment,
      stars,
      photo: photo || null,
      status: "pendente" as const,
    },
  };
}

export async function GET() {
  try {
    const { db } = getFirebaseAdminServices();
    const snapshot = await db.collection("recommendations").where("status", "==", "aprovado").limit(100).get();
    const rows = snapshot.docs
      .map((document) => ({ id: document.id, ...(document.data() as RecommendationRow) }))
      .sort((a, b) => {
        const aDate = toISOString(a.approvedAt) || toISOString(a.createdAt) || "";
        const bDate = toISOString(b.approvedAt) || toISOString(b.createdAt) || "";
        return bDate.localeCompare(aDate);
      })
      .slice(0, 30);
    const count = rows.length;
    const average = count ? rows.reduce((sum, row) => sum + row.stars, 0) / count : 0;

    return Response.json({
      recommendations: rows.map((row) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        company: row.company,
        photo: row.photo,
        stars: row.stars,
        comment: row.comment,
        createdAt: toISOString(row.createdAt),
      })),
      stats: { count, average: Number(average.toFixed(1)) },
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao carregar recomendações." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as RecommendationPayload;
    const result = validate(payload);
    if ("error" in result) return Response.json({ error: result.error }, { status: 400 });

    const { db } = getFirebaseAdminServices();
    const document = await db.collection("recommendations").add({
      ...result.values,
      createdAt: FieldValue.serverTimestamp(),
      approvedAt: null,
    });

    return Response.json(
      { id: document.id, message: "Recomendação enviada para aprovação." },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Erro ao enviar recomendação." },
      { status: 500 },
    );
  }
}
