import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect } from "react-router";

interface Props {
  onLoginProp: () => void;
  isLoggedIn: boolean;
}

const LoginPage: React.FC<Props> = ({ isLoggedIn, onLoginProp }) => {
  if (isLoggedIn) return <Redirect to="/my/entries" />;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLoginProp}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
