import {
  App,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Parse service key from environment variables
const serviceKey: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,

  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
};

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
export { app as adminApp, adminDb };
