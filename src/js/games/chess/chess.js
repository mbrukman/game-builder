// Copyright 2009 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('gamebuilder.games.chess');

goog.require('gamebuilder.games');


/**
 * TODO: document.
 *
 * @param {string} color
 * @constructor
 */
gamebuilder.games.chess.PieceColor = function(color) {
  /**
   * type {string}
   * @private
   */
  this.color_ = color;
};

/**
 * TODO: document.
 *
 * @return {string} string description of the color.
 */
gamebuilder.games.chess.PieceColor.prototype.str = function() {
  return this.color_;
};

/** type {gamebuilder.games.chess.PieceColor} */
gamebuilder.games.chess.PieceColor.BLACK =
    new gamebuilder.games.chess.PieceColor('black');

/** type {gamebuilder.games.chess.PieceColor} */
gamebuilder.games.chess.PieceColor.WHITE =
    new gamebuilder.games.chess.PieceColor('white');


/**
 * TODO: document.
 *
 * @param {string} value
 * @constructor
 */
gamebuilder.games.chess.PieceValue = function(value) {
  /**
   * type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * TODO: document.
 *
 * @return {string} string description of the value.
 */
gamebuilder.games.chess.PieceValue.prototype.str = function() {
  return this.value_;
};

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.PAWN =
    new gamebuilder.games.chess.PieceValue('pawn');

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.KNIGHT =
    new gamebuilder.games.chess.PieceValue('knight');

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.BISHOP =
    new gamebuilder.games.chess.PieceValue('bishop');

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.ROOK =
    new gamebuilder.games.chess.PieceValue('rook');

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.QUEEN =
    new gamebuilder.games.chess.PieceValue('queen');

/** type {gamebuilder.games.chess.PieceValue} */
gamebuilder.games.chess.PieceValue.KING =
    new gamebuilder.games.chess.PieceValue('king');


/**
 * @param {gamebuilder.games.chess.PieceColor} color
 * @param {gamebuilder.games.chess.PieceValue} value
 * @constructor
 * @extends {gamebuilder.games.Piece}
 */
gamebuilder.games.chess.Piece = function(color, value) {
  switch (color) {
    case gamebuilder.games.chess.PieceColor.BLACK:
    case gamebuilder.games.chess.PieceColor.WHITE:
      break;
    default:
      throw new Error('Invalid piece color: ' + color.str());
  }

  /**
   * @type {gamebuilder.games.chess.PieceColor}
   * @protected
   */
  this.color_ = color;

  switch (value) {
    case gamebuilder.games.chess.PieceValue.PAWN:
    case gamebuilder.games.chess.PieceValue.KNIGHT:
    case gamebuilder.games.chess.PieceValue.BISHOP:
    case gamebuilder.games.chess.PieceValue.ROOK:
    case gamebuilder.games.chess.PieceValue.QUEEN:
    case gamebuilder.games.chess.PieceValue.KING:
      break;
    default:
      throw new Error('Invalid piece value: ' + value.str());
  }

  /**
   * @type {gamebuilder.games.chess.PieceValue}
   * @private
   */
  this.value_ = value;
};

goog.inherits(gamebuilder.games.chess.Piece,
              gamebuilder.games.Piece);

/**
 * @return {gamebuilder.games.chess.PieceColor}
 */
gamebuilder.games.chess.Piece.prototype.color = function() {
  return this.color_;
};

/**
 * @return {gamebuilder.games.chess.PieceValue}
 */
gamebuilder.games.chess.Piece.prototype.value = function() {
  return this.value_;
};

/**
 * TODO: document.
 *
 * @param {gamebuilder.games.chess.PieceValue} piece_value
 * @return {string}
 */
gamebuilder.games.chess.Piece.pieceToLowerCaseChar = function(piece_value) {
  // Only storing one version since the difference is just case
  switch (piece_value) {
    case gamebuilder.games.chess.PieceValue.PAWN  : return 'p';
    case gamebuilder.games.chess.PieceValue.KNIGHT: return 'n';
    case gamebuilder.games.chess.PieceValue.BISHOP: return 'b';
    case gamebuilder.games.chess.PieceValue.ROOK  : return 'r';
    case gamebuilder.games.chess.PieceValue.QUEEN : return 'q';
    case gamebuilder.games.chess.PieceValue.KING  : return 'k';
    default:
      throw new Error('Invalid piece value: ' + piece_value);
  }
};

/**
 * TODO: document.
 *
 * @return {string}
 */
gamebuilder.games.chess.Piece.prototype.toCharCode = function() {
  var char_code = gamebuilder.games.chess.Piece.pieceToLowerCaseChar(this.value_);
  if (this.color_ == gamebuilder.games.chess.PieceColor.WHITE) {
    return char_code.toUpperCase();
  } else {
    return char_code.toLowerCase();
  }
};

/**
 * TODO: document.
 *
 * @param {string} char_code
 * @return {gamebuilder.games.chess.PieceValue}
 */
gamebuilder.games.chess.Piece.lowerCaseCharToPiece = function(char_code) {
  switch (char_code) {
    case 'p': return gamebuilder.games.chess.PieceValue.PAWN;
    case 'n': return gamebuilder.games.chess.PieceValue.KNIGHT;
    case 'b': return gamebuilder.games.chess.PieceValue.BISHOP;
    case 'r': return gamebuilder.games.chess.PieceValue.ROOK;
    case 'q': return gamebuilder.games.chess.PieceValue.QUEEN;
    case 'k': return gamebuilder.games.chess.PieceValue.KING;
    default:
      throw new Error('Invalid piece char code: `' + char_code + "'");
  }
};

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.chess.Piece}
 */
