var searchBtn = document.getElementsByClassName("button");
var searchInput = document.getElementById("input_city");
var presentTemerature, city;
var _featuresTab = ["Temp:", , "Pressure:", , "Cloudy:", , "Humidity",];
var _hoursTab = [];

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
    list.style.position = "absolute";
    list.innerHTML = '';

    if (e.target.value.length > 2) {
        countryList.forEach((hint) => {
            let compare = hint;
            if (compare.toLowerCase().indexOf(text) != -1) {
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
    //let elements = document.querySelectorAll('.list');
    for (var i = 1; i < items.length; i++) {
        if (items[0].innerText == items[i].innerText) {
            items[i].remove();
        }
    }
});

/* ASSING JSON VALUES TO DOCUMENT.ELEMENT */
document.getElementById("submit").addEventListener("click", async function (e) {
    e.preventDefault();
    if (searchInput.value != "") {
        let value = searchInput.value;
        await fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
            .then((res) => res.json())
            .then((data) => {
                city = data.city.name;  //city
                // presentTemerature = data.city.country//present temperature
                // _featuresTab[1] = `${data.city.id}°C`; //sensed temperature
                // _featuresTab[3] = `${data.city.id}hPa`; //pressure
                // _featuresTab[5] = `${data.city.id}%`; //cloudy
                // _featuresTab[7] = `${data.city.id}%`; //humidity
                // _hoursTab[0] = "12:00" //hour1
                // _hoursTab[1] = "42.1°C`" //temp1
                // _hoursTab[2] = "13:00" //hour2
                // _hoursTab[3] = "25.2°C`" //temp2
                // _hoursTab[4] = "14:00" //hour3
                // _hoursTab[5] = "31.1°C`" //temp3
                // _hoursTab[6] = "15:00" //hour4
                // _hoursTab[7] = "16.3°C`" //temp4
                // _hoursTab[8] = "16:00" //hour5
                // _hoursTab[9] = "15.3°C`" //temp5
                // _hoursTab[10] = "17:00" //hour6
                // _hoursTab[11] = "10.4°C`" //temp6
                createElement(data.city.id, data.city.id, data.city.id, data.city.id);
            })
            .catch((err) => {
                alert('Nie znaleziono miasta', err);
            });
        searchInput.value = null;
        document.getElementById('hints').innerHTML = '';
    }
});

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

const createElement = (val1, val2, val3, val4) => {
    const main = document.getElementById('mainDiv');
    const el = document.createElement("div");
    el.className = "CflexElem";
    let newDiv = '';
    newDiv=`<div class="Cfeatures">
                <div>
                    <p>Temp:</p>
                    <p>${val1}</p>
                </div>
                <div>
                    <p>Cloudy:</p>
                    <p>${val2}%</p>
                </div>
                <div>
                    <p>Humidty:</p>
                    <p>${val3}%</p>
                </div>
                <div>
                    <p>Pressure:</p>
                    <p>${val4}hPa</p>
                </div>
            </div>
            <div class = "Cpresent">
                <div class="present_image"></div>
                </br>
                <p>city</p>
                <p>23.6</p>
            </div>
            <div class="Chours">
                <div>
                    <div class = "hour_image1"></div>
                    <p>12:00</p>
                    <p>21.5</p>
                </div>
                <div>
                    <div class = "hour_image2"></div>
                    <p>13:00</p>
                    <p>24</p>
                </div>
                <div>  
                    <div class = "hour_image3"> </div> 
                    <p>14:00</p>
                    <p>24</p>
                </div>
                <div>
                    <div class = "hour_image4"> </div>
                    <p>15:00</p>
                    <p>25</p>
                </div> 
                <div>
                    <div class = "hour_image5"></div>
                    <p>16:00</p>
                    <p>25</p>
                </div> 
                <div>
                    <div class = "hour_image6"></div>
                    <p>17:00</p>
                    <p>23</p>
                </div>  
            </div>`;
    el.innerHTML = newDiv;
    main.appendChild(el); //Dodawanie gotowego dziecka, przypisana jest klasa "element" wiec wystarczy tylko obrobic w css i gotowe :) 
}