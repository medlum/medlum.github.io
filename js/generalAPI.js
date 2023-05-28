let today = new Date();

const date = {
    year : today.getFullYear(),
    month : String(today.getMonth() + 1).padStart(2, "0"),
    monthName : today.toLocaleString('default', { month: 'long' }),
    day : today.getDate(),
    weekday : today.getDay(),
    weekdayName : today.toLocaleString('default', { weekday: 'long' }),
    hour : String(today.getHours()).padStart(2, "0"),
    min : String(today.getMinutes()).padStart(2, "0"),
    secs : today.getSeconds()
  
};

let yyyymmdd = `${date.year}-${date.month}-${date.day}`;
let  hhmmss = `T${date.hour}%3A${date.min}%3A${date.secs}`;
let dateTime = `${yyyymmdd}${hhmmss}`;
let dateText = `${date.day}-${date.monthName}-${date.year}`
let timeText =`${date.hour}:${date.min}:${date.min}`;
let dmyd = `${date.day} ${date.monthName} ${date.year}, ${date.weekdayName}`;

document.querySelector(".date").insertAdjacentHTML("beforeend", `${dmyd}`);
document.querySelector(".time").insertAdjacentHTML("beforeend", `${timeText}`);

api24hour = `https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date_time=${dateTime}`


const getGeneralData = () =>{

    fetch(api24hour)
        .then((data) => data.json())
        .then((data) => {
            getForecast(data);
            getWindDirection(data);
        });  
}

const getWindDirection = (data) =>{
    const windSubDirection =    ["North"
                                , "North-North East"
                                , "East-North East"
                                , "East"
                                , "East-South East"
                                , "South East"
                                , "South-SouthEast"
                                , "South"
                                , "South-South West"
                                , "South West"
                                , "West-SouthWest"
                                , "West"
                                , "West-North West"
                                , "North West"
                                , "North-North West"];
    const winddirection = data.items[0].general.wind.direction;

    switch(winddirection.toUpperCase()){
        case "N":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[0])
            break;
        case "NNE":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[1])
            break;
        case "ENE":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[2])
            break;
        case "E":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[3])
            break;
        case "ESE":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[4])
            break;
        case "SE":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[5])
            break;
        case "SSE":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[6])
            break;
        case "S":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[7])
            break;
        case "SSW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[8])
            break;          
        case "SW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[9])
            break;
        case "WSW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[10])
            break;
        case "W":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[11])
            break;
        case "WNW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[12])
            break;
        case "NW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[13])
            break;
        case "NNW":
            document
            .querySelector(".wind-direction")
            .insertAdjacentHTML("beforeend", windSubDirection[14])
            break;
    }


}

const getForecast = (data) => {
    /*General Forecast*/
    const humidityLow = data.items[0].general.relative_humidity.low;
    const humidityhigh = data.items[0].general.relative_humidity.high;
    const temperatureLow = data.items[0].general.temperature.low;
    const temperatureHigh = data.items[0].general.temperature.high;
    const windspeedLow = data.items[0].general.wind.speed.low;
    const windspeedHigh = data.items[0].general.wind.speed.high;
    const winddirection = data.items[0].general.wind.direction;
    const forecast = data.items[0].general.forecast;

    document
        .querySelector(".item-temp")
        .insertAdjacentHTML("afterbegin", `${temperatureLow} - ${temperatureHigh}`)

    document
        .querySelector(".item-humidity")
        .insertAdjacentHTML("afterbegin", `${humidityLow} - ${humidityhigh}`)

    document
        .querySelector(".item-wind")
        .insertAdjacentHTML("afterbegin", `${windspeedLow} - ${windspeedHigh}`)

    document
    .querySelector(".forecast")
    .insertAdjacentHTML("afterbegin", `${forecast}`)


       
}

getGeneralData()