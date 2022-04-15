import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Weather from "./views/weather/weather";
import Notfound from "./views/notfound/notfound";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Weather} />
        <Route path="/weather" component={Weather} />
        <Route component={Notfound} />
      </Switch>
    </Suspense>
  );
}

export default App;
