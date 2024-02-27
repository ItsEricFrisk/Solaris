// Imports the data from the API
import { getData } from "../modules/api.js";
// imports the search function and planet list
import { searchFunction, searchPlanetList } from "../modules/search.js";

// Creating clickable planets that sends user to the next page with the data of wich planet user clicked on
function clickOnPlanet() {
  const planets = document.querySelectorAll(".hero-container__planet");

  planets.forEach((planet) => {
    planet.addEventListener("click", () => {
      const planetName = planet.dataset.planet;
      const planetId = planet.dataset.number;
      window.location.href = `/pages/info.html?planet=${planetName}&number=${planetId}`;
    });
  });
}

clickOnPlanet();

export { clickOnPlanet };