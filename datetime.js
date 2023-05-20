let today = new Date();
let year = today.getFullYear();
let month = String(today.getMonth() + 1).padStart(2, "0");
var monthName = today.toLocaleString('default', { month: 'long' });

let day = today.getDate();
let weekday = today.getDay();
let weekdayName = today.toLocaleString('default', { weekday: 'long' });
let hour = today.getHours();
let min = String(today.getMinutes()).padStart(2, "0");
let secs = today.getSeconds();
let date = `${year}-${month}-${day}`;
let time = `T${hour}%3A${min}%3A${secs}`;
datetime = `${date}${time}`;
/*console.log(datetime);*/

let dateDisplay = `${day} ${monthName} ${year}, ${weekdayName}`


