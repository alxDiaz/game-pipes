function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.tap = undefined;
  this.pipes = [];


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
 this.pipes.push({
    row: row,
    col: col,
    type: type
   }
 );
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

  //Event Listener to catch de click of the User in the cell
    $(".cell").click(function(){
      var rowCell = $(this).attr("data-row");
      var colCell = $(this).attr("data-column");
      console.log(rowCell + "," + colCell);
    });

});
