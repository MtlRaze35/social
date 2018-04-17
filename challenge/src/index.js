import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

//import {withRouter} from "react-router-dom"; 
//above code to add to routes and use this.props.history.push()

ReactDOM.render(
   <BrowserRouter>
       <Switch>
           <App path='/' exact render={props => <App {...props} />} />
       </Switch>
   </BrowserRouter>,
   document.getElementById('root')
);
registerServiceWorker();