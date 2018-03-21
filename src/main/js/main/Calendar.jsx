import React from "react";
import $ from "jquery";
import "fullcalendar/dist/locale/pl";
import {url} from "../Urls";


let header = {
    "Content-Type": "application/json"
};


class Calendar extends React.Component {

    constructor(){
        super();
        this.state = {
            calendarState: [],
            idToDelete: '',
            nazwa: '',
            klient: '',
            cena: '',
            value: '',
            godzOd: '',
            godzDo: '',

        }


    }

    render() {
        return <div id="calendar" style={{marginTop: 12}}></div>;
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
                eventClick: function(view){
                    // let id = view.id;
                    // this.setState({
                    //     idToDelete: id
                    // });
                    console.log("title: " + view.title);
                    console.log("id: " + view.id);


                    if(confirm('Czy na pewno chcesz usunąć wizytę: \n' + view.title)){
                        fetch(url + '/auth/deleteEvent', {
                            method: "POST",
                            body: JSON.stringify({
                                id: view.id,
                            })
                            ,
                            headers: header,
                            credentials: "same-origin"
                        }).then((Response) => Response.json()).then((findresponse) => {
                            // this.setState({
                            //     calendarState: findresponse
                            // })
                        });
                        console.log("usuwamy event o id: "+ view.id);
                    }else{
                        console.log("anulowane");
                    };



                },




                renderEvent:{

                }
                // dayClick: function(date, jsEvent, view) {
                //
                //     alert('Clicked on: ' + date.format());
                //
                //     alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                //
                //     alert('Current view: ' + view.name);
                // },



            })
        });




    }
}

export default Calendar;