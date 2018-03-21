/**
 * Created by xareen on 18.12.2017.
 */
$(document).ready(function () {

    // page is now ready, initialize the calendar...

    $('#calendar').fullCalendar({
        lang: 'pl',
        header:
            {
                left: 'prev next, today',
                center: 'title',
                right: 'month agendaWeek agendaDay'
            },

        selectable: true, //możliwość wyboru wielu dni jednocześnie
        selectHelper: true,
        editable: true,
        eventLimit: true,
        events: '/events.json',

        select: function(start, end){
            $.getScript('../js/events/new', function(){
                $('#event_date_range').val(moment(start).format("MM/DD/YYYY HH:mm") + ' - ' + moment(end).format("MM/DD/YYYY HH:mm"));
                date_range_picker();
                $('.start_hidden').val(moment(start).format("MM/DD/YYYY HH:mm"));
                $('.end_hidden').val(moment(end).format("MM/DD/YYYY HH:mm"));

            });
            calendar.fullCalendar('unselect');
        }
    })

});