import CreateForecast from "./src/CreateForecast.js";

const backgroundChange = () => {
  const date = new Date();
  const month = date.getMonth();
  const hour = date.getHours();
  let cssString = null;

  if (month >= 2 && month < 5 && hour > 6 && hour < 19) {
    cssString = "background-image:url(./images/spring.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (month >= 2 && month < 5 && (hour >= 19 || hour <= 6)) {
    cssString = "background-image:url(./images/springNight.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (month >= 5 && month < 8 && hour > 5 && hour < 20) {
    cssString = "background-image:url(./images/summer.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (month >= 5 && month < 8 && (hour >= 20 || hour <= 5)) {
    cssString = "background-image:url(./images/summerNight.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (month >= 9 && month < 11 && hour > 7 && hour < 18) {
    cssString = "background-image:url(./images/autumn.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (month >= 9 && month < 11 && (hour >= 18 || hour <= 7)) {
    cssString = "background-image:url(./images/autumnNight.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (
    ((month >= 0 && month < 2) || month === 11) &&
    hour > 8 &&
    hour < 16
  ) {
    cssString = "background-image:url(./images/winter.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else if (
    ((month >= 0 && month < 2) || month === 11) &&
    (hour >= 16 || hour <= 8)
  ) {
    cssString = "background-image:url(./images/winterNight.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  } else {
    cssString = "background-image:url(./images/sunset.jpg)";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div id="backgroundImage" style="${cssString}"></div>`
    );
  }
};

const getWeather = async e => {
  e.preventDefault();

  const mainContainer = document.getElementById("mainDiv");
  const input = document.getElementById("searchBar");
  const isFullContainer = mainContainer.childElementCount + 1 > 9;
  if (isFullContainer) {
    alert("You can only create nine forecast");
  } else {
    const apiKey = "58a933f10d950bb1099fa571bedcadea";
    const value = input.value;
    const apiUrl = `//api.openweathermap.org/data/2.5/forecast?q=${value},pl&appid=${apiKey}`;
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      const objectFromApi = assingApiToElement(data);
      const createForecast = new CreateForecast(objectFromApi);
      const newElement = createForecast.createForecast();
      mainContainer.appendChild(newElement);
    } catch (err) {
      alert(`There is no "${value}" city in API`);
      console.log(err);
    }
  }
  input.value = "";
};

const assingApiToElement = data => {
  const kelvinTemp = 273.15;
  const hour = [];
  const temp = [];
  const icon = [];
  for (let i = 2; i < 8; i++) {
    hour.push(data.list[i].dt_txt);
    temp.push(Math.round(data.list[i].main.temp - kelvinTemp));
    icon.push(data.list[i].weather[0].icon);
  }
  const object = {
    cityName: data.city.name,
    mainTemp: Math.round(data.list[1].main.temp - kelvinTemp),
    mainIcon: data.list[1].weather[0].icon,
    cloudy: data.list[1].clouds.all,
    humidity: data.list[1].main.humidity,
    pressure: Math.round(data.list[1].main.pressure),
    hour: hour,
    temp: temp,
    icon: icon
  };

  return object;
};

document.addEventListener("load", backgroundChange());

const cityFormContainer = document.getElementById("myForm");
cityFormContainer.addEventListener("submit", getWeather);
