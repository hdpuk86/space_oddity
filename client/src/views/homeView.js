var PlanetView = require('./planetView');
var Popup = require('./popupView');
var PieCompView = require('./pieCompView');

function addListeners(planet){
  var circle = document.getElementById(`circle_${planet.name}`);
  var hoverDiv = document.getElementById(`hover_${planet.name}_div`);
  var nameDiv = document.getElementById(`${planet.name}_name_div`);
  circle.addEventListener('mouseover', function(){
    hoverDiv.style.visibility = "visible";
    nameDiv.style.visibility = "visible";
  });
  circle.addEventListener('mouseleave', function(){
    hoverDiv.style.visibility = 'hidden';
    nameDiv.style.visibility = 'hidden';
  });
  circle.addEventListener('click', () => {
    var popup = new Popup();

    var pieChart = new PieCompView(planet);
    console.log(pieChart);

    var newContent = planet.youtubeEmbed + planet.description + pieChart.innerHTML;
    popup.setContent(newContent);
    popup.display();
  });
};

var HomeView = function(planets) {
  var div = document.getElementById('planets-div');
  planets.forEach((planet) => {
    var planetDiv = new PlanetView(planet);
    div.appendChild(planetDiv);
    addListeners(planet);
  });
};

module.exports = HomeView;
