"use server";
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
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

export async function deleteDocument(roomId: string) {
  auth.protect();
  try {
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", "roomId")
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function inviteUserToDocument(roomId: string, email: string) {
  auth.protect();
  try {
    await adminDb.collection("users").doc(email).collection("rooms").doc(roomId).set({
      userId :email,
      role:"editor",
      createdAt: new Date(),
      roomId
    })
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
