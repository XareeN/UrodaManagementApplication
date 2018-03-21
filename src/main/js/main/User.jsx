import React from "react";
import {Tab, Tabs} from "material-ui/Tabs/index";
import {MuiThemeProvider} from "material-ui";
import {Col, Row, Table} from "react-bootstrap";
import {url} from "../Urls";
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';


let header = {
    "Content-Type": "application/json"
};


class User extends React.Component {

    constructor() {
        super();
        // this.updateCheckBox = this.updateCheck.bind(this);
        this.saveBtn = this.saveButton.bind(this);
        this.updateDdm = this.handleChange.bind(this);
        this.delBtn = this.deleteBtn.bind(this);
        this.confDelBtn = this.confirmDeleteBtn.bind(this);
        this.handleCloseDial = this.handleCloseDialog.bind(this);
        this.modifyBtn = this.modifyButton.bind(this);
        this.confModBtn = this.confirmModifyButton.bind(this);
        this.state = {
            users: [],
            user: {
                id: "",
                firstName: "",
                lastName: "",
                eMail: ""
            },
            userToModify: {},
            userModified: {},
            value: '',
            update: [],

            imie: '',
            nazwisko: '',
            nrTel: '',
            data: '',
            eMail: '',

            imieM: '',
            nazwiskoM: '',
            nrTelM: '',
            dataM: '',
            eMailM: '',
            rola: [],
            haslo: '',

            modifyKey: '',
            open: false,
            openDialog: false,
            isLoading: true,
            idToDelete: [],
            deleteBtnDisabled: true,
            checkBoxDisabled: false,
            newUserSaveDisabled: true,


        }
    }

    updateCheck(event, bool, id) {
        if (bool) {
            console.log("checked", id);
            if (this.state.user.id === id) {
                this.state.idToDelete.splice(this.state.idToDelete.indexOf(id), 1);
            } else {
                this.state.idToDelete.push(id);
            }

        } else {
            console.log("unchecked", id);
            this.state.idToDelete.splice(this.state.idToDelete.indexOf(id), 1);
        }

        if (this.state.idToDelete.length >= 1) {
            this.setState({
                deleteBtnDisabled: false,
            })
        } else {
            this.setState({
                deleteBtnDisabled: true,
            })
        }

        console.log(this.state.idToDelete);
    }

    saveButton() {
        fetch(url + "/auth/addNewEmployee", {
            method: "POST",
            body: JSON.stringify({
                firstName: this.state.imie,
                lastName: this.state.nazwisko,
                telNo: this.state.nrTel,
                dateOfBirth: this.state.data,
                eMail: this.state.eMail,
                authorities: this.state.rola,
                isActive: '1',
                password: this.state.haslo,
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {

            this.setState({update: findresponse})

        }).then(() => {
            let update = this.state.update;
            let users = this.state.users;
            users = users.concat(update);
            this.setState({
                users
            });
            // console.log(users);
            this.setState({
                open: true,
            })
        })
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    handleUserPasswordInput(event, value){
        const evVal = event.target.value;
        const vaLen = value.length;

        console.log(vaLen + " : " + evVal);
        if(vaLen <= 7){
            this.setState({
                newUserSaveDisabled: true,
                haslo: evVal,
            })
        }
        else{
            this.setState({
                newUserSaveDisabled: false,
                haslo: evVal,
            });
            console.log("haslo: " + this.state.haslo)
        }

    }

    componentDidMount() {
        document.title = "UrodaApp | Użytkownicy";
        fetch(url + "/auth/showUsers", {
            method: "POST",
            body: "",
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                users: findresponse
            })
        }).then(() => {
            this.setState({
                isLoading: false,
                deleteBtnDisabled: true
            });
            console.log(this.state.user.id);

        });

        fetch(url + "/auth/showUser", {
            method: "POST",
            body: "",
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                user: findresponse
            })
        })
    };


    handleChange(event, index, value) {
        this.setState(
            {
                rola: [value],
                value
            });
    }

    handleDateChange(event, date) {
        console.log(date);
        let m = date.getMonth() + 1;
        let d = date.getDate();
        if (m < 10) {
            m = "0" + m;
        }
        if (d < 10) {
            d = "0" + d;
        }
        let customDate = date.getFullYear() + "-" + m + "-" + d;
        console.log(customDate);
        this.setState({
            data: customDate,
        })
    }

    deleteBtn() {
        this.setState({
            openDialog: true,
            open: false,
        })
    }

    confirmDeleteBtn() {
        fetch(url + "/auth/deleteEmployee", {
            method: "POST",
            body: JSON.stringify({
                id: this.state.idToDelete,
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                users: findresponse,
                isLoading: true
            })
        }).then(() => {
            this.setState({
                isLoading: false,
                idToDelete: [],
                openDialog: false,
                open: true,
                deleteBtnDisabled: true,
            })
        })
    }

    modifyButton(key) {
        let userToModify = this.state.users[key];
        this.setState({
            modifyKey: key,
            userToModify,
            openDialog2: true,
            open: false,
        });

        console.log(userToModify);
        console.log(key);
    }

