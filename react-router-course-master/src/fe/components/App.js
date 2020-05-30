import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Cms from './Cms';
import Login from "./Login";
import UserRegister from "./Login/UserRegister";

const App = () => (
    <div className="app-routes">
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={UserRegister} />
            <Route path="/" component={Cms}/>
        </Switch>
    </div>
);

export default App;
