// Imports the data from the API
import { getData } from "../modules/api.js";

// imports the search function and planet list
import { searchFunction, searchPlanetList } from "../modules/search.js";

// Creating clickable planets that sends user to the next page with the data of wich planet user clicked on
function clickOnPlanet() {
  // Selecting all elements with the class "hero-container__planet"
  const planets = document.querySelectorAll(".hero-container__planet");

  // Adding event listeners to the planets
  planets.forEach((planet) => {
    planet.addEventListener("click", () => {
      // Getting the planet name and id from dataset attributes in index.html
      const planetName = planet.dataset.planet;
      const planetId = planet.dataset.number;

      // Redirecting to the info page with name and id as param in the url
      window.location.href = `/pages/info.html?planet=${planetName}&number=${planetId}`;
    });
  });
}

// Calling on the function
clickOnPlanet();
