import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers';
import {Col, Row} from "react-bootstrap";
// import {MuiThemeProvider} from "material-ui";
let modules = (
    <Row>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
            {/*<MuiThemeProvider>*/}
            <Col md={12} sm={12}>
                <Routers/>
            </Col>
            {/*</MuiThemeProvider>*/}
    </Row>
);

ReactDOM.render(modules, document.getElementById("app"));

