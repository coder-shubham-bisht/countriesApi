const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData;
let filteredCountries;
let regionCountries;
fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {

if(filterByRegion.value=='all'){
  regionCountries=allCountriesData;
  if(searchInput.value.trim()==""){
    filteredCountries=regionCountries;
    renderCountries(filteredCountries)
    return
  }
   filteredCountries = regionCountries.filter((country) => country.name.common.toLowerCase().includes(searchInput.value.toLowerCase().trim()))
  renderCountries(filteredCountries)
  return
}


regionCountries = allCountriesData.filter((country) => country.region.toLowerCase().includes(filterByRegion.value.toLowerCase()))

if(searchInput.value.trim()==""){
  filteredCountries=regionCountries;
  renderCountries(filteredCountries)
  return
}
 filteredCountries = regionCountries.filter((country) => country.name.common.toLowerCase().includes(searchInput.value.toLowerCase().trim()))
renderCountries(filteredCountries)


})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  if(data.length<1){
   
    countriesContainer.innerHTML = `<h2> No Country Found </h2>`
    return
  }
  data.forEach((country) => {
    const countryCard = document.createElement('a')
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common} flag" />
          <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                'en-IN'
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>
  `
    countriesContainer.append(countryCard)
  })
}


searchInput.addEventListener('input',  (e) => {
  if(searchInput.value.trim()==""){
    filteredCountries=regionCountries;
    renderCountries(filteredCountries)
    return
  }
   filteredCountries = regionCountries.filter((country) => country.name.common.toLowerCase().includes(searchInput.value.toLowerCase().trim()))
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})
