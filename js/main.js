function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.tap = undefined;
  this.pipesPlaced = [];
  this._typeOfPipes = 13; //number of types pipes
  this._actualPipe = undefined; //Pipe that player will play with
  this.Pipes = [
      { type: "1",         img: "pipe.png" },
      { type: "2",          img: "pipe2.png" }
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
};

//Draw the new Pipe
Game.prototype.drawPipe = function(){
//  $("#"+index).html(`<img src='img/${card.img}'>`);
  var path = "img/" + this._actualPipe.img;
  console.log("Path to follow", path);
  $('.actualPipe').prop('src', path);//checar que funcione
};

//set new Pipe on the grid

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
    });

});
