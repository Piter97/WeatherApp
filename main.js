var searchBtn = document.getElementsByClassName("button");
var searchInput = document.getElementById("input_city");
var presentTemerature, city;

searchBtn[0].addEventListener("click", function () {
    if (searchBtn[0].value === "\u21E9") {
        var value = 0;
        searchInputDown(value);
    }
    else {
        var value = -80;
        searchInputUp(value);
        searchInput.value = null;
        document.getElementById('hints').innerHTML = '';
    }
});

/*API*/
//const APP_URL = "api.openweathermap.org/data/2.5 / weather ? q =";
//const APP_APPID = ",pl&appid=bed4e5796874d1288318fc8b245e8d3e";
let countryList = [];
fetch('list.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((city) => {
            if (city.country == "PL") {
                countryList.push(city.name);
            }
        });
    });

/*Interactive list of cities*/
document.getElementById("myForm").addEventListener('keyup', (e) => {
    let list = document.getElementById('hints');
    let text = e.target.value.toLowerCase();
    let items = list.getElementsByTagName('li');
    list.innerHTML = '';

    if (e.target.value.length > 2) {
        countryList.forEach((hint) => {
            if (hint.toLowerCase().indexOf(text) != -1) {
                let li = document.createElement('li');
                li.className = 'list'
                li.appendChild(document.createTextNode(hint));
                list.appendChild(li);
            }
        });
    }

    /* if the city is already on the list */
    Array.from(items).forEach((item) => {
        var itemName = item.innerText;
        if (itemName.toLowerCase().indexOf(text) == -1) {
            item.remove();
        }
    });
    let elements = document.querySelectorAll('.list');

    for (var i = 1; i < elements.length; i++) {
        if (elements[0].innerText == elements[i].innerText) {
            elements[i].remove();
        }
    }
});

/* ASSING JSON VALUES TO DOCUMENT.ELEMENT */
// document.getElementById("submit").addEventListener("click", function (e) {
//     e.preventDefault();
//     if (searchInput.value != "") {

document.getElementById('myForm').addEventListener('submit', getWeather)
document.getElementById('myForm').addEventListener('keypress', getWeather)
document.getElementById('hints').addEventListener('click', getWeather)

function getWeather(e) {
    if (e.keyCode == 13 || e.type == "submit") {
        e.preventDefault();

        let value = searchInput.value;
        fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
            .then((res) => res.json())
            .then((data) => {
                const object = {
                    cityName: data.city.name,
                    temp: data.list[1].main.temp,
                    icon: data.list[1].weather[0].icon,
                    cloudy: data.list[1].clouds.all,
                    humidity: data.list[1].main.humidity,
                    pressure: data.list[1].main.pressure,
                    hour1: data.list[2].dt_txt,
                    temp1: data.list[2].main.temp,
                    icon1: data.list[2].weather[0].icon,
                    hour2: data.list[3].dt_txt,
                    temp2: data.list[3].main.temp,
                    icon2: data.list[3].weather[0].icon,
                    hour3: data.list[4].dt_txt,
                    temp3: data.list[4].main.temp,
                    icon3: data.list[4].weather[0].icon,
                    hour4: data.list[5].dt_txt,
                    temp4: data.list[5].main.temp,
                    icon4: data.list[5].weather[0].icon,
                    hour5: data.list[6].dt_txt,
                    temp5: data.list[6].main.temp,
                    icon5: data.list[6].weather[0].icon,
                    hour6: data.list[7].dt_txt,
                    temp6: data.list[7].main.temp,
                    icon6: data.list[7].weather[0].icon
                }
                createElement(object);
            })
            .catch((err) => {
                console.log(err);
                alert('Nie znaleziono miasta', err);
            });
        this.reset();
        document.getElementById('hints').innerHTML = '';
    }
    else if (e.type == "click") {
        e.preventDefault();
        let value = e.target.innerText;
        fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
            .then((res) => res.json())
            .then((data) => {
                var object = {
                    cityName: data.city.name,
                    temp: data.list[1].main.temp,
                    icon: data.list[1].weather[0].icon,
                    cloudy: data.list[1].clouds.all,
                    humidity: data.list[1].main.humidity,
                    pressure: data.list[1].main.pressure,
                    hour1: data.list[2].dt_txt,
                    temp1: data.list[2].main.temp,
                    icon1: data.list[2].weather[0].icon,
                    hour2: data.list[3].dt_txt,
                    temp2: data.list[3].main.temp,
                    icon2: data.list[3].weather[0].icon,
                    hour3: data.list[4].dt_txt,
                    temp3: data.list[4].main.temp,
                    icon3: data.list[4].weather[0].icon,
                    hour4: data.list[5].dt_txt,
                    temp4: data.list[5].main.temp,
                    icon4: data.list[5].weather[0].icon,
                    hour5: data.list[6].dt_txt,
                    temp5: data.list[6].main.temp,
                    icon5: data.list[6].weather[0].icon,
                    hour6: data.list[7].dt_txt,
                    temp6: data.list[7].main.temp,
                    icon6: data.list[7].weather[0].icon
                }
                createElement(object);
            })
            .catch((err) => {
                console.log(err);
                alert('Nie znaleziono miasta', err);
            });
        document.getElementById('myForm').reset();
        document.getElementById('hints').innerHTML = '';
    }
};

