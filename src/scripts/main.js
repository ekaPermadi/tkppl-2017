// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke'),
  cube = require('bespoke-theme-cube'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  backdrop = require('bespoke-backdrop'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  progress = require('bespoke-progress'),
  forms = require('bespoke-forms');

// Bespoke.js
bespoke.from('article', [
  cube(),
  keys(),
  touch(),
  bullets('li, .bullet'),
  backdrop(),
  scale(),
  hash(),
  progress(),
  forms()
]);


// Prism syntax highlighting
// This is actually loaded from "bower_components" thanks to
// debowerify: https://github.com/eugeneware/debowerify

require('prism');

var player = {
  player1: {user:"", cost:1000, one:"", two:"", three:"", four:"", five:"", last:""}, 
  player2: {user:"", cost:1000, one:"", two:"", three:"", four:"", five:"", last:""}, 
  player3: {user:"", cost:1000, one:"", two:"", three:"", four:"", five:"", last:""}, 
  player4: {user:"", cost:1000, one:"", two:"", three:"", four:"", five:"", last:""}
};

var statistic = setGameStage();
var productTitle = ["Crocodile", "Louis Vuitton", "Lamborghini Veneno", "Bugatti Veyron Super Sport", "iPhone 5 Black Diamond", "Samsung GT-E2120", "Indomie Rasa Jagung Bakar", "Supermie Panggang Kuah Goreng", "Google", "Bing"]
function setGameStage() {
  var statistic = {
    stage1: {
      x: [0, 2.5, 1.5, 1, -2.5],
      y: [0, 2, 1.75, 1, -0.5],
      cost: {
        x: generateCost(3,8),
        y: generateCost(3,8)
      },
      played: false
    },
    stage2: {
      x: [0, 2.4, 1.9, 1.3, -0.8],
      y: [0, -0.6, 1.2, 1.7, -2],
      cost: {
        x: generateCost(3,8),
        y: generateCost(3,8)
      },
      played: false
    },
    stage3: {
      x: [3.75, 2.9, 3.7, -1.85, 3.5],
      y: [-0.25, -0.5, -1.5, 2.8, 4],
      cost: {
        x: generateCost(3,8),
        y: generateCost(3,8)
      },
      played: false
    },
    stage4: {
      x: [1.8, 1.3, 0.3, 0.5, 3],
      y: [-0.2, 3, 0.8, 2.25, 2.5],
      cost: {
        x: generateCost(3,8),
        y: generateCost(3,8)
      },
      played: false
    },
    stage5: {
      x: [0, -1.5, 2.5, -0.7, 1.5],
      y: [0, -0.7, 2.5, -0.5, 1.5],
      cost: {
        x: generateCost(3,8),
        y: generateCost(3,8)
      },
      played: false
    }
  }
  return statistic;
}

var j = 0;
for(var i = 0; i < 5; i++) {
  var currentStage = "stage" + (i+1);
  var arr = statistic[currentStage];
  j = setCostValue(i, j, arr);
  var looping = "#looping" + (i+1);
  setTableValue(looping);
}
for(var i = 1; i <= 10; i++) {
  $("#title" + i).text(productTitle[i-1]);
  $("#text" + i).text(productTitle[i-1]);
  $("#product"+i).text(productTitle[i-1]);
  var left = "#left" + i;
}

function setCostValue(i, j, arr) {
  j++;
  var id = "#Cost" + j;
  $(id).text(arr["cost"]["x"]);
  j++;
  id = "#Cost" + j;
  $(id).text(arr["cost"]["y"]);
  return j;
}

function setTableValue(looping) {
  for(var j = 0; j < 5; j++) {
    var x = Math.round(arr["cost"]["x"] * arr["x"][j]);
    var y = Math.round(arr["cost"]["y"] * arr["y"][j]);
    var idx = looping + " > #x"+j;
    var idy = looping + " > #y"+j;
    var clsx = setColor(x, arr["cost"]["x"]);
    var clsy = setColor(y, arr["cost"]["y"]);
    $(idx).addClass(clsx);
    $(idy).addClass(clsy);
    $(idx).text(x);
    $(idy).text(y);
  }
}

function setColor(value, cost) {
  if(value < cost) {
    return "danger";
  } else if(value == cost) {
    return "info";
  }
  return "success";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCost(start, end) {
    return getRandomInt(start,end) * 50
}

function stages(index, arr) {
  var a = 0;
  var b = 0;
  for(var i = 1; i < 5; i++) {
    var p = "player" + i;
    var v = "#v" + index + "" + i;
    player[p][i] = $(v).val().toUpperCase();
    $("#opt" + index + "" + i).text(player[p][i]);
    $("#moneya" + index + "" + i).text(player[p]["cost"]);
    $("#moneya" + index + "" + i).addClass(setColor(player[p]["cost"],0));
    if(player[p][i] == 'A') {
      player[p]["cost"] -= arr["cost"]["x"]; 
      a++;
    } else {
      player[p]["cost"] -= arr["cost"]["y"];
      b++;
    }
  }
  var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
  var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
  for(var i = 1; i < 5; i++) {
    var p = "player" + i;
    if(player[p][i] == 'A') {
      player[p]["cost"] += resA;
    } else {
      player[p]["cost"] += resB;
    }
    $("#moneyb" + index + "" + i).text(player[p]["cost"]);
    $("#moneyb" + index + "" + i).addClass(setColor(player[p]["cost"],0));
  }
  $("#pricea"+ index).text(arr["cost"]["x"]);
  $("#priceb" + index).text(arr["cost"]["y"]);
  $("#count" + index + "1").text(a);
  $("#count" + index + "2").text(b);
  $("#stg" + index + "1").text(resA);
  $("#stg" + index + "2").text(resB);
  $("#stg" + index + "1").addClass(setColor(resA, arr["cost"]["x"]));
  $("#stg" + index + "2").addClass(setColor(resB, arr["cost"]["y"]));
  arr["played"] = true;
}

$("#Register").click(function() {
  for(var i = 0; i < 4; i++) {
    var p = "player" + (i+1);
    var v = "#p" + (i+1);
    player[p]["user"] = $(v).val();
    player[p]["cost"] = 1000;
  }
  var bool = false
  for(var i = 0; i < 4; i++) {
    var p = "player" + (i+1);
    if(player[p]["user"] == "") {
      $("#playGames").text("Player tidak cukup");
      bool = true;2
      break;      
    }
  }
  if(!bool) {
    $("#playGames").text("Saatnya Bermain !!");
  }
});

for(var i = 1; i < 5; i++) {
  var submit = "#submit" + i;
  var l = "#top" + i;
  $(submit).click(function() {
    var a = 0;
    var b = 0;
    for(var i = 0; i < 4; i++) {
      var p = "player" + (i+1);
      var v = "#va" + (i+1);
      player[p]["one"] = $(v).val();
      $(top + " > " + p).text(player[p]["one"]);
      if( $(v).val() == "A" ) {
        a++;
      } else {
        b++;
      }
    }
  })
}

$("#submit1").click(function() {
  var arr = statistic["stage1"];
  if(!arr["played"]) {
    stages(1, arr);
  }
})

$("#submit2").click(function() {
  var arr = statistic["stage2"];
  if(!arr["played"]) {
    stages(2, arr);
  }
})

$("#submit3").click(function() {
  var arr = statistic["stage3"];
  if(!arr["played"]) {
    stages(3, arr);
  }
})

$("#submit4").click(function() {
  var arr = statistic["stage4"];
  if(!arr["played"]) {
    stages(4, arr);
  }
})

$("#submit5").click(function() {
  var arr = statistic["stage5"];
  if(!arr["played"]) {
    stages(5, arr);
  }
})

$(document).keypress(function(e) {
  var winner = "";
    switch(e.which)
    {
      case 49:
        winner = player["player1"]["user"];
        break;
      case 50:
        winner = player["player2"]["user"];
        break;
      case 51:
        winner = player["player3"]["user"];
        break;
      case 52:
        winner = player["player4"]["user"];
        break;
      default:
        break;
    }
  $("#winner").text(winner);
});

$("#read").click(function() {
  var urutan = [0,1,2,3,4];
  for(var i = 1; i < 5; i++) {
    var x = player["player"+i]["cost"];
    for(var j = i; j < 5; j++) {
      var y = player["player"+j]["cost"];
      if(x < y) {
        var temp = urutan[i];
        urutan[i] = urutan[j];
        urutan[j] = temp;
      }
    }
    alert(urutan[i]);
    if(urutan[i] == 1) {
      $("#st").text("1st " + player["player"+i]["user"]);
    } else if(urutan[i] == 2) {
      $("#nd").text("2nd " + player["player"+i]["user"]);
    } else if(urutan[i] == 3) {
      $("#rd").text("3rd " + player["player"+i]["user"]);
    } else if(urutan[i] == 4){
      $("#th").text("4th " + player["player"+i]["user"]);
    }
  }
})

/*
$("#submit1").click(function() {
  var arr = statistic["stage1"];
  if(!arr["played"]) {
    var a = 0;
    var b = 0;  
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      var v = "#v1" + i;
      player[p][i] = $(v).val().toUpperCase();
      $("#opt1" + i).text(player[p][i]);
      $("#moneya1"+i).text(player[p]["cost"]);
      $("#moneya1"+i).addClass(setColor(player[p]["cost"],0));
      if(player[p][i] == 'A') {
        player[p]["cost"] -= arr["cost"]["x"]; 
        a++;
      } else {
        player[p]["cost"] -= arr["cost"]["y"];
        b++;
      }
    }
    var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
    var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      if(player[p][i] == 'A') {
        player[p]["cost"] += resA;
      } else {
        player[p]["cost"] += resB;
      }
      $("#moneyb1"+i).text(player[p]["cost"]);
      $("#moneyb1"+i).addClass(setColor(player[p]["cost"],0));
    }
    $("#pricea1").text(arr["cost"]["x"]);
    $("#priceb1").text(arr["cost"]["y"]);
    $("#count11").text(a);
    $("#count12").text(b);
    $("#stg11").text(resA);
    $("#stg12").text(resB);
    $("#stg11").addClass(setColor(resA, arr["cost"]["x"]));
    $("#stg12").addClass(setColor(resB, arr["cost"]["y"]));
  }
})

$("#submit2").click(function() {
  var arr = statistic["stage2"];
  if(!arr["played"]) {
    var a = 0;
    var b = 0;
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      var v = "#v2" + i;
      player[p][i] = $(v).val().toUpperCase();
      $("#opt2" + i).text(player[p][i]);
      $("#moneya2"+i).text(player[p]["cost"]);
      $("#moneya2"+i).addClass(setColor(player[p]["cost"],0));
      if(player[p][i] == 'A') {
        player[p]["cost"] -= arr["cost"]["x"]; 
        a++;
      } else {
        player[p]["cost"] -= arr["cost"]["y"];
        b++;
      }
    }
    var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
    var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      if(player[p][i] == 'A') {
        player[p]["cost"] += resA;
      } else {
        player[p]["cost"] += resB;
      }
      $("#moneyb2"+i).text(player[p]["cost"]);
      $("#moneyb2"+i).addClass(setColor(player[p]["cost"],0));
    }
    $("#pricea2").text(arr["cost"]["x"]);
    $("#priceb2").text(arr["cost"]["y"]);
    $("#count21").text(a);
    $("#count22").text(b);
    $("#stg21").text(resA);
    $("#stg22").text(resB);
    $("#stg21").addClass(setColor(resA, arr["cost"]["x"]));
    $("#stg22").addClass(setColor(resB, arr["cost"]["y"]));
  }
})

$("#submit3").click(function() {
  var arr = statistic["stage3"];
  if(!arr["played"]) {
    var a = 0;
    var b = 0;
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      var v = "#v3" + i;
      player[p][i] = $(v).val().toUpperCase();
      $("#opt3" + i).text(player[p][i]);
      $("#moneya3"+i).text(player[p]["cost"]);
      $("#moneya3"+i).addClass(setColor(player[p]["cost"],0));
      if(player[p][i] == 'A') {
        player[p]["cost"] -= arr["cost"]["x"]; 
        a++;
      } else {
        player[p]["cost"] -= arr["cost"]["y"];
        b++;
      }
    }
    var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
    var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      if(player[p][i] == 'A') {
        player[p]["cost"] += resA;
      } else {
        player[p]["cost"] += resB;
      }
      $("#moneyb3"+i).text(player[p]["cost"]);
      $("#moneyb3"+i).addClass(setColor(player[p]["cost"],0));
    }
    $("#pricea3").text(arr["cost"]["x"]);
    $("#priceb3").text(arr["cost"]["y"]);
    $("#count31").text(a);
    $("#count32").text(b);
    $("#stg31").text(resA);
    $("#stg32").text(resB);
    $("#stg31").addClass(setColor(resA, arr["cost"]["x"]));
    $("#stg32").addClass(setColor(resB, arr["cost"]["y"]));
  }
})

$("#submit4").click(function() {
  var arr = statistic["stage4"];
  if(!arr["played"]) {
    var a = 0;
    var b = 0;
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      var v = "#v4" + i;
      player[p][i] = $(v).val().toUpperCase();
      $("#opt4" + i).text(player[p][i]);
      $("#moneya4"+i).text(player[p]["cost"]);
      $("#moneya4"+i).addClass(setColor(player[p]["cost"],0));
      if(player[p][i] == 'A') {
        player[p]["cost"] -= arr["cost"]["x"]; 
        a++;
      } else {
        player[p]["cost"] -= arr["cost"]["y"];
        b++;
      }
    }
    var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
    var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      if(player[p][i] == 'A') {
        player[p]["cost"] += resA;
      } else {
        player[p]["cost"] += resB;
      }
      $("#moneyb4"+i).text(player[p]["cost"]);
      $("#moneyb4"+i).addClass(setColor(player[p]["cost"],0));
    }
    $("#pricea4").text(arr["cost"]["x"]);
    $("#priceb4").text(arr["cost"]["y"]);
    $("#count41").text(a);
    $("#count42").text(b);
    $("#stg41").text(resA);
    $("#stg42").text(resB);
    $("#stg41").addClass(setColor(resA, arr["cost"]["x"]));
    $("#stg42").addClass(setColor(resB, arr["cost"]["y"]));
  }
})

$("#submit5").click(function() {
  var arr = statistic["stage5"];
  if(!arr["played"]) {
    var a = 0;
    var b = 0;
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      var v = "#v5" + i;
      player[p][i] = $(v).val().toUpperCase();
      $("#opt5" + i).text(player[p][i]);
      $("#moneya5"+i).text(player[p]["cost"]);
      $("#moneya5"+i).addClass(setColor(player[p]["cost"],0));
      if(player[p][i] == 'A') {
        player[p]["cost"] -= arr["cost"]["x"]; 
        a++;
      } else {
        player[p]["cost"] -= arr["cost"]["y"];
        b++;
      }
    }
    var resA = Math.round(arr["cost"]["x"] * arr["x"][a]);
    var resB = Math.round(arr["cost"]["y"] * arr["y"][b]);
    for(var i = 1; i < 5; i++) {
      var p = "player" + i;
      if(player[p][i] == 'A') {
        player[p]["cost"] += resA;
      } else {
        player[p]["cost"] += resB;
      }
      $("#moneyb5"+i).text(player[p]["cost"]);
      $("#moneyb5"+i).addClass(setColor(player[p]["cost"],0));
    }
    $("#pricea5").text(arr["cost"]["x"]);
    $("#priceb5").text(arr["cost"]["y"]);
    $("#count51").text(a);
    $("#count52").text(b);
    $("#stg51").text(resA);
    $("#stg52").text(resB);
    $("#stg51").addClass(setColor(resA, arr["cost"]["x"]));
    $("#stg52").addClass(setColor(resB, arr["cost"]["y"]));
  }
})
*/