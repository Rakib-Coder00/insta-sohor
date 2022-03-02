
const main = document.getElementById('main')
const form = document.getElementById('form')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchResult = document.getElementById('search-result')
const displayDetails = document.getElementById('phone-details')


// Search input field : 
const searchTerm = ()=> {
    const searchTxt = searchInput.value
    // console.log(searchTxt);
    searchInput.value = ''
    
    const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${searchTxt}`
    fetch(searchUrl)
    // console.log(searchUrl)
    .then(res => res.json())
    // .then(data => console.log(data.data))
    .then(data => showPhones(data.data))
}
searchBtn.addEventListener('click', searchTerm)

// display phones :
const showPhones = (phones) => {
    // console.log(phones)
    searchResult.textContent = "";
    displayDetails.textContent = "";
    phones.forEach(phone => {
        console.log(phone)
        const {phone_name, slug, image} = phone
        // console.log(slug);
        const phoneElm = document.createElement('div')
        phoneElm.classList.add('col')
        phoneElm.innerHTML = `
          <div  class="card h-100">
            <img src="${image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone_name}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <button class="btn btn-primary" onclick="phoneDetails('${slug}')">
            Launch
          </button>
            </div>
        </div>
        `
        searchResult.appendChild(phoneElm)
    })

}

const phoneDetails = phoneId =>{
    console.log(phoneId)
    const detailUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(detailUrl)
    .then(res => res.json())
    // .then(data => console.log(data.data))
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = detail =>{
    console.log(detail)
    displayDetails.textContent = "";
    const {image, name, releaseDate, mainFeatures, others} = detail
    // phoneDetails
    const detailsElm = document.createElement('div')
    detailsElm.classList.add('card')
    detailsElm.innerHTML = `

    
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h4 class="card-title">${name}</h4>
        <p class="card-text">Release Date: ${releaseDate}</p>
        <h5 class="card-title">Main Features:</h5>
        <p class="card-text">Storage: ${mainFeatures.storage}</p>
        <p class="card-text">Chip Set: ${mainFeatures.chipSet}</p>
        <p class="card-text">Display Size: ${mainFeatures.displaySize}</p>
        <h5 class="card-title">Others: </h5>
        <p class="card-text">NFC: '${others.NFC}'</p>
        <p class="card-text">Bluetooth: '${others.Bluetooth}'</p>
        <p class="card-text">USB: '${others.USB}'</p>
        </div>
        
    `
    displayDetails.appendChild(detailsElm)
}