gamebuilder.games.chess.Piece.createFromCharCode = function(char_code) {
  var color = (char_code == char_code.toLowerCase())
      ? gamebuilder.games.chess.PieceColor.BLACK
      : gamebuilder.games.chess.PieceColor.WHITE;
  var value = gamebuilder.games.chess.Piece.lowerCaseCharToPiece(char_code.toLowerCase());
  return new gamebuilder.games.chess.Piece(color, value);
};

/**
 * TODO: document.
 *
 * @constructor
 */
gamebuilder.games.chess.SquareColor = function(color) {
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;
};

/**
 * TODO: document.
 *
 * @return {string} The string representation of the square color.
 */
gamebuilder.games.chess.SquareColor.prototype.str = function() {
  return this.color_;
};

/** type {gamebuilder.games.chess.SquareColor} */
gamebuilder.games.chess.SquareColor.DARK =
    new gamebuilder.games.chess.SquareColor('dark');

/** type {gamebuilder.games.chess.SquareColor} */
gamebuilder.games.chess.SquareColor.LIGHT =
    new gamebuilder.games.chess.SquareColor('light');


/**
 * Represents a single square on a chess board; both the color of the square
 * (light or dark), and contents (piece, if any).
 *
 * @param {gamebuilder.games.chess.SquareColor} color
 * @param {?gamebuilder.games.chess.Piece} opt_piece
 * @constructor
 */
gamebuilder.games.chess.BoardSquare = function(color, opt_piece) {
  /**
   * @type {gamebuilder.games.chess.Piece}
   * @protected
   */
  this.piece_ = opt_piece || null;

  /**
   * @type {gamebuilder.games.chess.SquareColor}
   * @private
   */
  this.color_ = color;
};

/**
 * Sets a piece at this board location.
 *
 * @param {?gamebuilder.games.chess.Piece} opt_piece
 */
gamebuilder.games.chess.BoardSquare.prototype.setPiece = function(opt_piece) {
  this.piece_ = opt_piece || null;
};

/**
 * Gets a piece at this board location, if any.
 *
 * @return {?gamebuilder.games.chess.Piece} Returns the piece, if any.
 */
gamebuilder.games.chess.BoardSquare.prototype.getPiece = function() {
  return this.piece_;
};


/**
 * TODO: document.
 * @return {gamebuilder.games.chess.SquareColor}
 */
gamebuilder.games.chess.BoardSquare.prototype.color = function() {
  return this.color_;
};


// ==============================================================================
// Chess board: generic: rectangular
// ==============================================================================

