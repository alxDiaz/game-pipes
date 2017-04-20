var _timeOff = false;
var interTime = 300;
function Game(options){
  this.rows = options.rows;
  this.pointsEarned = 0;
  this.columns = options.columns;
  this.tap = undefined;
  this.pipesPlaced = [];
  this.pipesChecked = [];
  this.wrongPipes = [];
  this._typeOfPipes = 13; //number of types pipes
  this._actualPipe = undefined; //Pipe that player will play with
  this.Pipes = [
      { type: "1",        img: "pipe1.png"  },
      { type: "2",        img: "pipe2.png"  },
      { type: "3",        img: "pipe3.png"  },
      { type: "4",        img: "pipe4.png"  },
      { type: "5",        img: "pipe5.png"  },
      { type: "6",        img: "pipe6.png"  },
      { type: "7",        img: "pipe7.png"  },
      { type: "8",        img: "pipe8.png"  },
      { type: "9",        img: "pipe9.png"  },
      { type: "10",       img: "pipe10.png" },
      { type: "11",       img: "pipe11.png" },
      { type: "12",       img: "pipe12.png" },
      { type: "13",       img: "pipe13.png" },
      { type: "14",       img: "pipe14.png" },
      { type: "15",       img: "pipe15.png" },
    ];

  //array that creates the grid of the game.
  for(var rowIndex= 0; rowIndex < this.rows; rowIndex++){
      for(var columnsIndex = 0; columnsIndex < this.columns ; columnsIndex++){
        $('.container').append($('<div>')
        .addClass('cell board')
        .attr('data-row', rowIndex)
        .attr('data-column', columnsIndex));
      }
  }
//inicialmente No muestro nada
//  $('.container').toggle();
}

//Method that sets the time to play
Game.prototype.setTimer = function (time){
  var that = this;
  setTimeout(function(){
    //alert("Time is up!!");
    var tapcol = that.tap.column;
    var taprow = that.tap.row;
    var tapdir = that.tap.direction;

    switch (tapdir) {
      case 1:
        taprow++;
        break;
      case 2:
        tapcol++;
        break;
      case 3:
        taprow--;
        break;
      case 4:
        tapcol--;
        break;
    }
    that.fillWater(tapdir, taprow, tapcol);// depends in the kind of tap
    _timeOff = true;
    console.log("puntos ganados al momento",that.pointsEarned);
  }, time);

};

//Method that inserts a new Pipe in the array of pipes on the board
Game.prototype.insertPipe = function (row, col, type){
  var exist = false;
  var objPipe = {
  row: row,
  col: col,
  type: type};

  var lookinginArray = this.pipesPlaced.indexOf(objPipe);
//----

if(this.pipesPlaced.length > 0){
  this.pipesPlaced.forEach(function (pipe,index){
    if(pipe.row === row && pipe.col=== col){
      pipe.type = type;
      exist = true;
    }
  });
}
//-------
if(!exist){
  this.pipesPlaced.push({
      row: row,
      col: col,
      type: type
    }
  );
 }
};

//Method that keep track of the earned points
Game.prototype.sumPoints = function(type2){
if(type2 !== undefined){
  var type = parseInt(type2);
  if((type <= 4 && type >= 0)|| type === 14 || type===15){
    this.pointsEarned += 2;
  }else if (type >=5 && type <=8) {
    this.pointsEarned += 3;
  }else if(type >= 9 && type <= 12){
    this.pointsEarned += 1;
  }else if (type === 13) {
    this.pointsEarned += 4;
  }
  console.log(this.pointsEarned);
}
};


//Method that creates randomly the next pipe to Play with
Game.prototype.createNewPipe = function(){
  var indexPipe = Math.floor(Math.random() * this.Pipes.length);
  this._actualPipe = this.Pipes[indexPipe];
  this.drawPipe();
};

//Draw the new Pipe
Game.prototype.drawPipe = function(){
//  $("#"+index).html(`<img src='img/${card.img}'>`);
  var path = "img/" + this._actualPipe.img;
  $('.actualPipe').prop('src', path);//checar que funcione
};

