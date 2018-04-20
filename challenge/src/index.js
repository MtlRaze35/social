import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Switch } from "react-router-dom";
import OtherProfile from "./components/OtherProfile";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Main from "./views/Main";
import Register from "./views/Register";

//import {withRouter} from "react-router-dom";
//above code to add to routes and use this.props.history.push()

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Login path="/" exact render={props => <Login {...props} />} />
      <Register path="/register" exact render={props => <Register {...props} />} />
      <Profile path="/profile" exact render={props => <Profile {...props} />} />
      <Main path="/main" exact render={props => <Main {...props} />} />/>
      <OtherProfile
        path="/otherUser"
        exact
        render={props => <OtherProfile {...props} />}
      />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
