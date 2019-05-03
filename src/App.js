import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./components/Home/HomePage";
import Create from "./components/CreateOne";
import Edit from "./components/EditOne";
// import Manager from "./Manager";
// import Reports from "./Reports";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        {/* <Route path="/reports/:id" component={Reports} /> */}
        <Route path="/create" component={Create} />
        <Route path="/edit" component={Edit} />
        {/* <Route path="/getById/:id" component={Manager} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
