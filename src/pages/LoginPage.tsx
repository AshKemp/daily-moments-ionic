import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect } from "react-router";
import { useAuth } from "../auth";

interface Props {
  onLoginProp: () => void;
}

const LoginPage: React.FC<Props> = ({ onLoginProp }) => {
  const { isLoggedIn } = useAuth();
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
