import React from "react";
// import $ from "jquery";
// import FullCalendar from "fullcalendar-reactwrapper";
// import moment from "moment";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";
import Calendar from "./Calendar";
// import fullCalendar from "fullcalendar";
import {MuiThemeProvider, Tab, Tabs} from "material-ui";
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TimePicker from 'material-ui/TimePicker';
import Snackbar from 'material-ui/Snackbar';
import {url} from "../Urls";
import {Col, Row} from "react-bootstrap";
import AutoComplete from 'material-ui/AutoComplete';



let header = {
    "Content-Type": "application/json"
};



class ShowCalendar extends React.Component {

    constructor() {
        super();
        this.updateDdm = this.handleChange.bind(this);
        this.saveBtn = this.saveButton.bind(this);
        this.clearBtn = this.clearButton.bind(this);
        this.newReqHandl = this.newRequestHandler.bind(this);
        this.newReqHandlUser = this.newRequestHandlerUser.bind(this);
        this.state = {
            value: "Agnieszka",
            events: [],
            update2: [],
            servicesToPick: [],
            serviceToPickName: [],
            serviceToPickPrice: '',
            usersToPick: [],
            userToPickName: [],
            nazwa: '',
            klient: '',
            cena: '',
            data: '',
            godzOd: '',
            godzDo: '',
            open: false,

        }
    }

