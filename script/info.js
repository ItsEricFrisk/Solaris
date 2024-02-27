// Imports the data from the API
import { getData } from "../modules/api.js";
// imports the search function and planet list
import { searchFunction, searchPlanetList } from "../modules/search.js";

const backBtn = document.getElementById("header__go-back");

backBtn.addEventListener("click", () => {
  window.location.href = "/pages/index.html"
})

// Get all the elements that will show information
let infoContainer = {
  planetName: document.getElementById("info__planet-name"),
  planetLatinName: document.getElementById("info__planet-latin-name"),
  description: document.getElementById("info__description"),
  distance: document.getElementById("distance__info"),
  temp: document.getElementById("temp__info"),
  circumference: document.getElementById("circumference__info"),
  rotation: document.getElementById("rotation__info"),
};

// Get the data from URL-parameters.
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let planetId = urlParams.get("number");

  const planetData = await getData();

  //Change the text content and show information about the planets
  infoContainer.planetName.textContent = planetData.bodies[planetId].name;
  infoContainer.planetLatinName.textContent =
    planetData.bodies[planetId].latinName;
  infoContainer.description.textContent = planetData.bodies[planetId].desc;
  infoContainer.distance.textContent = planetData.bodies[planetId].distance;
  infoContainer.temp.textContent = planetData.bodies[planetId].temp.day + "C";
  infoContainer.circumference.textContent =
    planetData.bodies[planetId].circumference + " KM";
  infoContainer.rotation.textContent = planetData.bodies[planetId].rotation;
});
