import { IonApp } from "@ionic/react";
import { Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import AppTabs from "./AppTabs";
import { AuthContext } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);
  console.log(`rendering app with loggedIn=${isLoggedIn}`);
  return (
    <IonApp>
      <AuthContext.Provider value={{ isLoggedIn }}>
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
