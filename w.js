// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
 
//   async function showweather() {
//     let lat = 15.354;
//     let lon = 73.9535;
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

//     const data=await response.json();

//     console.log("weather data-> ",data);

//     let newpara = document.createElement("p");
//     newpara.textContent = `${data?.main?.temp.toFixed(2)}`;
//     document.body.appendChild(newpara);
// }


// const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
  
//   function renderWeather(data) {
//     let newpara = document.createElement("p");
//     newpara.textContent = `${data?.main?.temp.toFixed(2)}`;
//     document.body.appendChild(newpara);
//   }

//   async function fetchWeather() {

//     try{
//     let city="kanpur";
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

//     const data=await response.json();

//     console.log("weather data-> ",data);
//    renderWeather(data);
    
//     }
//     catch(err){
//         //handle the error
//         console.log("Error found",err);
//     }
// }



const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAcessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');

let currentTab = userTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
               userInfoContainer.classList.remove("active");
               grantAcessContainer.classList.remove("active");
               searchForm.classList.add("active");
        }
        else{
            // phle m search weather wale tab p th ab m your weather wale tab p aagya hu 
               searchForm.classList.remove("active");
               userInfoContainer.classList.remove("active");
            // ab m your weather wale tab p agya hu to display the weather
              // for cords if we haven't save them here
               getfromSessionStorage();
        }
        
    }
    console.log("kshitij1");
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
    console.log("kshitij2");
})
    

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
    console.log("kshitij3");
})


function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
       // agar local coords nhi mile
       grantAcessContainer.classList.add("active");   
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
    console.log("kshitij4");
}

// async function fetchUserWeatherInfo(coordinates){
//     const {lat , long} = coordinates;
//     // make grant container invisible
//     grantAcessContainer.classList.remove("active");
//     // make loader visible
//     loadingScreen.classList.add("active");

//     // API call
//     try{
//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//             ); 
//         const data = await response.json();
        
//         loadingScreen.classList.remove("active");
//         userInfoContainer.classList.add("active");
//         renderWeatherInfo(data);
//     }
//     catch(err){
//         loadingScreen.classList.remove("active"); 
//     }
//     console.log("kshitij5");
// }


async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantAcessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        notFound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", fetchUserWeatherInfo);
        //HW

    }
    console.log("kshitij5");
}


// function renderWeatherInfo(weatherInfo){
//     // firstly we have to fetch the elements

//     const cityName = document.querySelector("[data-cityName]");
//     const countryIcon = document.querySelector("data-countryIcon");
//     const desc = document.querySelector("[data-weatherDesc]");
//     const weatherIcon = document.querySelector("[data-weatherIcon]");
//     const temp = document.querySelector("[data-temp]");
//     const windspeed = document.querySelector("[data-windspeed]");
//     const humidity = document.querySelector("[data-humidity]");
//     const cloudiness = document.querySelector("[data-cloudiness]");
   
//     // fetch values from weather
//     cityName.innerText = weatherInfo?.name;
//     countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
//     desc.innerText = weatherInfo?.weather?.[0]?.description;
//     weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
//     temp.innerText = weatherInfo?.main?.temp;
//     windspeed.innerText = weatherInfo?.wind?.speed;
//     humidity.innerText = weatherInfo?.main?.humidity;
//     cloudiness.innerText = weatherInfo?.clouds?.all;
//     console.log("kshitij6");
// }



function renderWeatherInfo(weatherInfo) {
    //fistly, we have to fethc the elements 

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;
    console.log("kshitij6");

}

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        grantAccessButton.style.display = 'none';
    }
    console.log("kshitij7");
}   

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    console.log("kshitij8");
    fetchUserWeatherInfo(userCoordinates);
    
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getlocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    console.log("kshitij9");
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName ==="")
    return;
    else
       fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
     loadingScreen.classList.add("active");
     userInfoContainer.classList.remove("active");
     grantAcessContainer.classList.remove("active");
     console.log("kshitij10");
     try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            ); 
        const data = await response.json();
        
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }

    catch(err){
        //error
        loadingScreen.classList.remove('active');
        userInfoContainer.classList.remove('active');
        notFound.classList.add('active');
        errorText.innerText = `${err?.message}`;
        errorBtn.style.display = "none";
    }
}