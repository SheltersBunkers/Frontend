

const date = (timeStamp) => {
    let day = timeStamp.split('T')[0];
    let time = timeStamp.split('T')[1];

    let month = day.split('-')[1];
    let year = day.split('-')[0];
    let dayOfMonth = day.split('-')[2];

    (month == '01') ? month = "Jan." : month === '02' ? month = "Feb." : month === '03' ?month = "Mar." : month === '04' ? month = "Apr." : month === '05' ? month = "May" : month === '06' ? month = "June" : month === '07' ? month = "July" : month === '08' ? month = "Aug." : month === '09' ? month = "Sept." : month === '10' ? month = "Oct." : month === '11' ? month = "Nov." : month = "Dec. "
    
    if (dayOfMonth.split('')[0] === '0'){
        dayOfMonth = dayOfMonth.split('')[1]
    }

    timeHour = time.split(':')[0];
    timeMinute = time.split(':')[1];
    amOrPm = ''

    if (timeHour.split('')[0] === '0' && timeHour.split('')[1] === '0') {
        timeHour = '12';
        amOrPm= 'am'
    } else if (timeHour.split('')[0] === '0'){
        timeHour = timeHour.split('')[1];
        amOrPm = 'am'
    } else if (parseInt(timeHour) > 12) {
        timeHour = timeHour - 12;
        amOrPm = 'pm'
    } else if (timeHour === '11'){
        amOrPm = 'am'
    } else if (timeHour === '12'){
        amOrPm = 'pm'
    }



    return (month + '' + dayOfMonth + ', ' + year + ' ' + timeHour + ':' + timeMinute +  ' '+amOrPm)
}


export default date;
//2019-10-28 20:35:29