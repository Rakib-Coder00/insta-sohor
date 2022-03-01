
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchBtn = document.getElementById('searchBtn')

// Search input field : 
const searchTerm = ()=> {
    const searchTxt = search.value
    console.log(searchTxt);
    search.value = ''
    
    const searchUrl = `https://openapi.programming-hero.com/api/phones?search=${searchTxt}`
    fetch(searchUrl)
    .then(res => res.json())
    .then(data => showPhones(data.data))
    console.log(searchUrl);
}
searchBtn.addEventListener('click', searchTerm)

// display phones :
const showPhones = (phones) => {
    phones.forEach(phone => {
        const {brand, phone_name, slug, image} = phone
        // console.log(brand, phone_name, slug);
        const phoneElm = document.createElement('div')
        phoneElm.classList.add('card')
        phoneElm.innerHTML = `
        <img src="${image}" class="card-img-top" alt="${brand}">
            <div class="card-body">
              <h5 class="card-title">${phone_name}</h5>
              <p class="card-text">${slug}</p>
            </div>
        `
        main.appendChild(phoneElm)
    })

}