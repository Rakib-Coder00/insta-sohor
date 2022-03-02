
const main = document.getElementById('main')
const form = document.getElementById('form')
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const searchResult = document.getElementById('search-result')
const displayDetails = document.getElementById('phone-details')

const spinner = document.getElementById('spinner')
const err = document.getElementById('err')

// Search input field : 
const searchTerm = ()=> {
    const searchTxt = searchInput.value
    searchInput.value = ''
    spinner.style.display = 'block'
    if (searchTxt == '') {
      err.style.display= 'block'
      spinner.style.display = 'none'
    }
    else{
      const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${searchTxt}`
      fetch(searchUrl)
      .then(res => res.json())
      .then(data => showPhones(data.data.slice(0, 20)))
    }
}

searchBtn.addEventListener('click', searchTerm)




// display phones :
const showPhones = (phones) => {

  spinner.style.display = 'none'
  err.style.display= 'none'
    searchResult.textContent = "";
    displayDetails.textContent = "";
    if (phones.length == 0) {
      err.style.display= 'block'
    }
    else{
      phones.forEach(phone => {
        console.log(phone)
        const {phone_name, slug, image} = phone
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

}

const phoneDetails = phoneId =>{
    console.log(phoneId)
    const detailUrl = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(detailUrl)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = detail =>{
    displayDetails.textContent = "";
    const {image, name, releaseDate, mainFeatures, others} = detail
    console.log(others.Bluetooth);
    const detailsElm = document.createElement('div')
    detailsElm.classList.add('card')
    detailsElm.innerHTML = `

    
        <img src="${image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h4 class="card-title fw-bolder">${name}</h4>
        <p class="card-text"><span class="fw-bold">Release Date:</span> ${releaseDate}</p>
        <h5 class="card-title fw-bold">Main Features:</h5>
        <p class="card-text"><span class="fw-bold">Storage:</span> ${mainFeatures.storage}</p>
        <p class="card-text"><span class="fw-bold">Chip Set:</span> ${mainFeatures.chipSet}</p>
        <p class="card-text"><span class="fw-bold">Display Size:</span> ${mainFeatures.displaySize}</p>
        <h5 class="card-title fw-bold">Others: </h5>
        <p class="card-text"><span class="fw-bold">Bluetooth:</span> '${others.Bluetooth}'</p>
        <p class="card-text"><span class="fw-bold">NFC:</span> '${others.NFC}'</p>
        <p class="card-text"><span class="fw-bold">Radio:</span> '${others.Radio}'</p>
        <p class="card-text"><span class="fw-bold">USB:</span> '${others.USB}'</p>
        </div>
        
    `
    displayDetails.appendChild(detailsElm)
}