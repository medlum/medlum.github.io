let today = new Date();

const date = {
    year : today.getFullYear(),
    month : String(today.getMonth() + 1).padStart(2, "0"),
    monthName : today.toLocaleString('default', { month: 'long' }),
    day : String(today.getDate()).padStart(2,"0"),
    weekday : today.getDay(),
    weekdayName : today.toLocaleString('default', { weekday: 'long' }),
    hour : String(today.getHours()).padStart(2, "0"),
    min : String(today.getMinutes()).padStart(2, "0"),
    secs : String(today.getSeconds()).padStart(2,"0")
  
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

console.log(api24hour)

const get24HourData = (data,time) =>{

    const periodArray = Object.keys(data.items[0].periods);
    const periodObj = data.items[0].periods;
    periodArray.forEach((i) => {

        /*console.log(`${i} : ${periodObj[i].time.start}`)*/
        hourString = (periodObj[i].time.start);
        hourString = hourString.slice(11,16)
        /*console.log(time == hourString);*/
        const regionObj = data.items[0].periods[i].regions;
        const regionkey = Object.keys(regionObj);

        switch(time){
            case hourString:
                regionkey.forEach((area) => {
                    const Forecast = `${regionObj[area]}`;
                    console.log(`${area}: ${regionObj[area]}`);  
                    switch(Forecast) {
                        case "Cloudy":
                            document.getElementById(`${area}`).innerHTML = `<span class="icon"><img class= cloudy src="/images/cloudy.gif"
                            alt=""/></span> `
                            break;
                            /*
                            <i class="fa-solid fa-cloud"></i>
                            <i class="fas fa-cloud-bolt"></i>
                            <i class="fa-solid fa-cloud-moon"></i>
                            <i class="fa-solid fa-cloud-showers-heavy">
                            */
                        
                        case "Thundery Showers":
                            document.getElementById(`${area}`).innerHTML = `<span class="icon"><img class= thundery src="/images/thunderstorm.gif"
                            alt=""/></span> `
                            break;
                        
                        case "Partly Cloudy (Day)":
                            document.getElementById(`${area}`).innerHTML = `<span class="icon"><img class= partly-cloudy src="/images/cloudy-sun.gif"
                            alt=""/></span> `
                            break;

                        case "Partly Cloudy (Night)":
                            document.getElementById(`${area}`).innerHTML = `<span class="icon"><img class= cloudy-night src="/images/cloudy-night.gif"
                            alt=""/></span>  `
                            break;
                        
                        case "Showers":
                            document.getElementById(`${area}`).innerHTML = `<span class="icon"><img class= shower src="/images/torrential-rain.gif"
                            alt=""/></span> `
                            break;
                    }   
                })
                break;
        }
    })  
};

let btnAM = document.getElementById("event-am");

btnAM.addEventListener("mouseover", function (event) {
fetch(api24hour)
.then((data) => data.json())
.then((data) => get24HourData(data, time="06:00")) 
});

/*Insert noon forecast with event to button 'event-pm'*/
let btnPM = document.getElementById("event-pm");

btnPM.addEventListener("mouseover", function (event) {
fetch(api24hour)
.then((data) => data.json())
.then((data) => get24HourData(data,time="12:00")) 
});

/*Insert night forecast with event to button 'event-night'*/
let btnNight = document.getElementById("event-night");
btnNight.addEventListener("mouseover", function (event) {
fetch(api24hour)
.then((data) => data.json())
.then((data) => get24HourData(data,time="18:00")) 
});


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

        
    //document
    //.querySelector(".forecast")
    //.insertAdjacentHTML("beforeend", `${forecast}`)
    


       
}

getGeneralData()


query = date.hour;
const getGeneralData2 = () => {
    fetch(api24hour)
        .then((data) => data.json())
        .then((data) => {
            arrPeriod = data.items[0].periods;

            arrPeriod.map(({ time, regions }) => {
                if (query > 18) {
                    getRegionForecast(06, "morning");
                } else if (query > 12) {
                    getRegionForecast(18, "night");
                } else if (query > 06) {
                    getRegionForecast(12, "afternoon");
                } else if (query < 06) {
                    getRegionForecast(06, "morning");
                }

                //global function to find least frequent value
                function leastFrequent(arr, n) {
                    // Sort the array
                    arr.sort();

                    // find the min frequency using
                    // linear traversal
                    let min_count = n + 1,
                        res = -1;
                    let curr_count = 1;

                    for (let i = 1; i < n; i++) {
                        if (arr[i] == arr[i - 1]) {
                            curr_count++;
                        } else {
                            if (curr_count < min_count) {
                                min_count = curr_count;
                                res = arr[i - 1];
                            }

                            curr_count = 1;
                        }
                    }

                    // If last element is least frequent

                    if (curr_count < min_count) {
                        min_count = curr_count;

                        res = arr[n - 1];
                    }

                    return res;
                }

                // new function
                function getRegionForecast(hourtime, daypart) {
                    if (time.start.slice(11, 13) == hourtime) {
                        const arr = [
                            regions.west,
                            regions.east,
                            regions.central,
                            regions.south,
                            regions.north,
                        ];

                        const dict = {
                            west: regions.west,
                            east: regions.east,
                            central: regions.central,
                            south: regions.south,
                            north: regions.north,
                        };

                        const allEqual = (arr) => arr.every((val) => val === arr[0]);
                        if (allEqual(arr)) {
                            console.log(
                                `Expects ${arr[0]} in most part of the island in the ${daypart}`
                            );

                            forecastSummary = `Expects ${arr[0]} in most part of the island in the ${daypart}`

                            document
                            .querySelector(".forecast")
                            .insertAdjacentHTML("beforeend", `${forecastSummary}`)

                            /*if all values are not equal, find the least frequent value
                using leastFrequent() function*/
                        } else {
                            let mf = 1;
                            let m = 0;
                            let item;
                            for (let i = 0; i < arr.length; i++) {
                                for (let j = i; j < arr.length; j++) {
                                    if (arr[i] == arr[j]) m++;
                                    if (mf < m) {
                                        mf = m;
                                        item = arr[i];
                                    }
                                }
                                m = 0;
                            }

                            ele = [];
                            /*initialize a const to store outcome from function*/
                            const outcome = leastFrequent(arr, arr.length);
                            /*if key-value pair == outcome, store it in ele*/
                            Object.keys(dict).forEach((element) => {
                                if (dict[element] == outcome) {
                                    ele.push(element);
                                }
                            });

                            /* log message for least and most frequent value*/
                            console.log(
                                `${leastFrequent(arr, arr.length)} in the ${ele.join(
                                    " and "
                                )}. ${item} for the rest of the island in the ${daypart}.`
                            );
                        }
                    }
                }
            });
        });
};

getGeneralData2();

