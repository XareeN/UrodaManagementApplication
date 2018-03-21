import React from "react";
import {MuiThemeProvider} from "material-ui";
import AppBar from 'material-ui/AppBar';
import {url} from "../Urls";
import FlatButton from 'material-ui/FlatButton';
import {Menu, MenuItem, Popover} from "material-ui";
import Divider from 'material-ui/Divider';
import {Col, Row} from "react-bootstrap";


let header = {
    "Content-Type": "application/json"
};

class Navbar extends React.Component {
    constructor() {
        super();
        this.openSubMenu = this.handleOpenSubMenu.bind(this);
        this.closeSubMenu = this.handleCloseSubMenu.bind(this);
        this.state = {
            open: false,
            user: {
                firstName: "",
                lastName: "",
                eMail: ""
            },
        }
    }

    handleOpenSubMenu(event) {
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }

    handleCloseSubMenu() {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        fetch(url + "/auth/showUser", {
            method: "POST",
            body: "",
            header: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                user: findresponse
            })
        })
    };

    render() {
        return (
            <Row>
                <MuiThemeProvider>
                    <Col md={12} sm={12}>
                        <AppBar
                            title={"Menu"}
                            iconClassNameRight={"muidocs-icon-navigation-expand-more"}
                            iconElementRight={<FlatButton onClick={((event) => this.openSubMenu(event))}
                                                          label={this.state.user.eMail}/>}>
                        </AppBar>
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.closeSubMenu}
                        >
                            <Menu>
                                <MenuItem href="/auth/calendar" primaryText={"Kalendarz"}/>
                                <MenuItem href="/auth/services" primaryText={"Usługi"}/>
                                <MenuItem href="/auth/users" primaryText={"Użytkownicy"}/>
                                <Divider/>
                                <MenuItem href="/auth/showUser" primaryText={"Moje konto"}/>
                                <Divider/>
                                <MenuItem href="/logout" primaryText="Wyloguj się"/>
                            </Menu>
                        </Popover>
                    </Col>
                </MuiThemeProvider>
            </Row>

        );
    };
}

export default Navbar;