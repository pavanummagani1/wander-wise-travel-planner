document.addEventListener("DOMContentLoaded", function () {
    let mainContainer = document.getElementById('mainContainer');
    mainContainer.innerHTML = "";

    let data = localStorage.getItem('viewPlace');
    // let hotelData = localStorage.getItem('popularHotels');
    // let locationData = localStorage.getItem('popularSelectedLocations');
    data = JSON.parse(data)
    console.log(data)
    if (data.type === 'resturant') {
        renderRestaurantPage(data.item);   
    } else if (data.type === 'hotel') {
        renderHotelPage(data.item);
    } else if (data.type === 'location') {
        renderLocationsPage(data.item);
    } else {
        alert("No hotel, restaurant, or place data found.");
    }

    $('.owl-carousel').owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        margin: 10,
        nav: true,
    });
});

function renderRestaurantPage(restaurant) {
    let mainContainer = document.getElementById('mainContainer');

    let imageCarousel = document.createElement('div');
    imageCarousel.className = 'imageCarousel owl-carousel';

    restaurant.ResturantImages.forEach((photo) => {
        let imgElement = document.createElement('img');
        imgElement.src = photo;
        imgElement.alt = 'Image';
        imageCarousel.appendChild(imgElement);
    });

    let detailsContainer = document.createElement('div');
    let restaurantName = document.createElement('h2');
    restaurantName.className = 'ResturnatName';
    restaurantName.textContent = restaurant.ResturantName;
    detailsContainer.appendChild(restaurantName);

    let restaurantAddress = document.createElement('span');
    restaurantAddress.className = 'ResturnatAddress';
    restaurantAddress.textContent = `Address: ${restaurant.ResturantAddress}`;
    detailsContainer.appendChild(restaurantAddress);

    restaurant.Cusine.forEach((value) => {
        let cuisine = document.createElement('span');
        cuisine.className = 'cusine';
        cuisine.textContent = `Cuisine: ${value}`;
        detailsContainer.appendChild(cuisine);
    });

    restaurant.Payments.forEach((val) => {
        let payment = document.createElement('span');
        payment.className = 'paymentType';
        payment.textContent = `Payment Type: ${val}`;
        detailsContainer.appendChild(payment);
    });

    let bookNowBtn = document.createElement('button');
    bookNowBtn.textContent = 'Book Now';
    bookNowBtn.className = 'bookNow';
    bookNowBtn.addEventListener('click', function () {
        currentBookingItem = restaurant;
        currentBookingType = 'restaurant';
        openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
    });

    detailsContainer.appendChild(bookNowBtn);
    mainContainer.append(imageCarousel, detailsContainer);
}

// Hotel Rendering
function renderHotelPage(hotel) {
    let mainContainer = document.getElementById('mainContainer');

    let imageCarousel = document.createElement('div');
    imageCarousel.className = 'imageCarousel owl-carousel';

    hotel.HotelImages.forEach((photo) => {
        let imgElement = document.createElement('img');
        imgElement.src = photo;
        imgElement.alt = 'Image';
        imageCarousel.appendChild(imgElement);
    });

    let detailsContainer = document.createElement('div');
    let hotelName = document.createElement('h2');
    hotelName.className = 'ResturnatName';
    hotelName.textContent = hotel.HotelName;
    detailsContainer.appendChild(hotelName);

    let hotelAddress = document.createElement('span');
    hotelAddress.className = 'ResturnatAddress';
    hotelAddress.textContent = hotel.HotelAddress;
    detailsContainer.appendChild(hotelAddress);

    hotel.Amenities.forEach((value) => {
        let amenity = document.createElement('span');
        amenity.className = 'amnities';
        amenity.textContent = value;
        detailsContainer.appendChild(amenity);
    });

    for (let key in hotel.contacts) {
        let contact = document.createElement('span');
        contact.className = 'paymentType';
        contact.textContent = `${key}: ${hotel.contacts[key]}`;
        detailsContainer.appendChild(contact);
    }

    let bookNowBtn = document.createElement('button');
    bookNowBtn.textContent = 'Book Now';
    bookNowBtn.className = 'bookNow';
    bookNowBtn.addEventListener('click', function () {
        currentBookingItem = hotel;
        currentBookingType = 'hotel';
        openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
    });

    detailsContainer.appendChild(bookNowBtn);
    mainContainer.append(imageCarousel, detailsContainer);
}
function renderLocationsPage(locations) {
    console.log(locations)
    let mainContainer = document.getElementById('mainContainer');
    
    let imageCarousel = document.createElement('div');
    imageCarousel.className = 'imageCarousel owl-carousel';

    locations.ResturantImages.forEach((photo) => {
        let imgElement = document.createElement('img');
        imgElement.src = photo;
        imgElement.alt = 'Image';
        imageCarousel.appendChild(imgElement);
    });

    let detailsContainer = document.createElement('div');
    let restaurantName = document.createElement('h2');
    restaurantName.className = 'ResturnatName';
    restaurantName.textContent = locations.ResturantName;
    detailsContainer.appendChild(restaurantName);

    let restaurantAddress = document.createElement('span');
    restaurantAddress.className = 'ResturnatAddress';
    restaurantAddress.textContent = `Address:${locations.ResturantAddress}`;
    detailsContainer.appendChild(restaurantAddress);

    locations.Cusine.forEach((value) => {
        let cuisine = document.createElement('span');
        cuisine.className = 'cusine';
        cuisine.textContent = `Cuisine: ${value}`;
        detailsContainer.appendChild(cuisine);
    });

    locations.Payments.forEach((val) => {
        let payment = document.createElement('span');
        payment.className = 'paymentType';
        payment.textContent = `Payment Type: ${val}`;
        detailsContainer.appendChild(payment);
    });
    let bookNowBtn =  document.createElement('button')
    bookNowBtn.textContent = 'Book Now'
    bookNowBtn.className = 'bookNow'
    bookNowBtn.addEventListener('click', function () {
        currentBookingItem = locations;
        currentBookingType = 'place';
        openModal('Booking Confirmation', 'Do you want to proceed with your booking?');
    })
    detailsContainer.appendChild(bookNowBtn)
    mainContainer.append(imageCarousel, detailsContainer);
}

