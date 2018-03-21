import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ShowCalendar from './main/ShowCalendar';
import Home from './main/Home';
import User from './main/User';
import Service from './main/Service';
import Login from './main/Login';
import Navbar from "./main/Navbar";
import MyAcc from "./main/MyAcc";
import {Col, Row} from "react-bootstrap";

class Routers extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Row>
                    <Col md={12} sm={12}>
                        <Navbar />
                        <Switch>
                            <Route exact path={"/home"} component={Home}/>
                            <Route path={"/auth/calendar"} component={ShowCalendar}/>
                            <Route path={"/auth/users"} component={User}/>
                            <Route path={"/auth/services"} component={Service}/>
                            <Route path={"/auth/showUser"} component={MyAcc}/>
                            <Route path={"/login"} component={Login}/>
                        </Switch>
                    </Col>
                </Row>
            </BrowserRouter>
        );
    }
}

export default Routers;