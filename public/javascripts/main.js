var usedBlocks = 0;
var initialBlock = 100;
var blocksLeft = null;;
var pObjA = [];
var buildingMatrix = [];
var mDepth = 5; //rows
var mWidth = 3;  //collumns
var width = 50;
var length = 20;
var height = 50;
var leftest = 0;
var rightest = mWidth * width;
var avgY = (leftest + rightest) / 2;
var frontest = 0;
var depthest = mDepth * length;
var avgZ = (frontest + depthest) / 2;

for(var i = 0; i < mDepth; i++)
{
  buildingMatrix.push([]);

  for(var j = 0; j < mWidth; j++)
  {
    buildingMatrix[i].push(1);
  }
}
var D = 500;
var origin = {x:0,y:-360,z:40};
var axisRot = {x:avgZ,y:avgY,z:0};
var thetaView = 0;
var PI = Math.PI;
var canvas = document.getElementById("c");
var context = canvas.getContext("2d");

function matrixReader()
{
  pObjA.length = 0;
  buildingMatrix.forEach(function(nextMatrix,m)
  {
    nextMatrix.forEach(function(value,n)
    {
      builder(m,n,nextMatrix[n])
      usedBlocks += nextMatrix[n];
      blocksLeft = initialBlock - usedBlocks;
    });
  });
}

function builder(xInt,yInt,zInt)
{ //this is called for x,y square
  var zDisplace = 500;
  for(var i = 0; i < zInt; i++)
  { //goes for how many vertical squares in this x,y square
    var zLoopDisplace = -1 * (i + 1) * height;

    if ((xInt === 0) && (yInt !== 0)) //front not left
    {
      if (i === zInt -1) //top block
      {
        if (yInt === 0)
        {
            pObjA.push(frontLeftTopMaker(width,length,height));  //Top left
        }
        else if (i + 1 === buildingMatrix[xInt][yInt-1])
        {
          pObjA.push(frontTopMaker(width,length,height)); // Top, but not most left. Checking if right is same height.
        }
        else if(i + 1 > buildingMatrix[xInt][yInt-1])
        {
          pObjA.push(frontLeftTopMaker(width,length,height));  //Different heights than the block to the right
        }
        else
        {
          pObjA.push(leftMaker(width,length,height));
        }
      }
      else
      {
        pObjA.push(cuboidMaker(width,length,height));   //not top  block
      }
    }
    else if (yInt === 0 && (xInt!=0))
    {
      pObjA.push(leftMaker(width,length,height));//pObjA.push(leftMaker(width,length,height));  //left
    }
    else if((yInt === 0)&&(xInt === 0))
    {
      if (i === zInt -1) //top block
      {
        pObjA.push(frontLeftTopMaker(width,length,height));
      }
      else
      {
        pObjA.push(frontLeftMaker(width,length,height));
      }
    }
    else
    {
      pObjA.push(cuboidMaker(width,length,height));
    }

    var lastEntry = pObjA.length -1;
    pObjA[lastEntry].forEach(function(pLine,m)
    {
      for(var n = 0;n < pLine.length;n++)
      {
        var xDisplace = length * xInt + 0;
        var yDisplace = width * yInt;
        var point = pLine[n];

        point.x += xDisplace;
        point.y += yDisplace;
        point.z += zDisplace + zLoopDisplace;
      }
    });
  }
}

function createMatrix()
{
  var numRows = mDepth;  // determines numbers of rows
  var numCols = mWidth; //number of collumns.

  for(var i = 0; i < numRows; i++)
  {
    var tbody = $('<div>');
    for(var j = 0; j < numCols; j++)
    {
      var $input = $('<input type="number" data-i=' + i +' data-j=' + j +'> ');
      tbody.append($input);
    }
    $('#wrapper').append(tbody);
  }

  //event handler that is acted when user changes a number
  $('#wrapper input').keyup(function(){

    var i = $(this).data('i');
    var j = $(this).data('j');

    buildingMatrix[i][j] = parseInt($(this).val());
    matrixReader();
    draw(pObjA);
  });
}

