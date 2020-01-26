const createMainElement = object => {
  const mainContainer = document.createElement("div");
  mainContainer.className = "Cpresent";

  const backgroundContainer = document.createElement("div");
  backgroundContainer.className = "present_image";
  backgroundContainer.style.backgroundImage = `url(./images/weather_icons/${object.mainIcon}.png`;

  const pCity = document.createElement("p");
  pCity.innerHTML = object.cityName;

  const pTemp = document.createElement("p");
  pTemp.innerHTML = object.mainTemp;

  mainContainer.appendChild(backgroundContainer);
  mainContainer.appendChild(document.createElement("br"));
  mainContainer.appendChild(pCity);
  mainContainer.appendChild(pTemp);

  return mainContainer;
};

const createLefContainer = object => {
  const leftContainer = document.createElement("div");
  leftContainer.className = "Cfeatures";

  const tempDiv = document.createElement("div");
  const pTemp = document.createElement("p");
  const pTempValue = document.createElement("p");
  pTemp.innerHTML = "Temp:";
  pTempValue.innerHTML = `${object.mainTemp}°C`;
  tempDiv.appendChild(pTemp);
  tempDiv.appendChild(pTempValue);

  const cloudyDiv = document.createElement("div");
  const pCloudy = document.createElement("p");
  const pCloudyValue = document.createElement("p");
  pCloudy.innerHTML = "Cloudy:";
  pCloudyValue.innerHTML = `${object.cloudy}%`;
  cloudyDiv.appendChild(pCloudy);
  cloudyDiv.appendChild(pCloudyValue);

  const humidityDiv = document.createElement("div");
  const pHumidity = document.createElement("p");
  const pHumidityValue = document.createElement("p");
  pHumidity.innerHTML = "Humidty:";
  pHumidityValue.innerHTML = `${object.humidity}%`;
  humidityDiv.appendChild(pHumidity);
  humidityDiv.appendChild(pHumidityValue);

  const preassureDiv = document.createElement("div");
  const pPressure = document.createElement("p");
  const pPressureValue = document.createElement("p");
  pPressure.innerHTML = "Pressure:";
  pPressureValue.innerHTML = `${object.pressure}hPa`;
  preassureDiv.appendChild(pPressure);
  preassureDiv.appendChild(pPressureValue);

  leftContainer.appendChild(tempDiv);
  leftContainer.appendChild(cloudyDiv);
  leftContainer.appendChild(humidityDiv);
  leftContainer.appendChild(preassureDiv);

  return leftContainer;
};

const createBottomContainer = object => {
  const bottomContainer = document.createElement("div");
  bottomContainer.className = "Chours";

  for (let i = 0; i < 6; i++) {
    const newDiv = document.createElement("div");

    const hourDiv = document.createElement("div");
    hourDiv.className = `hour_image`;
    hourDiv.style.backgroundImage = `url(
        ./images/weather_icons/${object.icon[i]}.png
      )`;

    const pHour = document.createElement("p");
    pHour.innerHTML = `${object.hour[i].substr(
      object.hour[i].indexOf(" "),
      3
    )}:00`;

    const pTemp = document.createElement("p");
    pTemp.innerHTML = `${object.temp[i]}°C`;

    newDiv.appendChild(hourDiv);
    newDiv.appendChild(pHour);
    newDiv.appendChild(pTemp);
    bottomContainer.appendChild(newDiv);
  }

  return bottomContainer;
};

const createForecast = newForecast => {
  const newElement = document.createElement("div");
  newElement.className = "CflexElem";
  newElement.style.backgroundColor = "rgba(0,0,0,.1)";

  const mainContainer = createMainElement(newForecast);
  const leftContainer = createLefContainer(newForecast);
  const bottomContainer = createBottomContainer(newForecast);
  newElement.appendChild(leftContainer);
  newElement.appendChild(mainContainer);
  newElement.appendChild(bottomContainer);

  return newElement;
};

export default createForecast;
