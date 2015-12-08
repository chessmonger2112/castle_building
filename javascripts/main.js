var usedBlocks = 0;
var initialBlock = 100;
var blocksLeft = null;;
var pObjA = [];
var buildingMatrix = [];
var mHeight = 5; //rows
var mWidth = 3;  //collumns

for(var i = 0; i < mHeight; i++)
{
  buildingMatrix.push([]);

  for(var j = 0; j < mWidth; j++)
  {
    buildingMatrix[i].push([1]);
  }
}
var D = 500;
var origin = {x:0,y:-180,z:40};

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
{
  var zDisplace = 500;
  for(var i = 0; i < zInt; i++)
  {
    var width = 50;
    var length = 20;
    var height = 50;
    var zLoopDisplace = -1 * (i + 1) * height;
    var yDisplaceTest = 200;

    if ((xInt === 0) && (yInt !== 0)) //front not left
    {
      if (i === zInt -1) //top block
      {
        if (yInt === 0)
        {
            pObjA.push(frontLeftTopMaker(width,length,height))  //Top left
        }
        else if (i + 1 === buildingMatrix[xInt][yInt-1])
        {
          pObjA.push(frontTopMaker(width,length,height)) // Top, but not most left. Checking if right is same height.
        }
        else if(i + 1 > buildingMatrix[xInt][yInt-1])
        {
          pObjA.push(frontLeftTopMaker(width,length,height))  //Different heights than the block to the right
        }
        else
        {
          pObjA.push(leftMaker(width,length,height))
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
        pObjA.push(frontLeftTopMaker(width,length,height))
      }
      else
      {
        pObjA.push(frontLeftMaker(width,length,height))
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
        point.y += yDisplace + yDisplaceTest;
        point.z += zDisplace + zLoopDisplace;
      }
    });
  }
}

function createMatrix()
{
  var numRows = mHeight;  // determines numbers of rows
  var numCols = mWidth; //number of collumns.
  var tbody = $('<div>');

  for(var i = 0; i < numRows; i++)
  {
    for(var j = 0; j < numCols; j++)
    {
      var $input = $('<input type="number" data-i=' + i +' data-j=' + j +'> ');
      tbody.append($input);
    }
  }
  $('#wrapper').html(tbody);


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

        var gy = (pPoint.y - origin.y) * D / (pPoint.x - origin.x + D);
        var gz = (pPoint.z - origin.z) * D / (pPoint.x - origin.x + D);
        var g1y = (pPoint1.y - origin.y) * D / (pPoint1.x - origin.x + D);
        var g1z = (pPoint1.z - origin.z) * D / (pPoint1.x - origin.x + D);

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
