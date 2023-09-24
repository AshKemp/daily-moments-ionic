import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// import { entries } from "../data";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Entry, convertToEntry } from "../models";
import { useAuth } from "../auth";
import { add as addIcon } from "ionicons/icons";
import { formatDate } from "../utils";
import {
  collection,
  query,
  limit,
  onSnapshot,
  orderBy,
} from "@firebase/firestore";

const HomePage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const entriesRef = collection(firestore, "users", userId, "entries");
    const entriesQuery = query(entriesRef, orderBy("date", "desc"), limit(5));
    return onSnapshot(entriesQuery, ({ docs }) =>
      setEntries(docs.map(convertToEntry))
    );
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
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl}></IonImg>
                </IonThumbnail>
                <IonLabel>
                  <h2>{formatDate(entry.date)}</h2>
                  <h3>{entry.title}</h3>
                </IonLabel>
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
