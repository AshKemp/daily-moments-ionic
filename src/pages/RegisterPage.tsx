import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect } from "react-router";
import { useAuth } from "../auth";
import { auth } from "../firebase";
import { useState } from "react";

const RegisterPage: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("credential: ", credential);
    } catch (e) {
      console.log(e);
      setStatus({ loading: false, error: true });
    }
  };
  if (isLoggedIn) return <Redirect to="/my/entries" />;
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            ></IonInput>
          </IonItem>
        </IonList>
        {status.error && (
          <IonText color={"danger"}>Registration Failed.</IonText>
        )}

        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" routerLink="/login" fill="clear">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
