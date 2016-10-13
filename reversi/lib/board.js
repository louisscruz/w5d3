let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let board = [];
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 8; j++) {
      row.push(null);
    }
    board.push(row);
  }
  let whites = [[3, 3], [4, 4]];
  let blacks = [[4, 3], [3, 4]];
  whites.forEach(coordinates => {
    let piece = new Piece("white");
    board[coordinates[0]][coordinates[1]] = piece;
  });
  blacks.forEach(coordinates => {
    let piece = new Piece("black");
    board[coordinates[0]][coordinates[1]] = piece;
  });
  return board;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return (this.validMoves(color).length <= 0) ? false : true;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  if (!this.isOccupied(pos)) return false;
  return this.getPiece(pos).color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  return this.getPiece(pos) instanceof Piece;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove('white') && !this.hasMove('black');
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if (pos[0] < 0 || pos[0] > 7) return false;
  if (pos[1] < 0 || pos[1] > 7) return false;
  return true;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir) {
  let positions = [];
  let nextPos = [pos[0] + dir[0], pos[1] + dir[1]];
  while (board.isValidPos(nextPos)) {
    let piece = board.getPiece(nextPos);
    if (piece === null) return null;
    if (board.getPiece(nextPos).oppColor() === color) {
      positions.push(nextPos);
    } else {

      let value =  positions.length === 0 ? null : positions;
      return value;
    }
    nextPos = [nextPos[0] + dir[0], nextPos[1] + dir[1]];
  }
}
// function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
// }

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!this.validMove(pos, color)) throw new Error;
  this.grid[pos[0]][pos[1]] = new Piece(color);
  Board.DIRS.forEach(direction => {
    let positions = _positionsToFlip(this, pos, color, direction);
    if (positions) {
      positions.forEach(position => {
        this.getPiece(position).flip();
      });
    }
  });
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  let drawing = '\n';
  for(let i = 0; i < 8; i++) {
    for(let j = 0; j < 8; j++) {
      if (this.isOccupied([i, j])) {
        drawing += this.getPiece([i,j]).toString() + ' ';
      } else {
        drawing += '_ ';
      }
    }
    drawing += '\n';
  }
  return drawing;
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) return false;
  for(let i = 0; i < Board.DIRS.length; i++) {
    let direction = Board.DIRS[i];
    if (_positionsToFlip(this, pos, color, direction)) {
      return true;
    }
  }
  return false;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let positions = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let pos = [i, j];
      if (this.validMove(pos, color)) positions.push(pos);
    }
  }
  return positions;
};

module.exports = Board;
