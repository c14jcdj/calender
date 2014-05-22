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
        //returning Month and Day the first is on
        return ["May", "Thursday", 30]
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

    }


}

function CalenderController() {}

CalenderController.prototype = {

    run: function(calender) {
        info = calender.getCalenderInfo();
        calender.fillOutCalender(info);
    }
}