/**
 * A generic, rectangular MxN chess board.
 *
 * @param {number} m
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.BoardMxN}
 */
gamebuilder.games.chess.BoardMxN = function(m, n) {
  gamebuilder.games.BoardMxN.call(this, m, n);

  /**
   * A redeclaration of a Board from the inherited {@code board_} which
   * originally contained instances of {@code gamebuilder.games.BoardLocation}.
   *
   * @type {Array.<Array.<gamebuilder.games.chess.BoardSquare>>}
   * @protected
   */
  this.board_ = [];

  for (var i = 0; i < n; ++i) {
    this.board_[i] = [];
    for (var j = 0; j < m; ++j) {
      var boardSquare = new gamebuilder.games.chess.BoardSquare((i + j) % 2
          ? gamebuilder.games.chess.SquareColor.DARK
          : gamebuilder.games.chess.SquareColor.LIGHT,
          null);
      this.board_[i][j] = boardSquare;
    }
  }
};

goog.inherits(gamebuilder.games.chess.BoardMxN,
              gamebuilder.games.BoardMxN);

/**
 * TODO: document.
 *
 * @param {Array.<number>} coords
 * @return {gamebuilder.games.chess.BoardSquare}
 */
gamebuilder.games.chess.BoardMxN.prototype.getSquare = function(coords) {
  return this.board_[coords[0]][coords[1]];
};

/**
 * TODO: document.
 *
 * @param {number} m
 * @param {number} n
 * @return {gamebuilder.games.chess.SquareColor}
 */
gamebuilder.games.chess.BoardMxN.prototype.getSquareColor = function(m, n) {
  return this.getSquare([m, n]).color();
};

/**
 * TODO: document.
 *
 * @param {number} row
 * @return {boolean}
 */
gamebuilder.games.chess.BoardMxN.prototype.isRowValid = function(row) {
  return (row >= 0) && (row < this.numRows());
};

/**
 * TODO: document.
 *
 * @param {number} col
 * @return {boolean}
 */
gamebuilder.games.chess.BoardMxN.prototype.isColValid = function(col) {
  return (col >= 0) && (col < this.numCols());
};

/**
 * TODO: document.
 *
 * @param {number} row
 * @param {number} col
 * @return {boolean}
 * @private
 */
gamebuilder.games.chess.BoardMxN.prototype.isCoordValid_ = function(row, col) {
  return this.isRowValid(row) && (col >= 0) && (col < this.numCols());
};

/**
 * TODO: document.
 *
 * @param {number} row
 * @param {number} col
 * @param {gamebuilder.games.chess.Piece} piece
 */
gamebuilder.games.chess.BoardMxN.prototype.setPiece = function(row, col, piece) {
  if (this.isCoordValid_(row, col)) {
    this.board_[row][col].setPiece(piece);
  } else {
    throw new Error('Invalid coordinates for setPiece: (' +
                    row + ', ' + col + ')');
  }
};

/**
 * TODO: document.
 *
 * @param {number} row
 * @param {number} col
 * @return {?gamebuilder.games.chess.Piece} The pieces at the given location.
 */
gamebuilder.games.chess.BoardMxN.prototype.getPiece = function(row, col) {
  if (this.isCoordValid_(row, col)) {
    return this.getSquare([row, col]).getPiece();
  }
  return null;
};

// ==============================================================================
// Chess board: generic: square
// ==============================================================================

/**
 * A generic square NxN chess board.
 *
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.chess.BoardMxN}
 */
gamebuilder.games.chess.BoardNxN = function(n) {
  gamebuilder.games.chess.BoardMxN.call(this, n, n);
};
goog.inherits(gamebuilder.games.chess.BoardNxN,
              gamebuilder.games.chess.BoardMxN);

// ==============================================================================
// Chess board: traditional
// ==============================================================================

/**
 * The traditional 8x8 chess board.
 *
 * @constructor
 * @extends {gamebuilder.games.chess.BoardNxN}
 */
gamebuilder.games.chess.Board = function() {
  gamebuilder.games.chess.BoardNxN.call(this, 8);
};
goog.inherits(gamebuilder.games.chess.Board,
              gamebuilder.games.chess.BoardNxN);
