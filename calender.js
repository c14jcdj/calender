$(document).on('ready', function() {
    calenderController = new CalenderController;
    calenderController.run(new Calender)
})

function Calender() {

    this.dayConverter = {
        'Sunday': 1,
        'Monday': 2,
        'Tuesday': 3,
        'Wednesday': 4,
        'Thursday': 5,
        'Friday': 6,
        'Saturday': 7,
    }

}

Calender.prototype = {

    getCalenderInfo: function() {
        //Would have ajax call to server to get JSON
        //returning Month, Day of first of the month, number of days in month
        return ["May", "Thursday", 31]
    },

    fillOutCalender: function(info) {
        $('th').html(info[0]);
        var startCol = this.dayConverter[info[1]]
        var numOfDays = info[2]
        var col = startCol;
        var row = 3;
        for (var i = 1; i < numOfDays + 1; i++) {
            $('tr:nth-child(' + row + ') td:nth-child(' + col + ')').html(i)
            col = col + 1;
            if (col == 8 && i != numOfDays) {
                $('table').append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
                col = 1;
                row = row + 1;
            }
        }

    },

    bindDays: function() {
        var that = this;
        console.log(that)
        $('td').on('click', function() {
            var day = $(this).html();
            var month = $('th').html();
            var data = {
                'day': day,
                'month': month
            }

            //Send ajax request for this month and day appointments
            var ajaxresponse = [{
                "event_name": "Event A",
                "start_time": 9,
                "end_time": 10
            }, {
                "event_name": "Event B",
                "start_time": 11,
                "end_time": 12
            }, {
                "event_name": "Event C",
                "start_time": 11.5,
                "end_time": 12.5
            }, {
                "event_name": "Event D",
                "start_time": 13,
                "end_time": 14.5
            }, {
                "event_name": "Event E",
                "start_time": 13,
                "end_time": 13.5
            }, {
                "event_name": "Event F",
                "start_time": 14,
                "end_time": 14.5
            }, {
                "event_name": "Event G",
                "start_time": 15,
                "end_time": 16
            }, {
                "event_name": "Event H",
                "start_time": 15,
                "end_time": 16.5
            }, {
                "event_name": "Event I",
                "start_time": 15.5,
                "end_time": 17.0
            }, {
                "event_name": "Event J",
                "start_time": 16.5,
                "end_time": 17.5
            }]
            that.displayAppointments(ajaxresponse)
        })
    },

    displayAppointments: function(appointments) {
        console.log(appointments)
        $('table').css({
            'width': '60%',
            'height': '400px',
            'margin-left': '5%',
            'float': 'left',
            'position': 'relative'
        })
        $('.day').css('display', 'block')
    }


}

function CalenderController() {}

CalenderController.prototype = {

    run: function(calender) {
        var info = calender.getCalenderInfo();
        calender.fillOutCalender(info);
        calender.bindDays();

    }
}