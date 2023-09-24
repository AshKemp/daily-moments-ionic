import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { auth } from "../firebase";
import { signOut } from "@firebase/auth";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          color={"medium"}
          expand="block"
          onClick={() => signOut(auth)}
        >
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
