import { IonApp, IonLoading } from "@ionic/react";
import { Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import AppTabs from "./AppTabs";
import { AuthContext } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [authState, setAuthState] = useState({
    loading: true,
    isLoggedIn: false,
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({ loading: false, isLoggedIn: !!user });
    });
  }, []);
  console.log(`rendering app with authState=${authState}`);
  if (authState.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={{ isLoggedIn: authState.isLoggedIn }}>
        <IonReactRouter>
          <Switch>
            <Route exact path={"/login"}>
              <LoginPage />
            </Route>
            <Route path={"/my"}>
              <AppTabs></AppTabs>
            </Route>
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
