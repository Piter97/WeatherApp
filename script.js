//https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=bed4e5796874d1288318fc8b245e8d3e
const APP_URL = "api.openweathermap.org/data/2.5/weather?q=";
const APP_APPID = ",pl&appid=bed4e5796874d1288318fc8b245e8d3e";

let countryList =[];
fetch('list.json')
.then((res) => res.json())
.then((data) => {
data.forEach(function(city){
    if (city.country == "PL"){
        countryList.push(city.name);
    }
    });
})


document.getElementById('search_city').addEventListener('keyup', findCity)
document.getElementById('search_city').addEventListener('submit', getWeather)
document.getElementById('search_city').addEventListener('keypress', getWeather)
document.getElementById('hints').addEventListener('click',getWeather)

// correctPL = string => string.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\u0142/g, "l");

function findCity(e){
    let list = document.getElementById('hints');
    let text = e.target.value.toLowerCase();
    let items = list.getElementsByTagName('li');

    list.innerHTML='';

    if (e.target.value.length>2){
        countryList.forEach((hint) => {
            let compare = hint;
            if(compare.toLowerCase().indexOf(text) != -1){
                let li = document.createElement('li');
                li.className = 'list'
                li.appendChild(document.createTextNode(hint));
                list.appendChild(li);
            }
        })
    }
    
    Array.from(items).forEach(function (item) {
        var itemName = item.innerText;
        if (itemName.toLowerCase().indexOf(text) == -1) {
            item.remove();
        }
    })

    let elements = document.querySelectorAll('.list');

    for (var i = 1; i < elements.length; i++) {
        if (elements[0].innerText==elements[i].innerText){
            elements[i].remove();
        }
    }
}

function getWeather(e){
    if(e.keyCode == 13 || e.type == "submit"){
        e.preventDefault();
        let value = (this.querySelector('[name="position"]')).value;
        let city ='';
        fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                city = `<h2>Pogoda</h2>
                <div>
                <h3>${data.city.name}</h3>
                </div>
            `;
            document.getElementById('output').innerHTML = city;
            })
            .catch((err) =>{
                alert('Nie znaleziono miasta',err);
            });
        this.reset();
        document.getElementById('hints').innerHTML='';
    }
    else if(e.type == "click"){
        e.preventDefault();
        let value = e.target.innerText;
        let city = '';
        fetch(`https://api.openweathermap.org/data/2.5/forecast/hourly?q=${value},pl&units=metric&appid=bed4e5796874d1288318fc8b245e8d3e`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                city = `<h2>Pogoda</h2>
                <div>
                <h3>${data.city.name}</h3>
                </div>
            `;
                //document.getElementById('output').innerHTML = city;
            })
            .catch((err) => {
                alert('Nie znaleziono miasta', err);
            });
        document.getElementById('search_city').reset();
        document.getElementById('hints').innerHTML = '';
    }      
}
    

// var button1 = document.getElementsByClassName("button");
// var searchInput = document.getElementById("input_city").firstElementChild;
// var gridOut = document.getElementsByClassName("main_grid");

// const searchInputDown = () => {
//     const suffix = searchInput.dataset.positioning; //px
//     document.documentElement.style.setProperty(`--${searchInput.name}`, 0 + suffix);
//     button1[0].value = "/\\";
// }

// delBtn[0].addEventListener("click", function(e){
    
// });

// button1[0].addEventListener("click", function(e){
//     searchInputDown();
// });