    componentDidMount() {
        document.title = "UrodaApp | Kalendarz";

        fetch(url + "/auth/showServices", {
            method: "POST",
            body: ''
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                servicesToPick: findresponse
            })
        }).then(() => {
            this.state.servicesToPick.map((dynamicData, key) =>{
                this.state.serviceToPickName.push(dynamicData.name);
                }
            )
            // this.setState({
            //     isLoading: false
            // })
        });
        console.log("servicesToPick: " + this.state.servicesToPick);
        console.log("serviceToPickName: " + this.state.serviceToPickName);
        fetch(url + "/auth/showUsers", {
            method: "POST",
            body: "",
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                usersToPick: findresponse
            })
        }).then(() => {
            this.state.usersToPick.map((dynamicData, key) =>{
                    this.state.userToPickName.push(dynamicData.firstName + " " + dynamicData.lastName);
                }
            )
        });
        console.log("usersToPick: " + this.state.usersToPick);
        console.log("userToPickName: " + this.state.userToPickName);
    }


    handleChange(event, index, value){
        const name = event.target.name;
        const val = event.target.value;
        this.setState({
            value: value,
        });
        console.log(value);

    }

    handleUserInput(e){
        const name = e.target.name;

        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    handleDateChange(event, date){
        let m = date.getMonth()+1;
        let d = date.getDate();
        if(m < 10){
            m = "0" + m;
        }
        if(d < 10){
            d = "0" + d;
        }
        let customDate = date.getFullYear() + "-" + m + "-" + d ;
        console.log(customDate);
        this.setState({
            data: customDate,
        })
    }

    handleTimeChangeFrom(event, date){
        let h = date.getHours();
        let min = date.getMinutes();
        if(min < 10){
            min = "0" + min;
        }
        if(h < 10){
            h = "0" + h;
        }
        let customDate = h + ":" + min + ":00";
        console.log(customDate);
            this.setState({
            godzOd: customDate,
        })
    }
    handleTimeChangeTo(event, date){
        let h = date.getHours();
        let min = date.getMinutes();
        if(min < 10){
            min = "0" + min;
        }
        if(h < 10){
            h = "0" + h;
        }
        let customDate = h + ":" + min + ":00";
        this.setState({
            godzDo: customDate,
        })
    }

    saveButton(){
        fetch(url + "/auth/addEvent", {
            method: "POST",
            body: JSON.stringify({
                title: this.state.nazwa,
                startParam: this.state.godzOd,
                endParam: this.state.godzDo,
                // timezone: this.state,
                price: this.state.cena,
                employee: this.state.value,
                client: this.state.klient,
                date: this.state.data,
                // color: this.state,
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {

            this.setState({update: findresponse})

        }).then(() => {
            let update = this.state.update2;
            let events = this.state.events;
            events =  events.concat(update);
            this.setState({
                events
            });
            console.log(events)
        }).then(()=> {
            this.setState({
                open: true,
            })
        });

    }

    clearButton(){

    }

    newRequestHandler(chosenRequest, index){
        let indx = this.state.servicesToPick.map(x => x.name).indexOf(chosenRequest);
        let price = this.state.servicesToPick[indx].price;
        this.setState({
            serviceToPickPrice: price,
            nazwa: chosenRequest,
            cena: price,
        });
        console.log(this.state.servicesToPick[indx].price);
        console.log(chosenRequest);
        // console.log(this.state.servicesToPick.price[indx]);
    }

    newRequestHandlerUser(chosenRequest, index){
        this.setState({
            klient: chosenRequest,
        });
        console.log(chosenRequest);
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



        return (
            <Row>
                <link href={"/fullcalendar/fullcalendar.css"} rel={"stylesheet"}/>
                <MuiThemeProvider>
                    <Col md={12} sm={12}>
                        <Tabs>
                            <Tab label="Dziennik">
                                <Row>
                                    <Col md={2} sm={1}/>
                                    <Col md={8} sm={10}>
                                        <Calendar/>
                                    </Col>
                                    <Col md={2} sm={1}/>
                                </Row>
                            </Tab>
                            <Tab label="Dodaj wizytę">
                                <Row>
                                    <Col md={2} sm={1}/>
                                    <Col md={8} sm={10}>
                                        <h2 style={styles.headline}>Wypełnij pola</h2>
                                        <Paper zDepth={2} style={styles.customPaper}>
                                            <AutoComplete
                                                hintText={"Nazwa zabiegu"}
                                                // filter={AutoComplete.caseInsensitiveFilter}
                                                dataSource={this.state.serviceToPickName}
                                                maxSearchResults={5}
                                                name={"nazwa"}
                                                fullWidth={true}
                                                onNewRequest={this.newReqHandl}
                                                underlineShow={false}/>
                                            <Divider/>
                                            <AutoComplete
                                                hintText="Klient"
                                                name={"klient"}
                                                dataSource={this.state.userToPickName}
                                                maxSearchResults={5}
                                                fullWidth={true}
                                                onNewRequest={this.newReqHandlUser}
                                                // onChange={(event) => this.handleUserInput(event)}
                                                underlineShow={false}/>

                                            {/*<TextField*/}
                                                {/*hintText="Klient"*/}
                                                {/*name={"klient"}*/}
                                                {/*fullWidth={true}*/}
                                                {/*onChange={(event) => this.handleUserInput(event)}*/}
                                                {/*underlineShow={false}/>*/}


                                            <Divider/>
                                            <TextField
                                                hintText="Cena"
                                                name={"cena"}
                                                fullWidth={true}
                                                // onChange={(event) => this.handleUserInput(event)}
                                                underlineShow={false}
                                                value={this.state.serviceToPickPrice}
                                            />
                                            <Divider/>
                                            <DatePicker
                                                hintText="Data"
                                                name={"data"}
                                                fullWidth={true}
                                                onChange={(event, date) => this.handleDateChange(event, date)}
                                                underlineShow={false}/>
                                            <Divider/>
                                            <TimePicker
                                                format="24hr"
                                                hintText="Godzina rozpoczęcia"
                                                underlineShow={false}
                                                onChange={(event, date) => this.handleTimeChangeFrom(event, date)}
                                                name={"godzOd"}
                                                fullWidth={true}
                                            />
                                            <Divider/>
                                            <TimePicker
                                                format="24hr"
                                                hintText="Godzina zakończenia"
                                                underlineShow={false}
                                                onChange={(event, date) => this.handleTimeChangeTo(event, date)}
                                                name={"godzDo"}
                                                fullWidth={true}
                                            />
                                            <Divider/>
                                            <SelectField
                                                underlineShow={false}
                                                floatingLabelText="Pracownik wykonujący"
                                                name={"value"}
                                                value={this.state.value}
                                                fullWidth={true}
                                                onChange={((event, index, value) => this.handleChange(event, index, value))}
                                            >
                                                <MenuItem value={"Agnieszka"} primaryText="Agnieszka"/>
                                                <MenuItem value={"Beata"} primaryText="Beata"/>
                                                <MenuItem value={"Justyna"} primaryText="Justyna"/>
                                            </SelectField>
                                            <Divider/>
                                        </Paper>
                                        <RaisedButton
                                            label="Zapisz"
                                            style={styles.btnSave}
                                            primary={true}
                                            onClick={this.saveBtn}/>
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
                        message="Dodano nową wizytę"
                        autoHideDuration={4000}
                        // onRequestClose={this.handleCloseSnackbar}
                    />
                </MuiThemeProvider>
            </Row>

            // <div className="helvetica">
            //     {/*<link href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.8.0/fullcalendar.min.css" rel="stylesheet"/>*/}
            //     {/*<script src={"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/locale/pl.js"}/>*/}
            //     {/*<script src={"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"} />*/}
            //     {/*<script src={"https://code.jquery.com/jquery-3.2.1.min.js"} />*/}
            //     <FullCalendar
            //         // lang: "pl"
            //         header: {{
            //             left: 'prev next, today',
            //             center: 'title',
            //             right: 'month agendaWeek agendaDay'
            //         }}
            //         navLinks={true}
            //         editable={true}
            //         eventLimit={true}
            //         events={this.state.events}
            //     />
            // </div>
        );
    }
}


export default ShowCalendar;