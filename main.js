let userInput = ""
let cityWeather

function getFromApiByLocation() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude,longitude} = position.coords;
      var httpReq = new XMLHttpRequest()
      httpReq.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=f3f1574d4be2461b82001418240612&q=${latitude},${longitude}&days=3`)
      httpReq.responseType = "json"
      httpReq.send()
      httpReq.addEventListener("load", function () {
        cityWeather = httpReq.response
        let todayDate = cityWeather.location.localtime.split(" ")[0];
        let specificDate = new Date(todayDate)
        let secondDay = new Date(cityWeather.forecast.forecastday[1].date)
        let thirdDay = new Date(cityWeather.forecast.forecastday[2].date)
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let dayIndex = specificDate.getDay()
        let secondDayIndex = secondDay.getDay()
        let thirdDayIndex = thirdDay.getDay()
        let monthIndex = specificDate.getMonth()
        let dayNumber = specificDate.getDate()
        let year = specificDate.getFullYear();
        displayWeather = `
    <div class="col-lg-4 col-md-12">
    <div class="card h-100 bg-black text-white border-0">
      <div class="card-header d-flex justify-content-between py-2">
        <p class="p-0 m-0">${days[dayIndex]}</p>
        <p class="p-0 m-0">${dayNumber}-${months[monthIndex]}-${year}</p>
      </div>
      <div class="card-body">
        <h5 class="">${cityWeather.location.name}</h5>
        <div class="d-flex justify-content-around align-items-center">
          <p class="xxl py-0">${cityWeather.current.temp_c}℃</p>
          <img src="${cityWeather.current.condition.icon}" class="w-25 h-25" alt="" />
        </div>
        <p class="text-info">${cityWeather.current.condition.text}</p>
        <div class="d-flex justify-content-start gap-3">
          <div><i class="fa-solid fa-umbrella"></i> 20%</div>
          <div><i class="fa-solid fa-wind"></i> 18km/h</div>
          <div><i class="fa-solid fa-compass"></i> East</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-md-12">
    <div class="card h-100 bg-black text-white border-0">
      <div class="card-header text-center py-2">${days[secondDayIndex]}</div>
      <div
        class="card-body d-flex flex-column justify-content-center align-items-center"
      >
        <img src="${cityWeather.forecast.forecastday[1].day.condition.icon}" class="w-25" />
        <p class="fs-4 fw-semibold">${cityWeather.forecast.forecastday[1].day.maxtemp_c}℃</p>
        <p class="fs-6 text-white-50 p-0">${cityWeather.forecast.forecastday[1].day.mintemp_c}℃</p>
        <p class="text-info fs-6">${cityWeather.forecast.forecastday[1].day.condition.text}</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-md-12">
    <div class="card h-100 bg-black text-white border-0">
      <div class="card-header text-center py-2">${days[thirdDayIndex]}</div>
      <div
        class="card-body d-flex flex-column justify-content-center align-items-center"
      >
        <img src="${cityWeather.forecast.forecastday[2].day.condition.icon}" class="w-25" />
        <p class="fs-4 fw-semibold">${cityWeather.forecast.forecastday[2].day.maxtemp_c}℃</p>
        <p class="fs-6 text-white-50 p-0">${cityWeather.forecast.forecastday[2].day.mintemp_c}℃</p>
        <p class="text-info fs-6">${cityWeather.forecast.forecastday[2].day.condition.text}</p>
      </div>
    </div>
  </div>
    `
        document.querySelector("#weatherShow").innerHTML = displayWeather

      });
      resolve()
    })
  })
}
function typing() {
  return new Promise((resolve) => {
    function validateSearch(search) {
      const searchRegex = /.{0,3}([a-zA-Z]{3,}).*/;
      return searchRegex.test(search)
    }
    document.querySelector("#typingcityName").addEventListener("input", function () {
      userInput = typingcityName.value
      if (validateSearch(userInput)) {
        resolve(userInput)
      }
    })
  })
}
function getFromApi() {
  return new Promise((resolve, reject) => {
    var httpReq = new XMLHttpRequest()
    httpReq.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=f3f1574d4be2461b82001418240612&q=${userInput}&days=3`)
    httpReq.responseType = "json"
    httpReq.send()
    httpReq.addEventListener("load", function () {
      cityWeather = httpReq.response
      resolve()
    })

    httpReq.addEventListener("error", function () {
      cityWeather = httpReq.response
      reject()
    })
  })
}
function show() {
  return new Promise((resolve) => {

    let todayDate = cityWeather.location.localtime.split(" ")[0];
    let specificDate = new Date(todayDate)
    let secondDay = new Date(cityWeather.forecast.forecastday[1].date)
    let thirdDay = new Date(cityWeather.forecast.forecastday[2].date)
    let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dayIndex = specificDate.getDay()
    let secondDayIndex = secondDay.getDay()
    let thirdDayIndex = thirdDay.getDay()
    let monthIndex = specificDate.getMonth()
    let dayNumber = specificDate.getDate()
    let year = specificDate.getFullYear();
    displayWeather = `
  <div class="col-lg-4 col-md-12">
  <div class="card h-100 bg-black text-white border-0">
    <div class="card-header d-flex justify-content-between py-2">
      <p class="p-0 m-0">${days[dayIndex]}</p>
      <p class="p-0 m-0">${dayNumber}-${months[monthIndex]}-${year}</p>
    </div>
    <div class="card-body">
      <h5 class="">${cityWeather.location.name}</h5>
      <div class="d-flex justify-content-around align-items-center">
        <p class="xxl py-0">${cityWeather.current.temp_c}℃</p>
        <img src="${cityWeather.current.condition.icon}" class="w-25 h-25" alt="" />
      </div>
      <p class="text-info">${cityWeather.current.condition.text}</p>
      <div class="d-flex justify-content-start gap-3">
        <div><i class="fa-solid fa-umbrella"></i> 20%</div>
        <div><i class="fa-solid fa-wind"></i> 18km/h</div>
        <div><i class="fa-solid fa-compass"></i> East</div>
      </div>
    </div>
  </div>
</div>
<div class="col-lg-4 col-md-12">
  <div class="card h-100 bg-black text-white border-0">
    <div class="card-header text-center py-2">${days[secondDayIndex]}</div>
    <div
      class="card-body d-flex flex-column justify-content-center align-items-center"
    >
      <img src="${cityWeather.forecast.forecastday[1].day.condition.icon}" class="w-25" />
      <p class="fs-4 fw-semibold">${cityWeather.forecast.forecastday[1].day.maxtemp_c}℃</p>
      <p class="fs-6 text-white-50 p-0">${cityWeather.forecast.forecastday[1].day.mintemp_c}℃</p>
      <p class="text-info fs-6">${cityWeather.forecast.forecastday[1].day.condition.text}</p>
    </div>
  </div>
</div>
<div class="col-lg-4 col-md-12">
  <div class="card h-100 bg-black text-white border-0">
    <div class="card-header text-center py-2">${days[thirdDayIndex]}</div>
    <div
      class="card-body d-flex flex-column justify-content-center align-items-center"
    >
      <img src="${cityWeather.forecast.forecastday[2].day.condition.icon}" class="w-25" />
      <p class="fs-4 fw-semibold">${cityWeather.forecast.forecastday[2].day.maxtemp_c}℃</p>
      <p class="fs-6 text-white-50 p-0">${cityWeather.forecast.forecastday[2].day.mintemp_c}℃</p>
      <p class="text-info fs-6">${cityWeather.forecast.forecastday[2].day.condition.text}</p>
    </div>
  </div>
</div>
  `
    document.querySelector("#weatherShow").innerHTML = displayWeather
    resolve()
  })
}
async function doAll() {
  await getFromApiByLocation()
  while (true) {
    await typing()
    await getFromApi()
    show()
  }
}
doAll()