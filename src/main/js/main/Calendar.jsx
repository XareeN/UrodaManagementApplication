import React from "react";
import $ from "jquery";
import "fullcalendar/dist/locale/pl";
import {url} from "../Urls";
import {MuiThemeProvider} from "material-ui";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';






let header = {
    "Content-Type": "application/json"
};


class Calendar extends React.Component {

    constructor(){
        super();
        this.handleCloseDial = this.handleCloseDialog.bind(this);
        this.handleDeleteDial = this.handleDeleteDialog.bind(this);
        this.handleConfDeleteDial = this.handleConfDeleteDialog.bind(this);
        this.handleClSnackbar = this.handleCloseSnackbar.bind(this);
        this.state = {
            calendarState: [],
            idToDelete: '',
            nazwa: '',
            klient: '',
            cena: '',
            value: '',
            godzOd: '',
            godzDo: '',

            choosedId: '',
            choosedTitle: '',
            openDialog: false,
            dialogHeader: '',
            deleteClicked: false,
            openSnackbar: false,


        }


    }

    handleCloseDialog() {
        this.setState({
            openDialog: false,
            dialogHeader: '',
            deleteClicked: false,
        })
    }

    handleDeleteDialog(){
        this.setState({
            dialogHeader: 'Na pewno usunąć wizytę?',
            deleteClicked: true,
        })
    }

    handleConfDeleteDialog(){
            fetch(url + '/auth/deleteEvent', {
                method: "POST",
                body: JSON.stringify({
                    id: this.state.choosedId,
                })
                ,
                headers: header,
                credentials: "same-origin"
            }).then((Response) => Response.json()).then((findresponse) => {
                // this.setState({
                //     calendarState: findresponse
                // })
            });
            console.log("usuwamy event o id: "+ this.state.choosedId);
            this.setState({
                openDialog: false,
                deleteClicked: false,
                openSnackbar: true,
            });

    }

    handleCloseSnackbar(){
        this.setState({
            openSnackbar: false,
        });
    }


    render() {

        const akcjeDialoguShow = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Usuń"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleDeleteDial}

            />,
        ];

        const akcjeDialoguConfDelete = [
            <FlatButton
                label="Nie, Anuluj"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Tak, Usuń"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleConfDeleteDial}

            />,
        ];


        return (
            <MuiThemeProvider>
                <div id="calendar" style={{marginTop: 12}}/>

                <Dialog
                    title={this.state.dialogHeader}
                    actions={this.state.deleteClicked ? akcjeDialoguConfDelete : akcjeDialoguShow}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleCloseDial}
                >
                    {this.state.choosedTitle}
                </Dialog>

                <Snackbar
                    open={this.state.openSnackbar}
                    message="Usunięto wizytę!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleClSnackbar}
                />

            </MuiThemeProvider>
        );
    }

    componentDidMount() {
        fetch(url + '/auth/showEvents', {
            method: "POST",
            body: "",
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                calendarState: findresponse
            })
        }).then(() => {

            $('#calendar').fullCalendar({
                lang: "pl",
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultView: 'agendaWeek',
                selectable: false, //możliwość wyboru wielu dni jednocześnie
                selectHelper: false,
                editable: true,
                eventLimit: true,
                firstDay: 1,
                businessHours:{
                    dow: [1,2,3,4,5],
                    start: '09:00',
                    end: '18:00',
                },
                timezone: 'local',
                minTime: "08:00:00",
                maxTime: "21:00:00",
                slotDuration: "00:05:00",
                nowIndicator: true, //pokazuje znacznik z aktualną godziną
                draggable: false,
                resizable: false,
                eventSources: [
                    {
                        url: "/auth/showEvents" ,
                        type: "POST",

                    }
                 ],
                showNonCurrentDates: false,
                contentHeight: 'auto',
                eventClick: function(view){
                    // let id = view.id;
                    // this.setState({
                    //     idToDelete: id
                    // });
                    console.log("title: " + view.title);
                    console.log("id: " + view.id);


                    this.setState({
                        choosedId: view.id,
                        choosedTitle: view.title,
                        dialogHeader: 'Wybrana wizyta: ',
                        openDialog: true,

                    })


                    // if(confirm('Czy na pewno chcesz usunąć wizytę: \n' + view.title)){
                    //     fetch(url + '/auth/deleteEvent', {
                    //         method: "POST",
                    //         body: JSON.stringify({
                    //             id: view.id,
                    //         })
                    //         ,
                    //         headers: header,
                    //         credentials: "same-origin"
                    //     }).then((Response) => Response.json()).then((findresponse) => {
                    //         // this.setState({
                    //         //     calendarState: findresponse
                    //         // })
                    //     });
                    //     console.log("usuwamy event o id: "+ view.id);
                    // }else{
                    //     console.log("anulowane");
                    // }



                }.bind(this),
                dayClick: function(date, jsEvent, view) {
                    if (view.name !== 'month')
                        return;

                        $('#calendar').fullCalendar('changeView', 'agendaDay');
                        $('#calendar').fullCalendar('gotoDate', date);

                },

            })
        });




    }
}

export default Calendar;