    confirmModifyButton(){
        let imie = this.state.imieM;
        let nazwisko = this.state.nazwiskoM;
        let nrTel = this.state.nrTelM;
        let data = this.state.dataM;
        let eMail = this.state.eMailM;

        if (imie === '' || nazwisko === '' || nrTel === '' || data === '' || eMail === '') {
            console.log("coś ma wartość null");

            console.log(imie);
            console.log(nazwisko);
            console.log(nrTel);
            console.log(data);
            console.log(eMail);

            if (imie === '') {
                imie = this.state.userToModify.firstName;
            }
            if (nazwisko === '') {
                nazwisko = this.state.userToModify.lastName;
            }
            if (nrTel === '') {
                nrTel = this.state.userToModify.telNo;
            }
            if (data === '') {
                data = this.state.userToModify.dateOfBirth;
            }
            if (eMail === '') {
                eMail = this.state.userToModify.eMail;
            }
            console.log("sprawdźmy czy dalej");
            console.log(imie);
            console.log(nazwisko);
            console.log(nrTel);
            console.log(data);
            console.log(eMail);


            fetch(url + "/auth/updateEmployee", {
                method: "POST",
                body: JSON.stringify({
                    id: this.state.userToModify.id,
                    firstName: imie,
                    lastName: nazwisko,
                    telNo: nrTel,
                    dateOfBirth: data,
                    eMail: eMail,
                    authorities: this.state.userToModify.authorities,
                    isActive: this.state.userToModify.isActive,
                    password: this.state.userToModify.password,

                })
                ,
                headers: header,
                credentials: "same-origin"
            }).then((Response) => Response.json()).then((findresponse) => {

                this.setState({update: findresponse})


            }).then(() => {
                let usersList = this.state.users;
                let userModified = this.state.update;

                usersList[this.state.modifyKey] = userModified;

                console.log(userModified);

                this.setState({
                    users: usersList,
                });
                console.log("this.state.modifyKey : " + this.state.modifyKey);
                console.log("usersList[this.state.modifyKey] : " + usersList[this.state.modifyKey]);

            }).then(() => {
                this.setState({
                    open: true,
                    openDialog2: false,
                    isLoading: true,
                })
            }).then(() => {
                this.setState({
                    isLoading: false,
                })
            });



        }

    }

    handleCloseDialog() {
        this.setState({
            openDialog: false,
            openDialog2: false,
            open: false,
        })
    }


