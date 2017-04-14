function Game(options){
  this.rows = options.rows;
  this.columns = options.columns;
  this.tap = undefined;


  //array that creates the grid where the snake can move.
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

Game.prototype.setTap = function(){
  this.tap = {
    row: Math.floor(Math.random() * this.rows),
    column: Math.floor(Math.random() * this.columns)
  };
};

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
  console.log("Se esta cargando");
  game.setTap();
  console.log(game.tap);
  game.drawTap();

});
