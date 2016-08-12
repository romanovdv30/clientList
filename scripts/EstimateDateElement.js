function EstimatedDateElement(date, element) {
    this.element = element;
    this.date = date;

    var str = Date.parse(this.date);
    var finish = new Date(str);
    var begin = new Date();
    var est = finish - begin;

    est = est / 1000;//all in sec
    var seconds = Math.floor(est % 60);//rest in sec
    est = est / 60;//all in min
    var minutes = Math.floor(est % 60);//rest in min
    est = est / 60;//all in hours
    var hours = Math.floor(est % 24);//rest in hours
    est = est / 24;//all in days
    var days = Math.floor(est % 30);  //rest in days
    est = est / 30;//all in month
    var month = Math.floor(est % 12); // rest in month
    var years = Math.floor(est /12);// all in years

    var timeLeft = {
        years: years,
        months: month,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
    var dateString = "";
    for (var key in timeLeft) {
        dateString += timeLeft[key] + " : " + key + ", ";
    }
    return dateString;
}