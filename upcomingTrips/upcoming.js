let dynamicTtile = document.getElementById('dynamicTtile')
//get Data From Local Storage
let bookings = JSON.parse(localStorage.getItem("bookings"));
console.log(bookings)
let popularBookings = JSON.parse(localStorage.getItem('popular'));
console.log(popularBookings)
let dataContainer = document.getElementById("dataContainer")
function getResturants() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach(object => {
        if (object.type === 'restaurant') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.thumbnail}'/>
            </div>
            <div class='detailsContainer'>
            <span>Restro Name:<b> ${object.item.name}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Payment: <b>${object.item.priceTypes}</b> </span>
            <span>Status: <b>${object.item.openStatusText}</b> </span>
            <span>Contact:  <b>${object.item.telephone}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object);
        }
    });

    // if (!hasData) {
    //     dataContainer.innerHTML = `<span>Currently, you don't have any restaurant bookings</span>`;
    // }
    getPopularResturants()
}

function getPopularResturants() {
    // dataContainer.innerHTML = "";
    let hasData = false;

    popularBookings.forEach(object => {
        if (object.type === 'restaurant') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.ResturantBannerImage}'/>
            </div>
            <div class='detailsContainer'>
            <span>Restro Name:<b> ${object.item.ResturantName}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Address: <b>${object.item.ResturantAddress}</b> </span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deletePopularData(object);
        }
    });

    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any restaurant bookings</span>`;
    }
}

function getHotels() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach(object => {
        if (object.type === 'hotel') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.thumbnail}'/>
            </div>
            <div class='detailsContainer'>
            <span>Hotel: <b>${object.item.name}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Address: <b>${object.item.address.fullAddress}</b></span>
            <span>Price: <b>Min:${object.item.price.priceMin}$</b> - <b>Max:${object.item.price.priceMax}$</b></span>
            <span>Contact: <b>${object.item.contacts.phone}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object);
        }
    });

    // if (!hasData) {
    //     dataContainer.innerHTML = `<span>Currently, you don't have any hotel bookings</span>`;
    // }
    getPopularHotels()
}

function getPopularHotels() {
    // dataContainer.innerHTML = "";
    let hasData = false;

    popularBookings.forEach(object => {
        if (object.type === 'hotel') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.HotelBannerImage}'/>
            </div>
            <div class='detailsContainer'>
            <span>Hotel: <b>${object.item.HotelName}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Address: <b>${object.item.HotelAddress}</b></span>
            <span>Contact: <b>${object.item.contacts.phone}</b></span>
            <span>Website: <b>${object.item.contacts.website}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deletePopularData(object);
        }
    });

    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any hotel bookings</span>`;
    }
}

function getLocations() {
    dataContainer.innerHTML = "";
    let hasData = false;

    bookings.forEach((object, index) => {
        if (object.type === 'place') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.image}'/>
            </div>
            <div class='detailsContainer'>
            <span>Title: <b>${object.item.title}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Operator: <b>${object.item.operator}</b></span>
            <span>Price: <b>${object.item.price.total}$</b></span>
            <span>Duration: <b>${object.item.duration}</b></span>
            <span>Cancellation: <b>${object.item.cancellation}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deleteData(object, index);
        }
    });

    // if (!hasData) {
    //     dataContainer.innerHTML = `<span>Currently, you don't have any location bookings</span>`;
    // }
    getPopularLocations()
}
function getPopularLocations() {
    // dataContainer.innerHTML = "";
    let hasData = false;

    popularBookings.forEach((object, index) => {
        if (object.type === 'place') {
            hasData = true;
            let itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
            <div class='imageContainer'>
            <img src= '${object.item.ResturantBannerImage}'/>
            </div>
            <div class='detailsContainer'>
            <span>Title: <b>${object.item.ResturantName}</b></span>
            <span>Booked On: <b>${object.date}</b></span>
            <span>Address: <b>${object.item.ResturantAddress}</b></span>
            </div>
            <div class='buttonContainer'>
                <button class='delete-btn'>Delete</button>
            </div>
            `;
            dataContainer.appendChild(itemDiv);
            itemDiv.querySelector(".delete-btn").onclick = () => deletePopularData(object, index);
        }
    });
    if (!hasData) {
        dataContainer.innerHTML = `<span>Currently, you don't have any location bookings</span>`;
    }
}

function deleteData(obj, index) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    getLocations();
    getHotels();
    getResturants();
}
function deletePopularData(obj, index) {
    popularBookings.splice(index, 1);
    localStorage.setItem("popular", JSON.stringify(popularBookings));
    getLocations();
    getHotels();
    getResturants();
}

// Initial Calls
getResturants();
getHotels();
getLocations();

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
    let loginBtn = document.getElementById('loginbtn');

    if (loginDetails) {
        userName.textContent = loginDetails.displayName;
        userEmail.textContent = loginDetails.email;
        profilePhoto.src = loginDetails.photoURL;
        loginBtn.textContent = 'LOGOUT'
    }

}
function logInOut() {
    let loginBtn = document.getElementById('loginbtn').textContent;
    if (loginBtn === 'LOGOUT') {
        window.location.href = '../login/login.html'
        localStorage.removeItem("LoginDetails");
    }
    else if (loginBtn === 'LOGIN') {
        window.location.href = '../login/login.html'
    }
}

function closeProfile() {
    document.getElementById("userDetails").classList.remove("active");
}