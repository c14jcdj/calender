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

    determineSuffix: function(time) {
        if (time < 12) {
            return "am"
        } else {
            return "pm"
        }
    },

    convertTime: function(time) {
        if (time <= 12.5) {
            if (time % 1 == 0) {
                return time
            } else {
                return time - (time % 1) + ":30"
            }
        } else {
            if (time % 1 == 0) {
                return time - 12
            } else {
                return time - (12 + time % 1) + ":30"
            }
        }
    },

    renderApts: function(appointments, calender) {
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        c.height = 1500;
        ctx.clearRect(0, 0, c.width, c.height)
        var aptArray = calender.howManyBlocks(appointments)
        var counter = 0
        for (var i = 0; i < aptArray.length; i++) {
            var groupAptsArray = appointments.slice(counter, counter + aptArray[i])
            counter = counter + aptArray[i]
            for (var j = 0; j < groupAptsArray.length; j++) {
                var startTime = groupAptsArray[j]["start_time"]
                var endTime = groupAptsArray[j]["end_time"]
                var eventName = groupAptsArray[j]["event_name"]
                var startTimeSuffix = this.determineSuffix(startTime)
                var endTimeSuffix = this.determineSuffix(endTime)
                var textName = eventName + ": "
                var textTime = this.convertTime(startTime) + startTimeSuffix + "-" + this.convertTime(endTime) + endTimeSuffix
                var rectWidth = 320
                var oneHour = (parseInt($('.daycontainer').css('height')) / 24) * 3
                var hoursOfEvent = endTime - startTime
                var rectX;
                var rectY = (startTime * oneHour)
                var rectWidth;
                var rectHeight = hoursOfEvent * oneHour
                var textNameY;
                var textTimeY;
                var varForTwoBlock = {
                    "rectWidth": rectWidth / 2.2,
                    "textNameX": startTime * oneHour + (oneHour / 2),
                    "textTimeX": startTime * oneHour + (oneHour / 1.5),
                    "textNameY": rectWidth / 5,
                    "textTimeY": rectWidth / 5,
                    "rectX": 2
                };
                var varForThreeBlock = {
                    "rectWidth": rectWidth / 3.3,
                    "textNameX": startTime * oneHour + (oneHour / 2.3),
                    "textTimeX": startTime * oneHour + (oneHour / 1.5)
                }
                var varForSecondBlock = function(rectWidth) {
                    return {
                        "rectX": rectWidth + 6,
                        "textNameY": rectWidth + rectWidth / 5,
                        "textTimeY": rectWidth + rectWidth / 5
                    }
                };
                var varForFirstOfThreeBlocks = function(rectWidth) {
                    return {
                        "textNameY": rectWidth / 7,
                        "textTimeY": rectWidth / 7,
                        "rectX": 2
                    }
                };
                var varForSecondOfThreeBlocks = function(rectWidth) {
                    return {
                        "rectX": rectWidth + 6,
                        "textNameY": rectWidth + rectWidth / 8,
                        "textTimeY": rectWidth + rectWidth / 8
                    }
                };
                var varForThirdOfThreeBlocks = function(rectWidth) {
                    return {
                        "rectX": rectWidth * 2 + 8,
                        "textNameY": rectWidth + rectWidth + rectWidth / 8,
                        "textTimeY": rectWidth + rectWidth + rectWidth / 8
                    }
                };
                var noOverlap = function() {
                    return groupAptsArray[1]['end_time'] < groupAptsArray[2]['start_time'];
                }
                var checkLocation = function(groupAptsArray, index) {
                    return groupAptsArray.indexOf(groupAptsArray[j]) == index
                }

                if (aptArray[i] == 1) {
                    rectX = 0
                    textNameX = textTimeX = (startTime * oneHour) + oneHour / 2
                    textNameY = rectWidth / 6
                    textTimeY = rectWidth / 2.5
                } else if (aptArray[i] == 2) {
                    rectWidth = varForTwoBlock.rectWidth
                    textNameX = varForTwoBlock.textNameX
                    textTimeX = varForTwoBlock.textTimeX
                    if (checkLocation(groupAptsArray, 0)) {
                        textNameY = varForTwoBlock.textNameY
                        textTimeY = varForTwoBlock.textTimeY
                        rectX = varForTwoBlock.rectX
                    } else {
                        rectX = varForSecondBlock(rectWidth).rectX
                        textNameY = varForSecondBlock(rectWidth).textNameY
                        textTimeY = varForSecondBlock(rectWidth).textTimeY
                    }
                } else if (aptArray[i] == 3) {
                    if (noOverlap()) {
                        rectWidth = varForTwoBlock.rectWidth
                        textNameX = varForTwoBlock.textNameX
                        textTimeX = varForTwoBlock.textTimeX
                        if (checkLocation(groupAptsArray, 0)) {
                            textNameY = rectWidth / 3
                            textTimeY = rectWidth / 3
                            rectX = 2
                        } else {
                            rectX = varForSecondBlock(rectWidth).rectX
                            textNameY = varForSecondBlock(rectWidth).textNameY
                            textTimeY = varForSecondBlock(rectWidth).textTimeY
                        }
                    } else {
                        rectWidth = varForThreeBlock.rectWidth
                        textNameX = varForThreeBlock.textNameX
                        textTimeX = varForThreeBlock.textTimeX
                        if (checkLocation(groupAptsArray, 0)) {
                            textNameY = varForFirstOfThreeBlocks(rectWidth).textNameY
                            textTimeY = varForFirstOfThreeBlocks(rectWidth).textTimeY
                            rectX = varForFirstOfThreeBlocks(rectWidth).rectX
                        } else if (checkLocation(groupAptsArray, 1)) {
                            rectX = varForSecondOfThreeBlocks(rectWidth).rectX
                            textNameY = varForSecondOfThreeBlocks(rectWidth).textNameY
                            textTimeY = varForSecondOfThreeBlocks(rectWidth).textTimeY
                        } else {
                            rectX = varForThirdOfThreeBlocks(rectWidth).rectX
                            textNameY = varForThirdOfThreeBlocks(rectWidth).textNameY
                            textTimeY = varForThirdOfThreeBlocks(rectWidth).textTimeY
                        }
                    }
                } else {
                    rectWidth = varForThreeBlock.rectWidth
                    textNameX = varForThreeBlock.textNameX
                    textTimeX = varForThreeBlock.textTimeX
                    if (checkLocation(groupAptsArray, 0)) {
                        textNameY = varForFirstOfThreeBlocks(rectWidth).textNameY
                        textTimeY = varForFirstOfThreeBlocks(rectWidth).textTimeY
                        rectX = varForFirstOfThreeBlocks(rectWidth).rectX
                    } else if (checkLocation(groupAptsArray, 1)) {
                        rectX = varForSecondOfThreeBlocks(rectWidth).rectX
                        textNameY = varForSecondOfThreeBlocks(rectWidth).textNameY
                        textTimeY = varForSecondOfThreeBlocks(rectWidth).textTimeY
                    } else if (checkLocation(groupAptsArray, 2)) {
                        rectX = varForThirdOfThreeBlocks(rectWidth).rectX
                        textNameY = varForThirdOfThreeBlocks(rectWidth).textNameY
                        textTimeY = varForThirdOfThreeBlocks(rectWidth).textTimeY
                    } else {
                        rectX = 2
                        rectWidth = rectWidth * 2 + 4
                        textNameY = rectWidth / 4
                        textTimeY = rectWidth / 4
                    }
                }
                if (hoursOfEvent == .5) {
                    ctx.font = "11px Georgia";
                    textNameX = startTime * oneHour + oneHour / 3 - 5
                    textTimeX = startTime * oneHour + oneHour / 3 + 5
                } else {
                    ctx.font = "15px Georgia";
                }
                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
                ctx.fillStyle = '#000000';
                ctx.fillText(textName, textNameY, textNameX);
                ctx.fillText(textTime, textTimeY, textTimeX);
            }
        }
    },
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
    howManyBlocks: function(appointments) {
        var aptArray = []
        var aptLength = appointments.length
        if (aptLength == 1) {
            return [1]
        }
        for (var i = 0; i < aptLength - 1; i++) {
            var counter = 1
            var nextAptStart = appointments[i + 1]['start_time']
            var nextAptEnd = appointments[i + 1]['end_time']
            var thisAptStart = appointments[i]['start_time']
            var thisAptEnd = appointments[i]['end_time']
            if (thisAptStart <= nextAptStart && nextAptStart <= thisAptEnd) {
                var j = i
                while (thisAptStart <= appointments[j + 1]['start_time'] && appointments[j + 1]['start_time'] < thisAptEnd) {
                    counter = counter + 1;
                    if (appointments[j + 1]['end_time'] > thisAptEnd) {
                        thisAptEnd = appointments[j + 1]['end_time']
                    }
                    j = j + 1;
                    if (i + (j - i) >= (aptLength - 1)) {
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
    },


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
        view.toggleHideApts();
        view.renderApts(appointments, this);
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