    render() {
        let styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
                fontFamily: "Helvetica",
            },
            helvetica: {
                fontFamily: "Helvetica",
            },
            deleteBtn: {
                alignItems: "center",
            },
            btnSave: {
                float: "right",
                marginTop: 16,
            },
            btnClear: {
                float: "left",
                marginTop: 16,
            },
            customPaper: {
                paddingLeft: 20,
                paddingRight: 20,
            }
        };

        let loader =
            <div align="center">
                <CircularProgress size={80} thickness={6}/>
            </div>
        ;


        let content =
            <Row>
                <Col md={12} sm={12}>
                    <Row>
                        <Col md={12} sm={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Imię</th>
                                    <th>Nazwisko</th>
                                    <th>Nr kontaktowy</th>
                                    <th>Data urodzenia</th>
                                    <th>E-mail</th>
                                    <th>Modyfikuj</th>
                                    {/*<th>Rola</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map((dynamicData, key) =>
                                    <tr key={key}>
                                        <td><Checkbox
                                            onCheck={(event, bool) => this.updateCheck(event, bool, dynamicData.id)}
                                            style={styles.checkbox}
                                            disabled={this.state.checkBoxDisabled}
                                        /></td>
                                        <td>{dynamicData.firstName}</td>
                                        <td>{dynamicData.lastName}</td>
                                        <td>{dynamicData.telNo}</td>
                                        <td>{dynamicData.dateOfBirth}</td>
                                        <td>{dynamicData.eMail}</td>
                                        <td><RaisedButton label={"click"} onClick={() => this.modifyBtn(key)}/></td>
                                        {/*<td>{console.log(dynamicData.authorities.pop())}</td>*/}
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row style={{position: "sticky", bottom: 15}}>
                        <Col md={12} sm={12}>
                            <RaisedButton label={"Usuń zaznaczone"} onClick={this.delBtn}
                                          disabled={this.state.deleteBtnDisabled}
                                          style={styles.deleteBtn}/>
                        </Col>
                    </Row>
                </Col>
            </Row>


            // <div align="center">
            //
            //
            // </div>
        ;

        const actions = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Usuń"
                primary={true}
                keyboardFocused={true}
                onClick={this.confDelBtn}
            />,
        ];

        const actions2 = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Zapisz"
                primary={true}
                keyboardFocused={true}
                onClick={this.confModBtn}
            />,
        ];

        return (
            <Row>
                <MuiThemeProvider>
                    <Col md={12} sm={12}>
                        <Tabs>
                            <Tab label="Zarządzaj użytkownikami">
                                <Row>
                                    <Col md={1} sm={1}/>
                                    <Col md={10} sm={10}>
                                        <h2 style={styles.headline}>Użytkownicy</h2>
                                        {
                                            this.state.isLoading ? loader : content
                                        }
                                    </Col>
                                    <Col md={1} sm={1}/>
                                </Row>
                            </Tab>
                            <Tab label="Dodaj użytkownika">
                                <Row>
                                    <Col md={2} sm={1}/>
                                    <Col md={8} sm={10}>
                                        <h2 style={styles.headline}>Wypełnij wszystkie pola</h2>
                                        <Paper zDepth={2} style={styles.customPaper}>
                                            <TextField hintText="Imię"
                                                       id={"imie"}
                                                       name={"imie"}
                                                       fullWidth={true}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}/>
                                            <Divider/>
                                            <TextField hintText="Nazwisko"
                                                       id={"nazwisko"}
                                                       name={"nazwisko"}
                                                       fullWidth={true}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}/>
                                            <Divider/>
                                            <TextField hintText="Tel. kontaktowy"
                                                       id={"nrTel"}
                                                       name={"nrTel"}
                                                       fullWidth={true}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}/>
                                            <Divider/>
                                            <DatePicker hintText="Data urodzenia"
                                                        id={"data"}
                                                        name={"data"}
                                                        fullWidth={true}
                                                        onChange={(event, date) => this.handleDateChange(event, date)}
                                                        underlineShow={false}/>
                                            {/*<TextField hintText="Data urodzenia" style={{marginLeft: 20}} id={"data"} underlineShow={false}/>*/}
                                            <Divider/>
                                            <TextField hintText="E-mail"
                                                       id={"eMail"}
                                                       name={"eMail"}
                                                       fullWidth={true}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}/>
                                            <Divider/>
                                            <SelectField
                                                floatingLabelText="Rola"
                                                name={"value"}
                                                value={this.state.value}
                                                fullWidth={true}
                                                onChange={((event, index, value) => this.handleChange(event, index, value))}
                                            >
                                                <MenuItem value={"USER"} primaryText="user"/>
                                                <MenuItem value={"EMPLOYEE"} primaryText="emp"/>
                                                <MenuItem value={"ADMIN"} primaryText="admin"/>
                                            </SelectField>
                                            {/*<TextField hintText="Rola" style={{marginLeft: 20}} id={"rola"} underlineShow={false}/>*/}
                                            <Divider/>
                                            {/*<TextField hintText="Czy aktywny" style={{marginLeft: 20}} id={"czyAktywny"} underlineShow={false}/>*/}
                                            {/*<Divider/>*/}
                                            <TextField hintText="Hasło"
                                                       id={"haslo"}
                                                       name={"haslo"}
                                                       fullWidth={true}
                                                       onChange={(event, value) => this.handleUserPasswordInput(event, value)}

                                                       type={"password"}
                                                       underlineShow={false}/>
                                            <Divider/>
                                        </Paper>
                                        <RaisedButton
                                            label="Zapisz"
                                            onClick={this.saveBtn}
                                            style={styles.btnSave}
                                            disabled={this.state.newUserSaveDisabled}
                                            primary={true}/>
                                        <RaisedButton
                                            label="Wyczyść pola"
                                            style={styles.btnClear}
                                            onClick={this.clearBtn}/>

                                    </Col>
                                    <Col md={2} sm={1}/>
                                </Row>
                            </Tab>
                        </Tabs>
                    </Col>

                    <Snackbar
                        open={this.state.open}
                        message={"Użytkownik dodany pomyślnie"}
                        autoHideDuration={4000}
                        // onRequestClose={this.handleCloseSnackbar}
                    />
                    <Dialog
                        title="Potwierdź decyzję"
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleCloseDial}
                    >
                        Czy na pewno chcesz usunąć zaznaczone pozycje?
                    </Dialog>
                    <Dialog
                        title="Modyfikuj"
                        actions={actions2}
                        modal={false}
                        open={this.state.openDialog2}
                        onRequestClose={this.handleCloseDial}
                        style={{overflow: "hidden"}}>
                        <TextField
                            name="imieM"
                            type="text"
                            id="imieM"
                            fullWidth={true}
                            floatingLabelText={"Imię"}
                            defaultValue={this.state.userToModify.firstName}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="nazwiskoM"
                            type="text"
                            id="nazwiskoM"
                            fullWidth={true}
                            floatingLabelText={"Nazwisko"}
                            defaultValue={this.state.userToModify.lastName}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="nrTelM"
                            type="text"
                            id="nrTelM"
                            fullWidth={true}
                            floatingLabelText={"Numer kontaktowy"}
                            defaultValue={this.state.userToModify.telNo}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="dataM"
                            type="text"
                            id="dataM"
                            fullWidth={true}
                            floatingLabelText={"Data urodzenia (YYYY-MM-DD)"}
                            defaultValue={this.state.userToModify.dateOfBirth}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="eMailM"
                            type="text"
                            id="eMailM"
                            fullWidth={true}
                            floatingLabelText={"E-mail"}
                            defaultValue={this.state.userToModify.eMail}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                    </Dialog>
                </MuiThemeProvider>
            </Row>

        );
    }
}

export default User;