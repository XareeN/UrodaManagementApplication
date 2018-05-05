import React from "react";
import {MuiThemeProvider} from "material-ui";
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {url} from "../Urls";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import {Col, Row} from "react-bootstrap";
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';


let header = {
    "Content-Type": "application/json"
};


class MyAcc extends React.Component {

    constructor() {
        super();
        this.saveBtn = this.saveButton.bind(this);
        // this.updateCheckBox = this.updateCheck.bind(this);
        this.updateBtn = this.updateButton.bind(this);
        this.handleCloseDial = this.handleCloseDialog.bind(this);
        // this.parseDate2 = this.parseDate.bind(this);
        this.state = {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                telNo: "",
                dateOfBirth: "",
                eMail: "",
            },
            imie: "",
            nazwisko: "",
            mail: "",
            nrTel: "",
            data: "",
            hasloNowe1: "",
            hasloNowe2: "",

            imieM: "",
            nazwiskoM: "",
            mailM: "",
            nrTelM: "",
            dataM: "",
            hasloNowe1M: "",
            hasloNowe2M: "",

            open: false,
            isLoading: true,
            disadablabled: true,
            // checked: false,
            errorMsg: "To pole jest wymagane",
            formErrors: [{
                nazwiskoError: "",
                nrTelError: "",
                hasloNowe1Error: "",
                hasloNowe2Error: "",

            }],
            formValid: false,
            lastNameValid: false,
            telNoValid: false,
            hasloNoweValid: false,
            hasloNowe1Valid: false,
            hasloNowe2Valid: false,

            openDialog: false,

        }
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value
            // }
            // ,() => {
            //     this.validateField(name, value)
            })
    }


    // validateField(fieldName, value) {
    //     let fieldValidationErrors = this.state.formErrors;
    //     let lastNameValid = this.state.lastNameValid;
    //     let telNoValid = this.state.telNoValid;
    //     let hasloNoweValid = this.state.hasloNoweValid;
    //     let hasloNowe1Valid = this.state.hasloNowe1Valid;
    //     let hasloNowe2Valid = this.state.hasloNowe2Valid;
    //
    //
    //     switch (fieldName) {
    //         case 'nazwisko':
    //             lastNameValid = value.length >= 3 && value.length <= 40;
    //             fieldValidationErrors.nazwiskoError = lastNameValid ? '' : 'Niepoprawna długość';
    //             break;
    //         case 'nrTel':
    //             telNoValid = value.length >= 6 && value.length <= 12;
    //
    //             fieldValidationErrors.nrTelError = telNoValid ? '' : "Niepoprawna długość";
    //             break;
    //         case 'hasloNowe1':
    //             hasloNoweValid = value.length >= 6;
    //             fieldValidationErrors.hasloNoweError = hasloNowe1Valid ? '' : "Niepoprawna długość";
    //             if (value === this.state.hasloNowe2.toString()) {
    //                 hasloNowe1Valid = true;
    //                 fieldValidationErrors.hasloNowe1Error = hasloNowe1Valid ? '' : 'Podane hasła są różne';
    //
    //             }
    //             else {
    //                 hasloNowe1Valid = false;
    //                 fieldValidationErrors.hasloNowe1Error = hasloNowe1Valid ? '' : 'Podane hasła są różne';
    //             }
    //
    //
    //             break;
    //         case 'hasloNowe2':
    //             hasloNoweValid = value.length >= 6;
    //             fieldValidationErrors.hasloNoweError = hasloNowe1Valid ? '' : "Niepoprawna długość";
    //
    //             if (value === this.state.hasloNowe1.toString()) {
    //                 hasloNowe2Valid = true;
    //                 fieldValidationErrors.hasloNowe2Error = hasloNowe2Valid ? '' : 'Podane hasła są różne';
    //             }
    //             else {
    //                 hasloNowe2Valid = false;
    //                 fieldValidationErrors.hasloNowe2Error = hasloNowe2Valid ? '' : 'Podane hasła są różne';
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    //     this.setState({
    //
    //         formErrors: fieldValidationErrors,
    //         lastNameValid: lastNameValid,
    //         telNoValid: telNoValid,
    //         hasloNoweValid: hasloNoweValid,
    //         hasloNowe1Valid: hasloNowe1Valid,
    //         hasloNowe2Valid: hasloNowe2Valid,
    //     }, this.validateForm);
    // }

    // validateForm() {
    //     this.setState({
    //         formValid:
    //         this.state.lastNameValid
    //         && this.state.telNoValid
    //         && this.state.hasloNoweValid
    //         && this.state.hasloNowe1Valid
    //         && this.state.hasloNowe2Valid
    //     });
    // }


    // handleDateChange(event, date) {
    //     let m = date.getMonth() + 1;
    //     let d = date.getDate();
    //     if (m < 10) {
    //         m = "0" + m;
    //     }
    //     if (d < 10) {
    //         d = "0" + d;
    //     }
    //     let customDate = date.getFullYear() + "-" + m + "-" + d;
    //     console.log(customDate);
    //     this.setState({
    //         data: customDate,
    //     })
    // }

    // updateCheck() {
    //     this.setState({disadablabled: !this.state.disadablabled})
    // }

    updateButton() {
        this.setState({
            openDialog: true,
        })
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false,

        })
    }

    saveButton() {
        let imie = this.state.imieM;
        let nazwisko = this.state.nazwiskoM;
        let nrTel = this.state.nrTelM;
        let data = this.state.dataM;
        let eMail = this.state.mailM;

        // console.log("imie: " + this.state.imie);
        // console.log("nazwisko: " + this.state.nazwisko);
        // console.log("nrTel: " + this.state.nrTel);
        // console.log("data: " + this.state.data);
        // console.log("mail: " + this.state.mail);

        if (imie === '' || nazwisko === '' || nrTel === '' || data === '' || eMail === '') {
            console.log("coś ma wartość null");

            console.log("imie: " + imie);
            console.log("nazwisko: " + nazwisko);
            console.log("nrTel: " +nrTel);
            console.log("data: " + data);
            console.log("mail: " + eMail);

            if (imie === '') {
                imie = this.state.user.firstName;
            }
            if (nazwisko === '') {
                nazwisko = this.state.user.lastName;
            }
            if (nrTel === '') {
                nrTel = this.state.user.telNo;
            }
            if (data === '') {
                data = this.state.user.dateOfBirth;
            }
            if (eMail === '') {
                eMail = this.state.user.eMail;
            }
            console.log("sprawdźmy czy dalej");
            console.log("id: " + this.state.user.id);
            console.log("imie: " + imie);
            console.log("nazwisko: " + nazwisko);
            console.log("nrTel: " +nrTel);
            console.log("data: " + data);
            console.log("mail: " + eMail);
            console.log("auth: " + this.state.user.authorities);
            console.log("isActive: " + this.state.user.isActive);
            console.log("pw: " + this.state.user.password);

        }



        fetch(url + "/auth/updateEmployee", {
            method: "POST",
            body: JSON.stringify({
                id: this.state.user.id,
                firstName: imie,
                lastName: nazwisko,
                telNo: nrTel,
                dateOfBirth: data,
                eMail: eMail,
                authorities: this.state.user.authorities,
                isActive: this.state.user.isActive,
                password: this.state.user.password,
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {

            this.setState({update: findresponse})

        })
        // .then(() => {
        //     let update = this.state.update;
        //     let users = this.state.users;
        //     users = users.concat(update);
        //     this.setState({
        //         users
        //     });
        //     // console.log(users);
        //     this.setState({
        //         open: true,
        //     })
        // })
    }


    componentDidMount() {
        document.title = "UrodaApp | Moje konto";
        fetch(url + "/auth/showUser", {
            method: "POST",
            body: "",
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                user: findresponse
            });
            console.log(this.state.user.dateOfBirth);
        });

    }

    // parseDate(input) {
    //     let parts = input.split('-');
    //     return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
    // }


    render() {

        let styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
                fontFamily: "Helvetica",
            },
            checkbox: {
                marginTop: 16,
                marginBottom: 16,
            },
            btn: {
                float: "right",
                marginTop: 16,
            },
            btnUnlockMod: {
                float: "left",
                marginTop: 16,
            },
            customPaper: {
                paddingLeft: 20,
                paddingRight: 20,
            }

        };

        const actions = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Zapisz"
                primary={true}
                keyboardFocused={true}
                onClick={this.saveBtn}
            />,
        ];


        return (
            <Row>
                <MuiThemeProvider>
                    <Col md={2} smHidden={true}/>
                    <Col md={8} sm={12}>

                        <h2 style={styles.headline}>Moje konto</h2>
                        <Paper zDepth={2} style={styles.customPaper}>
                            <TextField
                                disabled={this.state.disadablabled}
                                value={this.state.user.firstName}
                                floatingLabelText={"Imię"}
                                fullWidth={true}
                                id={"imie"}
                                name={"imie"}
                                type={"text"}
                            /><br/>
                            <TextField
                                disabled={this.state.disadablabled}
                                value={this.state.user.lastName}
                                floatingLabelText={"Nazwisko"}
                                errorText={this.state.formErrors.nazwiskoError}
                                fullWidth={true}
                                id={"nazwisko"}
                                name={"nazwisko"}
                            /><br/>
                            <TextField
                                disabled={this.state.disadablabled}
                                value={this.state.user.telNo}
                                floatingLabelText={"Numer kontaktowy"}
                                errorText={this.state.formErrors.nrTelError}
                                fullWidth={true}
                                id={"nrTel"}
                                name={"nrTel"}
                            /><br/>
                            <TextField
                                disabled={this.state.disadablabled}
                                value={this.state.user.dateOfBirth}
                                floatingLabelText={"Data urodzenia"}
                                fullWidth={true}
                                id={"data"}
                                name={"data"}
                            /><br/>
                            <TextField
                                disabled={this.state.disadablabled}
                                value={this.state.user.eMail}
                                floatingLabelText={"E-mail"}
                                fullWidth={true}
                                id={"mail"}
                                name={"mail"}
                            /><br/>
                        </Paper>
                        <Row>
                            <Col md={6} sm={6}>
                                <RaisedButton
                                    label="Zmień swoje dane"
                                    onClick={this.updateBtn}
                                    style={styles.btnUnlockMod}/>
                                {/*<Checkbox*/}
                                    {/*label={"Odblokuj dane do modyfikacji"}*/}
                                    {/*checked={this.state.checked}*/}
                                    {/*onCheck={this.updateCheckBox}*/}
                                    {/*style={styles.checkbox}*/}
                                {/*/>*/}
                            </Col>
                            {/*<Col md={6} sm={6}>*/}
                                {/*<RaisedButton*/}
                                    {/*label="Zapisz"*/}
                                    {/*onClick={this.saveBtn}*/}
                                    {/*style={styles.btn}*/}
                                    {/*disabled={true}/>*/}

                            {/*</Col>*/}
                        </Row>
                        <Snackbar
                            open={this.state.open}
                            message="Twoje informacje zostały zaktualizowane!"
                            autoHideDuration={4000}
                            // onRequestClose={this.handleCloseSnackbar}
                        />

                    </Col>
                    <Col md={2} smHidden={true}/>
                    <Dialog
                        title="Modyfikuj"
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleCloseDial}
                        style={{overflow: "visible"}}>
                        <TextField
                            defaultValue={this.state.user.firstName}
                            floatingLabelText={"Imię"}
                            fullWidth={true}
                            id={"imieM"}
                            name={"imieM"}
                            type={"text"}
                            onChange={(event) => this.handleUserInput(event)}
                        /><br/>
                        <TextField
                            defaultValue={this.state.user.lastName}
                            floatingLabelText={"Nazwisko"}
                            // errorText={this.state.formErrors.nazwiskoError}
                            fullWidth={true}
                            id={"nazwiskoM"}
                            name={"nazwiskoM"}
                            onChange={(event) => this.handleUserInput(event)}
                        /><br/>
                        <TextField
                            defaultValue={this.state.user.telNo}
                            floatingLabelText={"Numer kontaktowy"}
                            // errorText={this.state.formErrors.nrTelError}
                            fullWidth={true}
                            id={"nrTelM"}
                            name={"nrTelM"}
                            onChange={(event) => this.handleUserInput(event)}
                        /><br/>
                        <TextField
                            defaultValue={this.state.user.dateOfBirth}
                            floatingLabelText={"Data urodzenia (YYYY-MM-DD)"}
                            fullWidth={true}
                            id={"dataM"}
                            name={"dataM"}
                            onChange={(event) => this.handleUserInput(event)}
                        /><br/>
                        <TextField
                            defaultValue={this.state.user.eMail}
                            floatingLabelText={"E-mail"}
                            fullWidth={true}
                            id={"mailM"}
                            name={"mailM"}
                            onChange={(event) => this.handleUserInput(event)}
                        /><br/>
                        {/*<TextField*/}
                            {/*floatingLabelText={"Stare hasło"}*/}
                            {/*type={"password"}*/}
                            {/*fullWidth={true}*/}
                            {/*id={"hasloStareM"}*/}
                            {/*name={"hasloStareM"}*/}
                            {/*onChange={(event) => this.handleUserInput(event)}*/}
                        {/*/><br/>*/}
                        {/*<TextField*/}
                            {/*floatingLabelText={"Nowe hasło"}*/}
                            {/*type={"password"}*/}
                            {/*errorText={this.state.formErrors.hasloNowe1Error}*/}
                            {/*fullWidth={true}*/}
                            {/*id={"hasloNowe1M"}*/}
                            {/*name={"hasloNowe1M"}*/}
                            {/*onChange={(event) => this.handleUserInput(event)}*/}
                        {/*/><br/>*/}
                        {/*<TextField*/}
                            {/*floatingLabelText={"Powtórz nowe hasło"}*/}
                            {/*type={"password"}*/}
                            {/*errorText={this.state.formErrors.hasloNowe2Error}*/}
                            {/*fullWidth={true}*/}
                            {/*id={"hasloNowe2M"}*/}
                            {/*name={"hasloNowe2M"}*/}
                            {/*onChange={(event) => this.handleUserInput(event)}*/}
                        {/*/><br/>*/}
                    </Dialog>
                </MuiThemeProvider>
            </Row>
        )

    }
}

export default MyAcc;