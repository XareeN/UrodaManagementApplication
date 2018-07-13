import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers';
import {Col, Row} from "react-bootstrap";
// import {MuiThemeProvider} from "material-ui";
let modules = (
    <Row>

            {/*<MuiThemeProvider>*/}
            <Col md={12} sm={12}>
                <Routers/>
            </Col>
            {/*</MuiThemeProvider>*/}
    </Row>
);

ReactDOM.render(modules, document.getElementById("app"));

