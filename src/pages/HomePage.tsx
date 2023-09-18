import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import { entries } from "../data";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Entry, convertToEntry } from "../models";
import { useAuth } from "../auth";
import { add as addIcon } from "ionicons/icons";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(convertToEntry)));
  }, [userId]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => {
            return (
              <IonItem
                button
                key={entry.id}
                routerLink={`/my/entries/view/${entry.id}`}
              >
                {entry.title}
              </IonItem>
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
