import firebase from "firebase";
export interface Entry {
  id: string;
  title: string;
  description: string;
}

export function convertToEntry(
  doc: firebase.firestore.DocumentSnapshot
): Entry {
  return { id: doc.id, ...doc.data() } as Entry;
}