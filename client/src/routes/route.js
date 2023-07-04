import React from "react";
import { Switch, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from '../view/login'
import Home from '../view/home'

const Routes = () => (
        <Routes>
            <Route path="/login"  component={Login}/>
            <Route path="/home"  component={Home}/>
        </Routes>
)


export default Routes;