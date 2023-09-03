import { IonApp } from "@ionic/react";
import { Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import AppTabs from "./AppTabs";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={"/login"}>
            <LoginPage
              isLoggedIn={isLoggedIn}
              onLoginProp={() => setIsLoggedIn(true)}
            />
          </Route>
          <Route path={"/my"}>
            <AppTabs isLoggedIn={isLoggedIn}></AppTabs>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
