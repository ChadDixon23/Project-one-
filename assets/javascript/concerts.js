var concertsContainer = $("#concertsContainer");

var denverButton = $("#denver");
var newYorkButton = $("#newYork");
var chicagoButton = $("#chicago");
var baltimoreDCButton = $("#baltimoreDC");
var losAngelesButton = $("#losAngeles");
var miamiButton = $("#miami");
var dallasButton = $("#dallas");
var bostonButton = $("#boston");

// This will hold all the concerts data
var allConcerts = [];

$.ajax({
  type: "GET",
  url: "https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nJ&apikey=dyJlprt5GV4U77gi63lcD1hjTcNSPTsi",
  async: true,
  dataType: "json",
  success: function (json) {
    console.log(json);
    // Check if there are any events in the response
    if (
      json._embedded &&
      json._embedded.events &&
      json._embedded.events.length > 0
    ) {
      // loops through each event
      json._embedded.events.forEach(function (event) {
        var artistName = event.name;
        var concertDate = event.dates.start.localDate;
        var concertVenue = event._embedded.venues[0].name;
        var concertCity = event._embedded.venues[0].city.name;
        var concertState = event._embedded.venues[0].state.name;

        // store concert data in the allConcerts array
        allConcerts.push({
          artistName,
          concertDate,
          concertVenue,
          concertCity,
          concertState,
        });

        // display alll concerts initially
        displayArtistInfo(
          artistName,
          concertDate,
          concertVenue,
          concertCity,
          concertState
        );
      });
    } else {
      console.log("No events found.");
    }
  },
  error: function (xhr, status, err) {
    console.error("Error fetching data: " + err);
  },
});

newYorkButton.on("click", function () {
  filterConcerts("New York");
});

function displayArtistInfo(
  artistName,
  concertDate,
  concertVenue,
  concertCity,
  concertState
) {
  var artistNameElement = $("<h2></h2>");
  artistNameElement.text(artistName);

  var concertDateElement = $("<p></p>");
  concertDateElement.text(concertDate);

  var venueElement = $("<p></p>");
  venueElement.text(concertVenue);

  var cityElement = $("<p></p>");
  var stateElement = $("<p></p>");
  cityElement.text(concertCity + ", " + concertState);

  concertsContainer.append(artistNameElement);
  artistNameElement.append(concertDateElement);
  concertDateElement.append(venueElement);
  venueElement.append(cityElement);
  cityElement.append(stateElement);
}

// filter and display concerts based on the selected cities
function filterConcerts(city) {
  concertsContainer.empty(); // clear the container

  allConcerts.forEach(function (concert) {
    displayArtistInfo(
      concert.artistName,
      concert.concertDate,
      concert.concertVenue,
      concert.concertCity,
      concert.concertState
    );
  });
}
