//  Url to fetch the API key
const keyUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";

// URL to fetch the data from the API
const dataUrl =
  "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";

// The variable to store the API key
let key;

// Getting the API key
async function getKey() {
  try {
    // Fetching the API key with POST
    const response = await fetch(keyUrl, {
      method: "POST",
      headers: { "x-zocom": key },
    });

    // Parsing the response as JSON
    const data = await response.json();

    // Storing the obtained key
    key = data.key;

    // Returning the key
    return key;

    // Handling error if needed
  } catch (error) {
    console.error("Error fetching key: ", error);
  }
}

// API data
async function getData() {
  try {
    // Fetching the API key before fetching data
    await getKey();

    // Fetching data using the API key
    let response = await fetch(dataUrl, {
      method: "GET",
      headers: { "x-zocom": key },
    });

    // Parsing the response as JSON
    const data = await response.json();

    // Returning data
    return data;

    // Handling error if needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

//Exports the data from the api to index.js and info.js
export { getData };
