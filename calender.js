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

    toggleHideApts: function() {
        $('button').css('display', 'inline-block');
        $('button').on('click', function() {
            $('.daycontainer').css('display', 'none');
            $(this).css('display', 'none')
            $('#month').css({
                'width': '84%',
                'height': '450px',
                'margin-left': 'auto',
                'float': 'none',
                'position': 'static'
            })
        })
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
                var textName = eventName + ": "
                var textTime = startTime + startTimeSuffix + "-" + endTime + endTimeSuffix
                var rectWidth = 320
                var oneHour = (parseInt($('.daycontainer').css('height')) / 24) * 3
                var hours = endTime - startTime
                var rectHeight = hours * oneHour
                if (aptArray[i] == 1) {
                    var rectY = (startTime * oneHour)
                    var rectX = 0
                    var textNameX = (startTime * oneHour) + oneHour
                    var textNameY = rectWidth / 6
                    var textTimeX = (startTime * oneHour) + oneHour
                    var textTimeY = rectWidth / 2.5

                } else if (aptArray[i] == 2) {
                    rectY = (startTime * oneHour)
                    rectWidth = rectWidth / 2.2
                    textNameX = startTime * oneHour + (oneHour / 2)
                    textTimeX = startTime * oneHour + (oneHour / 1.5)
                    if (groupAptsArray.indexOf(groupAptsArray[j]) == 0) {
                        textNameY = rectWidth / 3
                        textTimeY = rectWidth / 3
                        rectX = 2
                    } else {
                        rectX = rectWidth + 6
                        textNameY = rectWidth + rectWidth / 5
                        textTimeY = rectWidth + rectWidth / 5
                    }
                } else if (aptArray[i] == 3) {
                    if (groupAptsArray[1]['end_time'] < groupAptsArray[2]['start_time']) {
                        rectHeight = hours * oneHour
                        rectY = (startTime * oneHour)
                        rectWidth = rectWidth / 2.2
                        textNameX = startTime * oneHour + (oneHour / 2)
                        textTimeX = startTime * oneHour + (oneHour / 1.5)
                        if (groupAptsArray.indexOf(groupAptsArray[j]) == 0) {
                            textNameY = rectWidth / 3
                            textTimeY = rectWidth / 3
                            rectX = 2
                        } else {
                            rectX = rectWidth + 6
                            textNameY = rectWidth + rectWidth / 5
                            textTimeY = rectWidth + rectWidth / 5
                        }
                    } else {
                        rectHeight = hours * oneHour
                        rectY = (startTime * oneHour)
                        rectWidth = rectWidth / 3.3
                        textNameX = startTime * oneHour + (oneHour / 5)
                        textTimeX = startTime * oneHour + (oneHour / 2.5)
                        if (groupAptsArray.indexOf(groupAptsArray[j]) == 0) {
                            textNameY = rectWidth / 7
                            textTimeY = rectWidth / 7
                            rectX = 2
                        } else if (groupAptsArray.indexOf(groupAptsArray[j]) == 1) {
                            rectX = rectWidth + 6
                            textNameY = rectWidth + rectWidth / 8
                            textTimeY = rectWidth + rectWidth / 8
                        } else {
                            rectX = rectWidth * 2 + 8
                            textNameY = rectWidth + rectWidth + rectWidth / 8
                            textTimeY = rectWidth + rectWidth + rectWidth / 8
                        }
                    }
                } else {
                    rectHeight = hours * oneHour
                    rectY = (startTime * oneHour)
                    rectWidth = rectWidth / 3.3
                    textNameX = startTime * oneHour + (oneHour / 2)
                    textTimeX = startTime * oneHour + (oneHour / 1.5)
                    if (groupAptsArray.indexOf(groupAptsArray[j]) == 0) {
                        textNameY = rectWidth / 7
                        textTimeY = rectWidth / 7
                        rectX = 2
                    } else if (groupAptsArray.indexOf(groupAptsArray[j]) == 1) {
                        rectX = rectWidth + 6
                        textNameY = rectWidth + rectWidth / 8
                        textTimeY = rectWidth + rectWidth / 8
                    } else if (groupAptsArray.indexOf(groupAptsArray[j]) == 2) {
                        rectX = rectWidth * 2 + 8
                        textNameY = rectWidth + rectWidth + rectWidth / 8
                        textTimeY = rectWidth + rectWidth + rectWidth / 8
                    } else {
                        rectX = 2
                        rectWidth = rectWidth * 2 + 4
                        textNameY = rectWidth / 4
                        textTimeY = rectWidth / 4
                    }
                }

                if (hours == .5) {
                    ctx.font = "11px Georgia";
                    textNameX = startTime * oneHour + oneHour / 3 - 5
                    textTimeX = startTime * oneHour + oneHour / 3 + 5
                } else {
                    ctx.font = "15px Georgia";
                }
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                console.log('rH2' + rectHeight)
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
                ctx.fillStyle = '#000000';
                ctx.fillText(textName, textNameY, textNameX);
                ctx.fillText(textTime, textTimeY, textTimeX);

            }
        }
    },

    howManyBlocks: function(appointments) {
        var aptArray = []
        if (appointments.length == 1) {
            return [1]
        }
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
                "end_time": 11
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
        view.toggleHideApts();
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