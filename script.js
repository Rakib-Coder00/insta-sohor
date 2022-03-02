
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
    phones.forEach(phone => {
        console.log(phone)
        const {phone_name, slug, image} = phone
        // console.log(slug);
        const phoneElm = document.createElement('div')
        phoneElm.classList.add('col')
        phoneElm.innerHTML = `
          <div onclick="phoneDetails('${slug}')" class="card h-100">
            <img src="${image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${phone_name}</h5>
              <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
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
    const {image, name} = detail
    // phoneDetails
    const detailsElm = document.createElement('div')
    detailsElm.classList.add('card')
    detailsElm.innerHTML = `
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
    `
    displayDetails.appendChild(detailsElm)
}