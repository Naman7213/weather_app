require('dotenv').config();
const cityName = document.getElementById("cityName");
const submitBtn = document.getElementById("submitBtn");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector('.middle_layer');


const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        datahide.classList.add('data_hide');
        alert('Please write city name before search');
    }
    else{
        try{
            let API_KEY_VALUE= process.env.API_KEY;
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${API_KEY_VALUE}`;
            const response = await fetch(url);
            const jsonResponse = await response.json();
            const arrData = [jsonResponse];
            // city_name.innerText= arrData[0].name arrData[0].sys.country;
            temp_real_val.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            
            const tempMood = arrData[0].weather[0].main;
            if(tempMood=='Clear'){
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68'></i>"
            }
            else if(tempMood=='Clouds'){
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6'></i>"
            }
            else if(tempMood=='Rain'){
                temp_status.innerHTML="<i class='fas fa-rain' style='color:#a4b0be'></i>"
            }
            else{
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68'></i>"
            }
            datahide.classList.remove('data_hide');
        }
        catch{
            alert("Something goes wrong");
            datahide.classList.add('data_hide');
        }
    }
}
submitBtn.addEventListener('click',getInfo);