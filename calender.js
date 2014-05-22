$(document).on('ready', function() {
    calenderController = new CalenderController;
    calenderController.run(new Calender, new View)
})

function View() {}

View.prototype = {

    toggleSideBar: function() {
        $('#month').css({
            'width': '60%',
            'height': '400px',
            'margin-left': '5%',
            'float': 'left',
            'position': 'relative'
        })
        $('.daycontainer').css('display', 'inline-block')
    },

    renderApts: function(appointments) {
        console.log(appointments)
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height)
        c.height = 1500;
        var aptArray = this.howManyBlocks(appointments)
        console.log(aptArray)
        var counter = 0
        for (var i = 0; i < aptArray.length; i++) {
            groupAptsArray = appointments.slice(counter, counter + aptArray[i])
            counter = counter + aptArray[i]
            console.log(groupAptsArray)
            for (var j = 0; j < groupAptsArray.length; j++) {
                var canvasWidth = parseInt($('.daycontainer').css('width'))
                var startTime = groupAptsArray[j]["start_time"]
                var endTime = groupAptsArray[j]["end_time"]
                var eventName = groupAptsArray[j]["event_name"]
                if (startTime < 12) {
                    startTimeSuffix = "am"
                } else {
                    startTimeSuffix = "pm"
                }
                if (endTime >= 12) {
                    endTimeSuffix = "pm"
                } else {
                    endTimeSuffix = "am"
                }
                var text = eventName + ": " + startTime + startTimeSuffix + "-" + endTime + endTimeSuffix
                var rectHeight = startTime * 63
                var textHeight = startTime * 67
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fillRect(0, rectHeight, canvasWidth, 60);
                ctx.font = "15px Georgia";
                ctx.fillStyle = '#000000';
                ctx.fillText(text, 50, textHeight);
            }
        }
    },

    howManyBlocks: function(appointments) {
        var aptArray = []
        for (var i = 0; i < appointments.length - 1; i++) {
            var counter = 1
            var nextAptStart = appointments[i + 1]['start_time']
            var nextAptEnd = appointments[i + 1]['end_time']
            var thisAptStart = appointments[i]['start_time']
            var thisAptEnd = appointments[i]['end_time']
            if (thisAptStart <= nextAptStart && nextAptStart < thisAptEnd) {
                var j = i
                while (appointments[i]['start_time'] <= appointments[j + 1]['start_time'] && appointments[j + 1]['start_time'] < thisAptEnd) {
                    counter = counter + 1;
                    if (appointments[j + 1]['end_time'] > appointments[i]['end_time']) {
                        thisAptEnd = appointments[j + 1]['end_time']
                    } else {
                        thisAptEnd = appointments[i]['end_time']
                    }
                    j = j + 1;
                    if (i + (j - i) >= (appointments.length - 1)) {
                        break
                    }
                }
                aptArray.push(counter)
                i = j
            } else {
                counter = 1
                aptArray.push(counter)
            }
        }
        return aptArray
        console.log(aptArray)
    }

}

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
            $('#month tr:nth-child(' + row + ') td:nth-child(' + col + ')').html(i)
            col = col + 1;
            if (col == 8 && i != numOfDays) {
                $('#month').append('<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
                col = 1;
                row = row + 1;
            }
        }

    },

    bindDays: function(view) {
        var that = this;
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
            that.displayAppointments(ajaxresponse, view)
        })
    },

    displayAppointments: function(appointments, view) {
        view.toggleSideBar();
        view.renderApts(appointments);
    }


}

function CalenderController() {}

CalenderController.prototype = {

    run: function(calender, view) {
        var info = calender.getCalenderInfo();
        calender.fillOutCalender(info);
        calender.bindDays(view);


    }
}