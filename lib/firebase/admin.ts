import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const FALLBACK_ADMIN_EMAIL = "pedromarinho527@gmail.com";

export function getFirebaseAdminServices() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase não configurado. Defina as variáveis administrativas na Vercel.");
  }

  const app = getApps().length
    ? getApp()
    : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });

  return { auth: getAuth(app), db: getFirestore(app) };
}

export async function requireFirebaseAdmin(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;

  try {
    const services = getFirebaseAdminServices();
    const user = await services.auth.verifyIdToken(token);
    const adminEmail = (process.env.ADMIN_EMAIL || FALLBACK_ADMIN_EMAIL).toLowerCase();
    return user.email?.toLowerCase() === adminEmail ? services : null;
  } catch {
    return null;
  }
}