//set new Pipe on the grid
Game.prototype.setNewPipe = function (row, col) {
  if(!(this.tap.row == parseInt(row) && this.tap.column == parseInt(col))){
    var selector = '[data-row=' + row + '][data-column=' + col + ']';
    var imagePath = "<img src='img/" + this._actualPipe.img + "'>";
    var typePipe =  this._actualPipe.type;
    $(selector).html(imagePath);
    this.createNewPipe();
    this.insertPipe(row, col, typePipe);
  }
};

//Method that creates the initial Tap of the game in a random position
Game.prototype.setTap = function(){
  var rowTap = Math.floor(Math.random() * this.rows);
  var colTap = Math.floor(Math.random() * this.columns);
  var dirTap = Math.floor((Math.random() * 4) + 1);
  if(rowTap === 0){
    while(dirTap === 3){
      dirTap = Math.floor((Math.random() * 4) + 1);
    }
  }
  else if(rowTap === this.rows - 1){
    while(dirTap === 1){
      dirTap = Math.floor((Math.random() * 4) + 1);
    }
  }
  if(colTap === 0){
    while(dirTap === 4){
      dirTap = Math.floor((Math.random() * 4) + 1);
    }
  }else if(colTap === this.columns -1){
    while(dirTap === 2){
      dirTap = Math.floor((Math.random() * 4) + 1);
    }
  }
//Create the new tap with the right restrictions
  this.tap = {
    row: rowTap,
    column: colTap,
    direction : dirTap
  };
  console.log("Aqui esta la direccion del agua",dirTap);
};

//Method that draws on board the previusly created Tap.
Game.prototype.drawTap = function(){
  var tapD = this.tap.direction;
  var stringtap = "tap" + tapD;
  var selector = '[data-row=' + this.tap.row + '][data-column=' + this.tap.column + ']';
  $(selector).addClass('initialTap');
  $(selector).html("<img src='img/"+stringtap+ ".png'>");
};

//Method that paint that change the background-color to simulate the water flowing through the pipe
Game.prototype.colorWaterCell = function(direction,row, col){

  setTimeout(function(){

    var selector = '[data-row=' + row + '][data-column=' + col + ']';
    $(selector).css("background-color","#77d8ff");
  }, interTime);
  interTime+= 300;
};

Game.prototype.errorCell = function (row,col) {
  var selector = '[data-row=' + row + '][data-column=' + col + ']';
  $(selector).css("border-color", "#f7473d");
};

//Method that save the visited pipes in an array
Game.prototype.alreadyCheck = function(row,col,type){
  this.pipesChecked.push({
      row: row,
      col: col,
      type: type
    });
};

//Method that control conflict when a previously check pipe is visited
Game.prototype.validateCell = function (type, direction, row, col) {
  direction = parseInt(direction);
  type = parseInt(type);
  if(direction === 1){
    if(type === 1 || type === 3 || type === 5 || type === 10 || type === 11 || type === 12 || type === 15 ){
      console.log("You lose");
      this.errorCell(row,col);
      return false;
    }
  }
  else if(direction === 2){
    if(type === 2 || type === 3 || type === 8 || type === 9 || type === 10 || type === 12 || type === 14 ){
      console.log("You lose");
      this.errorCell(row,col);
      return false;
    }
  }
  else if(direction === 3){
    if(type === 2 || type === 4 || type === 6 || type === 9 || type === 11 || type === 12 || type === 15 ){
      console.log("You lose");
      this.errorCell(row,col);
      return false;
    }
  }
  else if(direction === 4){
    if(type === 1 || type === 4 || type === 7 || type === 9 || type === 10 || type === 11 || type === 14 ){
      console.log("You lose");
      this.errorCell(row,col);
      return false;
    }
  }
  return true;
};

