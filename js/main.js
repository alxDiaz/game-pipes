function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.tap = undefined;
  this.pipesPlaced = [];
  this._typeOfPipes = 13; //number of types pipes
  this._actualPipe = undefined; //Pipe that player will play with
  this.Pipes = [
      { type: "1",        img: "pipe1.png" },
      { type: "2",        img: "pipe2.png" },
      { type: "3",        img: "pipe3.png" },
      { type: "4",        img: "pipe4.png" },
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

//Method that inserts a new Pipe in the array of pipes on the board
Game.prototype.insertPipe = function (row, col, type){
 this.pipesPlaced.push({
    row: row,
    col: col,
    type: type
   }
 );
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
  console.log("Path to follow", path);
  $('.actualPipe').prop('src', path);//checar que funcione
};

//set new Pipe on the grid
Game.prototype.setNewPipe = function (row, col) {
  var false1 = (this.tap.row !== parseInt(row));
  var false2 =(this.tap.column !== parseInt(col));
  var falseV = ((this.tap.row !== row) && (this.tap.column !== col)) ;
  console.log(this.tap.row+ ","+this.tap.column + "original");
  console.log(row +","+col);
  console.log(falseV);


  if(!(this.tap.row == parseInt(row) && this.tap.column == parseInt(col))){
    var selector = '[data-row=' + row + '][data-column=' + col + ']';
    var imagePath = "<img src='img/" + this._actualPipe.img + "'>";
    console.log(selector +"," +imagePath);
    $(selector).html(imagePath);
    this.createNewPipe();
  }
};

//Method that creates the initial Tap of the game in a random position
Game.prototype.setTap = function(){
  this.tap = {
    row: Math.floor(Math.random() * this.rows),
    column: Math.floor(Math.random() * this.columns)
  };
};

//Method that draws on board the previusly created Tap.
Game.prototype.drawTap = function(){
  var selector = '[data-row=' + this.tap.row + '][data-column=' + this.tap.column + ']';
  console.log("row=" + this.tap.row +" , col= "  + this.tap.column+ "");
  $(selector).addClass('initialTap');
  $(selector).html("<img src='img/water_tap.png'>");
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

  //Event Listener to catch de click of the User in the cell
    $(".cell").click(function(){
      var rowCell = $(this).attr("data-row");
      var colCell = $(this).attr("data-column");
      console.log(rowCell + "," + colCell);
      game.setNewPipe(rowCell,colCell);
    });

});
