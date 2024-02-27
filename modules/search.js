// Imports the data from the API
import { getData } from "../modules/api.js";

// Creates variables from the id elements
const searchInput = document.getElementById("search-field__input");
const searchSuggestions = document.getElementById("search-container__list");
const button = document.getElementById("search-field__button");

// Search function to get data from search input
const searchFunction = async () => {
  try {
    const data = await getData();
    const search = searchInput.value.toUpperCase();
    const searchData = data.bodies.filter((body) =>
      body.name.toUpperCase().includes(search)
    );

    if (searchData.length > 0) {
      const planetName = searchData[0].name;
      const planetId = searchData[0].id;
      const url = `/pages/info.html?planet=${planetName}&number=${planetId}`;
      window.location.href = url;
    } else {
    // Search not found
    alert("ingen planet hittad");
    }
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

// Show suggestions when writing in the inputfield
searchInput.addEventListener("input", searchPlanetList);

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