function cuboidMaker(width,length,height)
{
  var face1 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  var face2 = [{x:0,y:width,z:0},{x:length,y:width,z:0},{x:length,y:width,z:height},{x:0,y:width,z:height},{x:0,y:width,z:0}];
  var face3 = [{x:length,y:0,z:0},{x:length,y:width,z:0},{x:length,y:width,z:height},{x:length,y:0,z:height},{x:length,y:0,z:0}];
  var face4 = [{x:length,y:0,z:0},{x:length,y:width,z:0},{x:0,y:width,z:0},{x:0,y:0,z:0},{x:length,y:0,z:0}];
  var face5 = [{x:length,y:0,z:height},{x:length,y:width,z:height},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:length,y:0,z:height}];
  var face6 = [{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];

  //return[face1,face2,face3,face4,face5,face6];
  return [face1];
}

function leftMaker(width,length,height)
{
  var face1 = [{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  return [face1];
}

function frontLeftMaker(width,length,height)
{
  var face1 = [{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  var face2 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  return [face1,face2];
}

function frontLeftTopMaker(width,length,height)
{
  var face1 = [{x:0,y:0,z:0},{x:length,y:0,z:0},{x:length,y:0,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  var face2 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  var face3 = [{x:length,y:0,z:0},{x:length,y:width,z:0},{x:0,y:width,z:0}];
  return [face1,face2,face3];
}

function frontTopMaker(width,length,height)
{
  var face1 = [{x:0,y:0,z:0},{x:0,y:width,z:0},{x:0,y:width,z:height},{x:0,y:0,z:height},{x:0,y:0,z:0}];
  var face2 = [{x:length,y:0,z:0},{x:length,y:width,z:0},{x:0,y:width,z:0}];
  return [face1,face2];
}

function combiner (object1,object2)
{
  return object1.concat(object2);
}

function draw (pA)
{
  context.clearRect(0, 0, canvas.width, canvas.height);

  pA.forEach(function(pObject,l){
    pObject.forEach(function(pLine,m){
      for(var n = 0;n<pLine.length-1;n++)
      {
        var pPoint = pLine[n];
        var pPoint1 =  pLine[n + 1];

        var x3d = pPoint.x;
        var y3d = pPoint.y;
        var z3d = pPoint.z;

        var x3d0 = pPoint1.x;
        var y3d0 = pPoint1.y;
        var z3d0 = pPoint1.z;

        var x3d1 = ((x3d - axisRot.x) * Math.cos(thetaView) - (y3d - axisRot.y) * Math.sin(thetaView)) + axisRot.x;
        var y3d1 = ((y3d - axisRot.y) * Math.cos(thetaView) + (x3d - axisRot.x) * Math.sin(thetaView)) + axisRot.y;

        var x3d2 = ((x3d0 - axisRot.x) * Math.cos(thetaView) - (y3d0 - axisRot.y) * Math.sin(thetaView)) + axisRot.x;
        var y3d2 = ((y3d0 - axisRot.y) * Math.cos(thetaView) + (x3d0 - axisRot.x) * Math.sin(thetaView)) + axisRot.y;
        var gy = (y3d1 - origin.y) * D / (x3d1 - origin.x + D);
        var gz = (z3d - origin.z) * D / (x3d1 - origin.x + D);
        var g1y = (y3d2 - origin.y) * D / (x3d2 - origin.x + D);
        var g1z = (z3d0 - origin.z) * D / (x3d2 - origin.x + D);

        context.beginPath();
        context.moveTo(gy, gz);
        context.lineTo(g1y, g1z);
        context.lineWidth = .3;
        context.closePath();
        context.stroke();
      }
    });
  });
}
function displacer (qObjA,d1,d2,d3)
{
  qObjA.forEach(function(qObject)
  {
    qObject.forEach(function(qLine)
    {
      qLine.forEach(function(qPoint)
      {
        qPoint.x += d1;
        qPoint.y += d2;
        qPoint.z += d3;
      });
    });
  });

  console.log("get displaced");
  return qObjA;
}

createMatrix();
matrixReader();
draw(pObjA);
console.log("Blocks used: ",usedBlocks," Blocks left: ",blocksLeft);
