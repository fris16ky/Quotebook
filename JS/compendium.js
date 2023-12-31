// compendium.js

// Array of API discovery documents for different APIs
const DISCOVERY_DOCS = [
  "https://sheets.googleapis.com/$discovery/rest?version=v4",
];

// Authorization scopes required by the API
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

// Load the Google API client library
gapi.load("client", initClient);

// Function to initialize the Google API client
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      discoveryDocs: DISCOVERY_DOCS,
    })
    .then(function () {
      // Your client is initialized and ready to make API requests.
      console.log("Client initialized successfully");
    })
    .catch((error) => handleApiError(error, "Client Initialization"));
}

function getDataFromSheet() {
  return gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1", // Adjust the sheet name and range accordingly
    key: API_KEY,
  });
}

// Function to handle API errors
function handleApiError(error, context = "API Request") {
  console.error(`${context} Error:`, error);
  // Implement error handling logic, e.g., display an error message to the user
}

// Function to pull data and display it
async function PullData() {
  try {
    const response = await getDataFromSheet();
    const values = response.result.values;

    // Display the data in the quotesContainer
    displayData(values);
  } catch (error) {
    handleApiError(error);
  }
}

// Example: Display the data in a container
function displayData(values) {
  var quotesContainer = document.querySelector(".quotesContainer");
  quotesContainer.innerHTML = ""; // Clear previous content

  if (values && values.length > 0) {
    var table = document.createElement("table");

    for (var i = 0; i < values.length; i++) {
      var row = table.insertRow();
      for (var j = 0; j < values[i].length; j++) {
        var cell = row.insertCell();
        cell.textContent = values[i][j];
      }
    }

    quotesContainer.appendChild(table);
  } else {
    quotesContainer.textContent = "No quotes available.";
  }
}
