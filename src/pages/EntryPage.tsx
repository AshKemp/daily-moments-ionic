import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { Entry, convertToEntry } from "../models";
import { useAuth } from "../auth";
import { trash as trashIcon } from "ionicons/icons";
import { formatDate } from "../utils";
import { deleteDoc, doc, getDoc } from "@firebase/firestore";

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  const { userId } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const entryRef = doc(firestore, "users", userId, "entries", id);

    getDoc(entryRef).then((doc) => {
      setEntry(convertToEntry(doc));
    });
  }, [id, userId]);

  const handleDelete = async () => {
    const entryRef = doc(firestore, "users", userId, "entries", id);
    await deleteDoc(entryRef);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
