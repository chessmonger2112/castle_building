(function()
{
  var containerW = $("#container").css("width");
  var canvasH =$("canvas")[0].height;
  var canvasW = $("canvas")[0].width;
  var buttonRightRot = $("#rotateRight").css("width");
  var buttonLeftRot = $("#rotateLeft").css("width");

  function takeOutLastTwoLetters(word)
  {
    var number = "";
    for(var i = 0; i < word.length-2;i++)
    {
      var letter = word[i];
      number += letter;
    }
    return number
  }
$(".settings").click(function(){
  if (login)
  {
    $("#saveSettings").show();
  }
});
$("#michaelBay").click(function(){
  michaelBay = !michaelBay;
});
$("#rotateLeft").click(function() {
  thetaView += PI / 128;
});
$("#rotateRight").click(function() {
  thetaView -= PI / 128;
});
$("#moveLeft").click(function() {
  origin.y += 11;
});
$("#moveRight").click(function() {
  origin.y += -11;
});
$("#moveUp").click(function() {
  origin.z += 12;
});
$("#moveDown").click(function() {
  origin.z += -12;
});
$("#zoomIn").click(function() {
  origin.x += 13;
});
$("#zoomOut").click(function() {
  origin.x += -13;
});
$("button").click(function() {
  draw(pObjA);
});
$("#saveCastle").click(function() {
  var castleString = "";
  buildingMatrix.forEach(function(row,rIndex){
    row.forEach(function(square,sIndex){
      castleString += square;
    });
  });
  var data = {userName:userName,castle:castleString};
  $.ajax({method:"post",url:"/",data:data});
});
$("#saveSettings").click(function() {
  var data = {userName:userName,settings: origin, thetaView: thetaView};
  $("#saveSettings").hide();
  $.ajax({method:"post",url:"/saveSettings",data:data});
});


$(".load").click(function(){
  $(this).hide()
});




$("#loadCastle").click(function() {
  // $(this).hide();
  console.log("Loading time ");
  $.ajax({
    url: "/castleInfo",
    method:"post",
    data: {userName: userName},
    success: function(castle){
      console.log("castle is ",castle);
      turnStringToArray(castle);
    }
  });
});

$("#loadSettings").click(function(){
  // $(this).hide();
  $.ajax({url:"/loadSettings",
    method: "post",
    data: {userName,userName},
    success: function(setting){
      var sets = setting[0].settings;
      origin.x = Number(sets.x);
      origin.y = Number(sets.y);
      origin.z = Number(sets.z);
      thetaView = sets.thetaView;
      draw(pObjA);
    }
  });
});

$("#login").click(function(){
  userName = $("#userName").val();
  login = true;
  if (userName)
  {
    $("#login").css("visibility","hidden");
    $("#userName").css("visibility","hidden");
    $("#save").show();
    if(thetaView !=0 || origin.x != 0 || origin.y != -360 || origin.z != 40)
    {
      $("#saveSettings").show();
    }

    $.ajax({
      url:"/names",
      data:{userName:userName},
      method:"post",
      success:function(names){
    if(names.length)
    {
      console.log("Welcome back ",names[0].userName);

      if (names[0].castle)
      {
          $("#loadCastle").show();
      }
      if (names[0].settings)
      {
        $("#loadSettings").show();
      }
    }
    else
    {
      console.log("New username added!");
    }
  }});
  }
});

var containerW = Number(takeOutLastTwoLetters(containerW));
var rotRightW = Number(takeOutLastTwoLetters(buttonRightRot));
var rotLeftW = Number(takeOutLastTwoLetters(buttonLeftRot));
var containerPos = 40;
var center = 645;
var spaceAway = 500;
$("#container").css("left",containerPos + "px");
$("#container").css("top",canvasH - 174);
$("#rotateRight").css("left",center + spaceAway + "px");
$("#rotateLeft").css("left",center - spaceAway  + "px");
$(".rotate").css("top","650px");

})();
function turnStringToArray(string)
{
  var array = []
  var temp = []

  for (var n = 0; n < string.length; n ++)
  {
    if (n % 3 === 0 && n > 0)
    {
      array.push(temp);
      temp = [];
    }
    var char = string[n];
    temp.push(Number(char));
  }
  array.push(temp);
  console.log("array is ",array);
  buildingMatrix = array;
  matrixReader();
  draw(pObjA);
}
