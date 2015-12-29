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
$("#save").click(function() {
  var castleString = "";
  buildingMatrix.forEach(function(row,rIndex){
    row.forEach(function(square,sIndex){
      castleString += square;
    });
  });
  var username = $("#userName").val();

  var data = {username:username,castle:castleString};
  $.ajax({method:"post",url:"/",data:data});
  $.ajax({url:"/names",success:function(names){
    console.log("names is ",names);
  }});
});

  var containerW = Number(takeOutLastTwoLetters(containerW));
  var rotRightW = Number(takeOutLastTwoLetters(buttonRightRot));
  var rotLeftW = Number(takeOutLastTwoLetters(buttonLeftRot));
  var containerPos = 40;
  var center = 645;
  var spaceAway = 500;
  $("#container").css("left",containerPos + "px");
  $("#container").css("top",canvasH - 180);
  $("#rotateRight").css("left",center + spaceAway + "px");
  $("#rotateLeft").css("left",center - spaceAway  + "px");
  $(".rotate").css("top","650px");

})();
