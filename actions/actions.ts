"use server";
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const { sessionClaims } = await auth.protect();

  if (!sessionClaims?.email) {
    throw new Error("Session claims are invalid or email is missing.");
  }

  const DocCollectionRef = adminDb.collection("documents");
  const docRef = await DocCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}