/* FUNCTIONS */
const searchInputDown = (value) => {
    const suffix = searchInput.dataset.positioning; //px
    document.documentElement.style.setProperty(`--${searchInput.name}`, value + suffix);
    searchBtn[0].value = "\u21E7";
}
const searchInputUp = (value) => {
    const suffix = searchInput.dataset.positioning; //px
    document.documentElement.style.setProperty(`--${searchInput.name}`, value + suffix);
    (searchBtn[0].value = "\u21E9");
}

const createElement = (object) => {
    const main = document.getElementById('mainDiv');
    const el = document.createElement("div");
    el.className = "CflexElem";
    let newDiv = '';
    newDiv=`<div class="Cfeatures">
                <div>
                    <p>Temp:</p>
                    <p>${object.temp}°C</p>
                </div>
                <div>
                    <p>Cloudy:</p>
                    <p>${object.cloudy}%</p>
                </div>
                <div>
                    <p>Humidty:</p>
                    <p>${object.humidity}%</p>
                </div>
                <div>
                    <p>Pressure:</p>
                    <p>${object.pressure}hPa</p>
                </div>
            </div>
            <div class = "Cpresent">
                <div class="present_image" style="background-image:url(./images/weather_icons/${object.icon}.png"></div>
                </br>
                <p>${object.cityName}</p>
                <p>${object.temp}°C</p>
            </div>
            <div class="Chours">
                <div>
                    <div class = "hour_image1" style="background-image:url(./images/weather_icons/${object.icon1}.png)"></div>
                    <p>${object.hour1.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp1}°C</p>
                </div>
                <div>
                    <div class = "hour_image2" style="background-image:url(./images/weather_icons/${object.icon2}.png)"></div>
                    <p>${object.hour2.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp2}°C</p>
                </div>
                <div>  
                    <div class = "hour_image3" style="background-image:url(./images/weather_icons/${object.icon3}.png)"> </div> 
                    <p>${object.hour3.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp3}°C</p>
                </div>
                <div>
                    <div class = "hour_image4" style="background-image:url(./images/weather_icons/${object.icon4}.png)"> </div>
                    <p>${object.hour4.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp4}°C</p>
                </div> 
                <div>
                    <div class = "hour_image5" style="background-image:url(./images/weather_icons/${object.icon5}.png)"></div>
                    <p>${object.hour5.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp5}°C</p>
                </div> 
                <div>
                    <div class = "hour_image6" style="background-image:url(./images/weather_icons/${object.icon6}.png)"></div>
                    <p>${object.hour6.substr(object.hour1.indexOf(' '),3)}:00</p>
                    <p>${object.temp6}°C</p>
                </div>  
            </div>`;
    console.log(object);
    el.innerHTML = newDiv;

    main.appendChild(el);

    main.appendChild(el); //Dodawanie gotowego dziecka, przypisana jest klasa "element" wiec wystarczy tylko obrobic w css i gotowe :)
    console.log(object)

}