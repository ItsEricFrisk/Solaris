const keyUrl = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";
const dataUrl =
  "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
let key;

// Getting the API key
async function getKey() {
  try {
    const response = await fetch(keyUrl, {
      method: "POST",
      headers: {'x-zocom': key },
    });
    const data = await response.json();
    key = data.key;
    return key;
  } catch (error) {
    console.error("Error fetching key: ", error);
  }
}

// API data
async function getData() {
  try {
    await getKey();
    let response = await fetch(dataUrl, {
      method: "GET",
      headers: { "x-zocom": key },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

//Exports the data from the api to index.js and info.js
export { getData };
