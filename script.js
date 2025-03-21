async function getLocations() {
    // let loader = document.getElementById('loader');
    try {
        // loader.style.display = 'grid'
        let response = await fetch('https://square-pouncing-asphalt.glitch.me/Locations');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();

        //Sending the location data to LOCAL STORAGE
        localStorage.setItem('locations', JSON.stringify(result));

        // Populate locations immediately
        createLocationContainer(result);
    } catch (err) {
        console.error('Error fetching locations:', err);
    }finally{
        // loader.style.display = 'none'
    }
}


function createLocationContainer(data) {
    let locations = document.getElementById('locations');
    data.forEach((element) => {
        let item = document.createElement('div');
        item.className = 'containers'
        item.id = `location-${element.id}`;
        item.style.backgroundImage = `url('${element.image}')`;
        item.innerHTML = `<span class='name'>${element.city}</span>`;
        item.addEventListener('click', () => {
            // Navigate to the next page with the selected city
            navigateToCity(element.city);
        });
        locations.appendChild(item);
    });
}

// Get Popular Restaurants
async function getResturants() {
    let loader = document.getElementById('loader');
    try {
        loader.style.display = 'grid'
        let response = await fetch('https://walnut-spectacular-nation.glitch.me/PopularResturants');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Restaurants data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createLocationButton(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayRestaurants(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching restaurants:', err);
    }finally{
        loader.style.display = 'none'
    }
}

function createLocationButton(location, restaurants) {
    let locationNames = document.getElementById('restaurantNames'); // Corrected ID
    let locationBtn = document.createElement('button');
    locationBtn.textContent = location;

    locationBtn.onclick = function () {
        displayRestaurants(restaurants);
    };

    locationNames.appendChild(locationBtn);
}

function displayRestaurants(restaurants) {
    let restaurantsContainer = document.getElementById('restaurants'); // Corrected ID
    restaurantsContainer.innerHTML = ''; // Clear previous content

    restaurants.forEach(restaurant => {
        // console.log(restaurant)
        let restaurantDiv = document.createElement('div');
        restaurantDiv.className = 'containers'
        restaurantDiv.style.backgroundImage = `url(${restaurant.ResturantBannerImage})`;
        restaurantDiv.innerHTML = `<h3>${restaurant.ResturantName}</h3>`;
        restaurantsContainer.appendChild(restaurantDiv);
        restaurantDiv.onclick = ()=>{
            sendData(restaurant)
            // console.log('HELLO',restaurant)
        }
    });
}

function sendData(restaurant){
    let newObj={
        type:'resturant',
        item:restaurant
    }
    localStorage.setItem('viewPlace', JSON.stringify(newObj));
    window.location.href = '../item/item.html'; // Redirect to the details page
}

getResturants();

// Get Popular Hotels
async function getHotels() {
    let loader = document.getElementById('hotelLoader');
    try {
        loader.style.display = 'grid'
        let response = await fetch('https://pattern-vanilla-switch.glitch.me/Hotels');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Hotels data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createHotelLocationButton(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayHotels(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching hotels:', err);
    }finally{
        loader.style.display = 'none'
    }
}

function createHotelLocationButton(location, hotels) {
    let locationNames = document.getElementById('hotelNames'); // Corrected ID
    let locationBtn = document.createElement('button');
    locationBtn.textContent = location;

    locationBtn.onclick = function () {
        displayHotels(hotels);
    };

    locationNames.appendChild(locationBtn);
}

function displayHotels(hotels) {
    let hotelContainer = document.getElementById('hotels'); 
    hotelContainer.innerHTML = ''; 

    hotels.forEach(hotel => {
        let hotelDiv = document.createElement('div');
        hotelDiv.className = 'containers'
        hotelDiv.style.backgroundImage = `url(${hotel.HotelBannerImage})`;
        hotelDiv.innerHTML = `<h3>${hotel.HotelName}</h3>`;
        hotelContainer.appendChild(hotelDiv);
        hotelDiv.onclick = ()=>sendHotels(hotel)
    });
}

function sendHotels(hotel){
    let newObj={
        type:'hotel',
        item:hotel
    }
    localStorage.setItem('viewPlace', JSON.stringify(newObj));
    window.location.href = './item/item.html'; // Redirect to the details page
}

getHotels();



// Get Popular Locations
async function getPopularLocations() {
    let loader = document.getElementById('locationLoader');
    try {
        loader.style.display = 'grid'
        let response = await fetch('https://maddening-hill-alphabet.glitch.me/PopularLocations');
        if (!response.ok) {
            throw new Error(`Data failed to fetch with status: ${response.status}`);
        }
        let result = await response.json();
        console.log('Locations data:', result);  // Log the data to verify
        let isFirstCity = true;

        for (let location in result) {
            createLocationButtons(location, result[location]);

            // Automatically display the first city's data when the page loads
            if (isFirstCity) {
                displayLocations(result[location]);
                isFirstCity = false;
            }
        }
    } catch (err) {
        console.error('Error fetching Locations:', err);
    }finally{
        loader.style.display = 'none'
    }
}

function createLocationButtons(location, locations) {
    let popularLocation = document.getElementById('locationNames'); // Corrected ID
    let locationButton = document.createElement('button');
    locationButton.textContent = location;

    locationButton.onclick = function () {
        displayLocations(locations);
    };

    popularLocation.appendChild(locationButton);
}

function displayLocations(locations) {
    let locationContainer = document.getElementById('popularLocations'); // Corrected ID
    locationContainer.innerHTML = ''; // Clear previous content

    locations.forEach(location => {
        let locationDiv = document.createElement('div');
        locationDiv.className = 'containers'
        locationDiv.style.backgroundImage = `url(${location.ResturantBannerImage})`;
        locationDiv.innerHTML = `<h3>${location.ResturantName}</h3>`;
        locationContainer.appendChild(locationDiv);
        locationDiv.onclick = ()=>sendLocations(location)
    });
}

function sendLocations(location){
    let newObj={
        type:'location',
        item:location
    }
    localStorage.setItem('viewPlace', JSON.stringify(newObj));
    window.location.href = './item/item.html'; // Redirect to the details page
}
getPopularLocations();

function navigateToCity(city) {
    console.log(city)
    window.location.href = `./dataPage/data.html?city=${encodeURIComponent(city)}`;
}


function openSidebar() {
    document.getElementById("sidebar").classList.add("active");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}
function profile() {
    let userDetails = document.getElementById("userDetails");
    userDetails.classList.add("active");

    let loginDetails = JSON.parse(localStorage.getItem("LoginDetails"));
    let userName = document.getElementById("userName");
    let userEmail = document.getElementById("userEmail");
    let profilePhoto = document.getElementById("profileImg");
    let loginBtn =  document.getElementById('loginbtn');

    if (loginDetails) {
        userName.textContent = loginDetails.displayName;
        userEmail.textContent = loginDetails.email;
        profilePhoto.src = loginDetails.photoURL;
        loginBtn.textContent = 'LOGOUT'
    }
    
}
function closeProfile() {
    document.getElementById("userDetails").classList.remove("active");
}

function logInOut(){
    let loginBtn =  document.getElementById('loginbtn').textContent;
    if(loginBtn === 'LOGOUT'){
        window.location.href = './login/login.html'
        localStorage.removeItem("LoginDetails");
    }
    else if(loginBtn === 'LOGIN'){
        window.location.href = './login/login.html'
    }
}

function checklist(){
    window.location.href = './upcomingTrips/upcoming.html'
}

// Load cached data if available
document.addEventListener('DOMContentLoaded', () => {
    const cachedLocations = localStorage.getItem('locations');
    if (cachedLocations) {
        createLocationContainer(JSON.parse(cachedLocations));
    } else {
        getLocations();
    }
});