// This module is for the search functions.

// Imports the data from the API
import { getData } from "../modules/api.js";

// Creates variables from the id elements
const searchInput = document.getElementById("search-field__input");
const searchSuggestions = document.getElementById("search-container__list");
const button = document.getElementById("search-field__button");

// Creating a variable for the error message when search input doesnt exist.
const errorMessage = document.querySelector(".search-container__error-message");

// Search function to get data from search input
const searchFunction = async () => {
  try {
    // Fetching data from the api
    const data = await getData();

    // Converting searcg unput to uppcase
    const search = searchInput.value.toUpperCase();

    // Filtering data based on search input
    const searchData = data.bodies.filter((body) =>
      body.name.toUpperCase().includes(search)
    );

    // Redirecting to info page if searched planet is found
    if (searchData.length > 0) {
      const planetName = searchData[0].name;
      const planetId = searchData[0].id;
      const url = `/pages/info.html?planet=${planetName}&number=${planetId}`;
      window.location.href = url;
      // Handling the error message if planet not found
    } else {
      errorMessage.innerHTML = "Hoppsan! Den planeten verkar ha gömt sig för oss. Testa en annan!";
    }
    // Handling errors if needed
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Search trigger for button click
button.addEventListener("click", searchFunction);

// Search trigger for ENTER key
document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    searchFunction();
  }
});

// When clicking on searh-field, open the searchSuggestions
searchInput.addEventListener("keydown", function suggestions() {
  searchSuggestions.style.visibility = "visible";
  searchInput.style.borderBottomLeftRadius = "0";
});

// If searchSuggestion is visable, click outside to close
document.addEventListener("click", function closeSuggestions(event) {
  const isClickInsideSearch = searchInput.contains(event.target);
  const isClickInsideSuggestions = searchSuggestions.contains(event.target);

  if (!isClickInsideSearch && !isClickInsideSuggestions) {
    searchSuggestions.style.visibility = "hidden";
    searchInput.style.borderBottomLeftRadius = "";
  }
});

// Filtering the planet list based on search input
searchInput.addEventListener("input", searchPlanetList);

// Function to filter the planet list bades on search input
function searchPlanetList() {
  let input, filter, ul, li, a, i, txtValue;
  input = searchInput;
  filter = input.value.toUpperCase();
  ul = searchSuggestions;
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Exports the search function and planet list to index.js and info.js
export { searchFunction, searchPlanetList };
