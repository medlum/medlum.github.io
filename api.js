forecastAPI = `https://api.data.gov.sg/v1/environment/24-hour-weather-forecast?date=${date}`

fetch(forecastAPI)
				.then((res) => {
					//- show response withe console.log(rest)
					console.log(res);
					//- to return json, use .json method of the response
					return res.json();
				})
				// then chain the return json object, 'data' is a variable name
				.then((data) => {
					// console will return array with json embedded
					/*console.log(data);*/
                    /*console.log(data.items[0].general)*/
                    const forecast = (data.items[0].general.forecast);
                    const humidityLow = (data.items[0].general.relative_humidity.low);
                    const humidityHigh = (data.items[0].general.relative_humidity.high);
                    const tempLow = (data.items[0].general.temperature.low);
                    const tempHigh = (data.items[0].general.temperature.high);
                    const windLow = (data.items[0].general.wind.speed.low);
                    const windHigh = (data.items[0].general.wind.speed.high);
                    const windDirection = (data.items[0].general.wind.direction);

                    document.querySelector(".block__forecast").insertAdjacentHTML("beforeend", forecast)
                    document.getElementById("temp-low").innerHTML = tempLow;
					document.getElementById("temp-high").innerHTML = tempHigh;
                    document.getElementById("humidity-low").innerHTML = humidityLow;
					document.getElementById("humidity-high").innerHTML = humidityHigh;
					document.getElementById("wind-low").innerHTML = windLow;
					document.getElementById("wind-high").innerHTML = windHigh;
					document.getElementById("wind-direction").innerHTML = windDirection;
                    /*
                    if(forecast == "Thundery Showers"){
                        document.getElementById('forecast_animation').src = "images/rain.json"
                        console.log("YES")
                    } 
                    */

                    switch(forecast) {
                    case "Cloudy":
                        document.getElementById('weather-icon').src = "weatherimage/cloudy.svg"
                        break;
                    
                    case "Thundery Showers":
                        document.getElementById('weather-icon').src = "weatherimage/thundery-shower.svg"
                        break;
                    
                    case "Partly Cloudy":
                        document.getElementById('weather-icon').src = "weatherimage/cloudy-sunny.svg"
                        break;
                    
                    case "Showers":
                        document.getElementById('weather-icon').src = "weatherimage/cloudy-raining.svg"
                        break;
                    
                    }
                    
                });