// Modal Elements
const modal = document.getElementById('modalContainer');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeModal = document.querySelector('.close');
const confirmMessage = document.getElementById('bookingconfrimMessage');

let currentBookingItem = null;
let currentBookingType = null;

function openModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

function closeModalFunc() {
    modal.style.display = 'none';
    currentBookingItem = null;
    currentBookingType = null;
    document.getElementById('date').value = ''; // Reset date input
}

// Confirm Booking
confirmBtn.addEventListener('click', () => {
    const date = document.getElementById('date').value;
    if (!date) {
        alert("Please select a date before confirming.");
        return;
    }

    if (!currentBookingItem || !currentBookingType) {
        alert("No booking item selected.");
        return;
    }
    // let  loginDetails = JSON.parse(localStorage.getItem('LoginDetails')) ||[];
    // if(loginDetails.emailVerified===false){
    //     window.location.href = "../login/login.html"
    // }
    const popularBookings = {
        item: currentBookingItem,
        date: date,
        type: currentBookingType
    };

    // Store the new booking
    const existingBookings = JSON.parse(localStorage.getItem('popular')) || [];
    console.log(existingBookings);
    existingBookings.push(popularBookings)
    console.log(existingBookings);
    localStorage.setItem('popular', JSON.stringify(existingBookings));

    // Show confirmation
    confirmMessage.style.display = 'inline';
    confirmMessage.textContent = `Booking confirmed for ${currentBookingItem.ResturantName || currentBookingItem.HotelName} on ${date}!`;
    confirmMessage.style.color = "green";

    setTimeout(() => {
        closeModalFunc();
        // Remove old booking data and redirect
        localStorage.removeItem('popularRestaurant');
        localStorage.removeItem('popularHotels');
        localStorage.removeItem('popularSelectedLocations');

    }, 1000);
    setTimeout(()=>{
        confirmMessage.style.display = 'block';
        window.location.href = "../upcomingTrips/upcoming.html";
    },3000)
});


// Close modal when clicking on close or outside modal
closeModal.addEventListener('click', closeModalFunc);
cancelBtn.addEventListener('click', closeModalFunc);
window.addEventListener('click', (event) => {
    if (event.target === modal) closeModalFunc();
});


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

function logInOut(){
    let loginBtn =  document.getElementById('loginbtn').textContent;
    if(loginBtn === 'LOGOUT'){
        window.location.href = '../login/login.html'
        localStorage.removeItem("LoginDetails");
    }
    else if(loginBtn === 'LOGIN'){
        window.location.href = '../login/login.html'
    }
}
function closeProfile() {
    document.getElementById("userDetails").classList.remove("active");
}

function checklist(){
    window.location.href = './upcomingTrips/upcoming.html'
}