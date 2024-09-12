"use strict";

// hi

let firstDay = document.querySelector("#firstDay");
let secDay = document.querySelector("#secDay");
let thirdDay = document.querySelector("#thirdDay");
let inputFind = document.querySelector("#inputFind");
let btnFind = document.querySelector("#btnFind");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getLocation(latitude, longitude);
    },
    function (error) {
      GetWeather("egypt");

      console.log(error);
    }
  );
}

async function getLocation(latitude, longitude) {
  let data = await fetch(
    `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  let allData = await data.json();
  //  console.log("All Data from api --> ",allData.city);
  GetWeather(allData.city);
}

inputFind.addEventListener("keyup", function () {
  GetWeather(this.value);
});
btnFind.addEventListener("click", function () {
  let location = inputFind.value;
  GetWeather(location);
});

async function GetWeather(location) {
  let data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=fb0ab230ccd14d51a13142226240909&q=${location}&days=3&aqi=no&alerts=no`
  );
  let allData = await data.json();
  // console.log("All Data from api -->>   ", allData);
  ShowWeatherInLast3Days(allData);
}

function ShowWeatherInLast3Days(myData) {
  // get Days number and name and month

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  // Log the day names and formatted dates
  // console.log(`Today: ${getDayName(today)}, ${formatDate(today)}`);
  // console.log(`Tomorrow: ${getDayName(tomorrow)}, ${formatDate(tomorrow)}`);
  // console.log(`Day after tomorrow: ${getDayName(dayAfterTomorrow)}, ${formatDate(dayAfterTomorrow)}`);

  // firstDay Data

  let month = formatDate(today);
  let currentDay = getDayName(today);
  let stattusImg = myData.forecast.forecastday[0].day.condition.icon;
  let stattusText = myData.forecast.forecastday[0].day.condition.text;
  let currentTemp = myData.current.temp_c;
  let daily_chance_of_rain =
    myData.forecast.forecastday[0].day.daily_chance_of_rain;
  // let currentDay = myData.forecast.forecastday[0].date;
  let location = myData.location.name;
  let gust_kph = myData.current.gust_kph;

  // secDay Data

  let secTemp_max = myData.forecast.forecastday[1].day.maxtemp_c;
  let secTemp_min = myData.forecast.forecastday[1].day.mintemp_c;

  let secDayDAte = getDayName(tomorrow);
  let secDayCondition = myData.forecast.forecastday[1].day.condition;

  // thirdDay Data

  let thirdTemp_max = myData.forecast.forecastday[2].day.maxtemp_c;
  let thirdTemp_min = myData.forecast.forecastday[2].day.mintemp_c;

  let thirdDayDAte = getDayName(dayAfterTomorrow)
  let thirdDayCondition = myData.forecast.forecastday[2].day.condition;

  firstDay.innerHTML = `    <div class="elmentDay   list-unstyled">
                <ul class="list-unstyled d-flex  justify-content-between">
                    <li >${currentDay}</li>
                    <li > ${month}</li>
                </ul>
            
                </div>


                        <h6 class=" fw-bold  fa-1x">${location}</h6>
                        <h1 class="text-white fa-4x fw-bold">${
                          currentTemp + "℃"
                        }
                        

                        </h1>
                                                 <img  class="w-25" src="${
                                                   stattusImg
                                                     ? stattusImg
                                                     : "./img/error.png"
                                                 }" alt="">

                        <p class="stattusText">${stattusText}
                        </p>
                         <div class="d-flex    justify-content-around  align-items-center w-75 mb-4 ">
                                <img src="./img/icon-umberella.png" alt=""> <span>${daily_chance_of_rain}%</span>
                                <img src="./img/icon-wind.png" alt=""> <span>${gust_kph}km/h</span>
                                <img src="./img/icon-compass.png" alt=""> <span >East</span>
                            </div>
         
                        
`;

  secDay.innerHTML = `
<div class=" elmentDay   top-0 w-100  list-unstyled">${secDayDAte}</div>
<img class="pb-4 w-25" src="${
    secDayCondition.icon ? secDayCondition.icon : "./img/error.png"
  }" alt="">

<h4 class="text-white">${secTemp_max + "℃"}
</h4>
<p>${secTemp_min}</p>


<p class="stattusText">${secDayCondition.text}
                        </p>

`;
  thirdDay.innerHTML = `
<div class="elmentDay   top-0 w-100  list-unstyled">${thirdDayDAte}</div>
<img class="pb-4 w-25"  src="${
    thirdDayCondition.icon ? thirdDayCondition.icon : "./img/error.png"
  }" alt="">
<h4 class="text-white">${thirdTemp_max + "℃"}


</h4>
<p>${thirdTemp_min}</p>


                        <p class="stattusText">${thirdDayCondition.text}
                        </p>

                        


`;
}

function getDayName(date) {
  const options = { weekday: "long" };
  return date.toLocaleDateString(undefined, options);
}

function formatDate(date) {
  const dayOptions = { day: "numeric" };
  const monthOptions = { month: "long" };
  return `${date.toLocaleDateString(
    undefined,
    dayOptions
  )} ${date.toLocaleDateString(undefined, monthOptions)}`;
}
