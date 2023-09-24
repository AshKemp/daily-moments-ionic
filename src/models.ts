import { DocumentSnapshot } from "@firebase/firestore";
export interface Entry {
  id: string;
  title: string;
  description: string;
  date: string;
  pictureUrl: string;
}

export function convertToEntry(doc: DocumentSnapshot): Entry {
  return { id: doc.id, ...doc.data() } as Entry;
}