//Main logic of the game, color the corret pipe and check if there is a leak in the grid.
Game.prototype.fillWater = function(direction, row, col){
  var type;
  var alreadyChecked = false;
  var rightDireccion = true;
  var indexPipesPlaced ;
  if(row >9 || col > 6 || row < 0 || col < 0){ //Check if the call for the metod is out of boundaries (CHeck if its necesary)
    return;
  }

  this.colorWaterCell(direction,row, col);



  //Check that the cell given exist in the array of pipes placed.
  this.pipesPlaced.forEach(function (pipe,index){
    if(parseInt(pipe.row) === row && parseInt(pipe.col) === col){
      type = parseInt(pipe.type);
      indexPipesPlaced = index;
    }
  });
  //Check if the water is already in
  var that = this;
  //If doesnt exist it means it has been already been check.
  if(indexPipesPlaced === undefined){
    this.pipesChecked.forEach(function (pipe,index){
      if(parseInt(pipe.row) === row && parseInt(pipe.col) === col){
        alreadyChecked = true;
        rightDireccion = that.validateCell(pipe.type, direction, row,col);//checar si es valida
      }
    });

    if(!alreadyChecked){
      console.log("You Lose");
      this.errorCell(row,col);
    }
    return;

  }
  this.pipesPlaced.splice(indexPipesPlaced,1);
  this.alreadyCheck(row, col, type);
  this.sumPoints(type);


  // pon color a la celda con barrido segun direccion.
  if(direction === 2){//Conditions when water comes from the left.
    if(type === 2 || type === 3 || type === 8 || type === 9 || type === 10 || type === 12 || type === 14){
      console.log("You lose");
      this.errorCell(row,col);
    }
    if(type === 1 || type === 5 || type=== 7 || type=== 13){
      this.fillWater(1,row+1,col);
    }
    if(type === 4 || type === 6 || type=== 7 || type===13){
      this.fillWater(3,row-1,col);
    }
    if(type === 5 || type === 6 || type=== 13 || type===15){
      this.fillWater(2,row,col+1);
    }
  }
  else if(direction === 3){//Conditions when water comes from the bottom.
    if(type === 2 || type === 4 || type === 6 || type === 9 || type === 11 || type === 12 || type === 15){
      console.log("You lose");
      this.errorCell(row,col);
    }
    if(type === 1 || type === 5 || type=== 7 || type=== 13){
      this.fillWater(4,row,col-1);
    }
    if(type === 3 || type === 5 || type=== 8 || type===13){
      this.fillWater(2,row,col+1);
    }
    if(type === 7 || type === 8 || type=== 13 || type===14){
      this.fillWater(3,row-1,col);
    }
  }
  else if(direction === 4){//Conditions when water comes from the right.
    if(type === 1 || type === 4 || type === 7 || type === 9 || type === 10 || type === 11 || type === 14){
      console.log("You lose");
      this.errorCell(row,col);
    }
    if(type === 2 || type === 6 || type=== 8 || type=== 13){
      this.fillWater(3,row-1,col);
    }
    if(type === 3 || type === 5 || type=== 8 || type===13){
      this.fillWater(1,row+1,col);
    }
    if(type === 5 || type === 6 || type=== 13 || type===15){
      this.fillWater(4,row,col-1);
    }
  }
  else if(direction === 1){//Conditions when water comes from the top.
    if(type === 1 || type === 3 || type === 5 || type === 10 || type === 11 || type === 12 || type === 15){
      console.log("You lose");
      this.errorCell(row,col);
    }
    if(type === 2 || type === 6 || type=== 8 || type=== 13){
      this.fillWater(2,row,col+1);
    }
    if(type === 4 || type === 6 || type=== 7 || type===13){
      this.fillWater(4,row,col-1);
    }
    if(type === 7 || type === 8 || type=== 13 || type===14){
      this.fillWater(1,row+1,col);
    }
  }
};

$(document).ready(function(){
  var game = new Game({
    rows: 10,
    columns: 7,
  });
  game.setTap();
  game.drawTap();
  game.createNewPipe();
  game.drawPipe();
  game.setTimer(30000);


  //Event Listener to catch de click of the User in the cell
    $(".cell").click(function(){
      var rowCell = $(this).attr("data-row");
      var colCell = $(this).attr("data-column");
      console.log(rowCell + "," + colCell);
      if(_timeOff === false){
        game.setNewPipe(rowCell,colCell);
      }
    });

});
