import { IonApp, IonLoading } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();

  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log(`rendering app with auth=${JSON.stringify(auth)}`);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <Switch>
            <Route exact path={"/login"}>
              <LoginPage />
            </Route>
            <Route exact path={"/register"}>
              <RegisterPage />
            </Route>
            <Route path={"/my"}>
              <AppTabs></AppTabs>
            </Route>
            <Redirect exact path="/" to={"/my/entries"} />
            <Route>
              <NotFoundPage></NotFoundPage>
            </Route>
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
