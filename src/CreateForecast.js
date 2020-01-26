class CreateForecast {
  constructor(apiObj) {
    this.apiObj = apiObj;
  }

  createMainElement = () => {
    const { mainIcon, cityName, mainTemp } = this.apiObj;
    const mainContainer = document.createElement("div");
    mainContainer.className = "Cpresent";

    const backgroundContainer = document.createElement("div");
    backgroundContainer.className = "present_image";
    backgroundContainer.style.backgroundImage = `url(./images/weather_icons/${mainIcon}.png`;

    const pCity = document.createElement("p");
    pCity.innerHTML = cityName;

    const pTemp = document.createElement("p");
    pTemp.innerHTML = mainTemp;

    mainContainer.appendChild(backgroundContainer);
    mainContainer.appendChild(document.createElement("br"));
    mainContainer.appendChild(pCity);
    mainContainer.appendChild(pTemp);

    return mainContainer;
  };

  createLefContainer = () => {
    const { mainTemp, cloudy, humidity, pressure } = this.apiObj;
    const leftContainer = document.createElement("div");
    leftContainer.className = "Cfeatures";

    const tempDiv = document.createElement("div");
    const pTemp = document.createElement("p");
    const pTempValue = document.createElement("p");
    pTemp.innerHTML = "Temp:";
    pTempValue.innerHTML = `${mainTemp}°C`;
    tempDiv.appendChild(pTemp);
    tempDiv.appendChild(pTempValue);

    const cloudyDiv = document.createElement("div");
    const pCloudy = document.createElement("p");
    const pCloudyValue = document.createElement("p");
    pCloudy.innerHTML = "Cloudy:";
    pCloudyValue.innerHTML = `${cloudy}%`;
    cloudyDiv.appendChild(pCloudy);
    cloudyDiv.appendChild(pCloudyValue);

    const humidityDiv = document.createElement("div");
    const pHumidity = document.createElement("p");
    const pHumidityValue = document.createElement("p");
    pHumidity.innerHTML = "Humidty:";
    pHumidityValue.innerHTML = `${humidity}%`;
    humidityDiv.appendChild(pHumidity);
    humidityDiv.appendChild(pHumidityValue);

    const preassureDiv = document.createElement("div");
    const pPressure = document.createElement("p");
    const pPressureValue = document.createElement("p");
    pPressure.innerHTML = "Pressure:";
    pPressureValue.innerHTML = `${pressure}hPa`;
    preassureDiv.appendChild(pPressure);
    preassureDiv.appendChild(pPressureValue);

    leftContainer.appendChild(tempDiv);
    leftContainer.appendChild(cloudyDiv);
    leftContainer.appendChild(humidityDiv);
    leftContainer.appendChild(preassureDiv);

    return leftContainer;
  };

  createBottomContainer = () => {
    const { hour, temp, icon } = this.apiObj;

    const bottomContainer = document.createElement("div");
    bottomContainer.className = "Chours";

    for (let i = 0; i < 6; i++) {
      const newDiv = document.createElement("div");

      const hourDiv = document.createElement("div");
      hourDiv.className = `hour_image`;
      hourDiv.style.backgroundImage = `url(
        ./images/weather_icons/${icon[i]}.png
      )`;

      const pHour = document.createElement("p");
      pHour.innerHTML = `${hour[i].substr(hour[i].indexOf(" "), 3)}:00`;

      const pTemp = document.createElement("p");
      pTemp.innerHTML = `${temp[i]}°C`;

      newDiv.appendChild(hourDiv);
      newDiv.appendChild(pHour);
      newDiv.appendChild(pTemp);
      bottomContainer.appendChild(newDiv);
    }

    return bottomContainer;
  };

  createForecast = () => {
    const newElement = document.createElement("div");
    newElement.className = "CflexElem";
    newElement.style.backgroundColor = "rgba(0,0,0,.1)";

    const mainContainer = this.createMainElement(this.apiObj);
    const leftContainer = this.createLefContainer(this.apiObj);
    const bottomContainer = this.createBottomContainer(this.apiObj);
    newElement.appendChild(leftContainer);
    newElement.appendChild(mainContainer);
    newElement.appendChild(bottomContainer);

    return newElement;
  };
}

export default CreateForecast;
