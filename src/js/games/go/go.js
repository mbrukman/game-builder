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

goog.provide('gamebuilder.games.go');

goog.require('gamebuilder.games');


/**
 * Represents the color of a Go piece (or the color used by a player).
 *
 * @param {string} color
 * @constructor
 */
gamebuilder.games.go.PieceColor = function(color) {
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;
};

/** type {gamebuilder.games.go.PieceColor} */
gamebuilder.games.go.PieceColor.WHITE =
    new gamebuilder.games.go.PieceColor('white');

/** type {gamebuilder.games.go.PieceColor} */
gamebuilder.games.go.PieceColor.BLACK =
    new gamebuilder.games.go.PieceColor('black');


/**
 * Represents a Go piece.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @constructor
 * @extends {gamebuilder.games.Piece}
 */
gamebuilder.games.go.Piece = function(color) {
  // A hack to call the base ctor and satisfy Closure Compiler.
  var base_color = /** @type {gamebuilder.games.PieceColor} */ color;
  gamebuilder.games.Piece.call(this, base_color);

  /**
   * @type {gamebuilder.games.go.PieceColor}
   * @protected
   */
  this.color_ = color;
};

goog.inherits(gamebuilder.games.go.Piece,
              gamebuilder.games.Piece);

/**
 * Returns the color of this piece.
 *
 * @return {gamebuilder.games.go.PieceColor} The color of this piece.
 */
gamebuilder.games.go.Piece.prototype.color = function() {
  return this.color_;
};


/**
 * Defines a generic MxN Go board.
 *
 * @param {number} m
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.BoardMxN}
 */
gamebuilder.games.go.BoardMxN = function(m, n) {
  gamebuilder.games.BoardMxN.call(this, m, n);
};

goog.inherits(gamebuilder.games.go.BoardMxN, gamebuilder.games.BoardMxN);

/**
 * Places a new piece with a given color at the specified position.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @param {string} pos string location, e.g. 'c10' or 'f9'
 * @public
 */
gamebuilder.games.go.BoardMxN.prototype.setPieceColorAtPos =
    function(color, pos) {
  this.setPieceAtPos_(new gamebuilder.games.go.Piece(color), pos);
};

/**
 * Returns the piece at the given coordinates (or null if none).
 *
 * @param {Array.<number>} coords A pair of numbers representing the coordinates.
 * @return {?gamebuilder.games.go.Piece} The piece at the coords, if any, or null.
 * @public
 */
gamebuilder.games.go.BoardMxN.prototype.getPieceAtCoords = function(coords) {
  // Downcast to the right piece type: this is safe because we only store
  // objects of type go.Piece in the board ourselves.
  var piece = /** @type {?gamebuilder.games.go.Piece} */
      this.getPieceAtCoords_(coords);
  return piece;
}

/**
 * Returns the piece at the given position (or null if none).
 *
 * @param {string} pos The coordinate on the board, e.g. 'e7' or 'g10'.
 * @return {?gamebuilder.games.go.Piece} The piece at the coords, if any, or null.
 * @public
 */
gamebuilder.games.go.BoardMxN.prototype.getPieceAtPos = function(pos) {
  var coords = gamebuilder.games.stringPosToCoords(pos);
  return this.getPieceAtCoords(coords);
}


// =============================================================================
// NxN Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.go.BoardMxN}
 */
gamebuilder.games.go.BoardNxN = function(n) {
  gamebuilder.games.go.BoardMxN.call(this, n, n);
};
goog.inherits(gamebuilder.games.go.BoardNxN, gamebuilder.games.go.BoardMxN);

// =============================================================================
// 19x19 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board19 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 19);
};
goog.inherits(gamebuilder.games.go.Board19, gamebuilder.games.go.BoardNxN);

// =============================================================================
// 13x13 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board13 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 13);
};
goog.inherits(gamebuilder.games.go.Board13, gamebuilder.games.go.BoardNxN);

// =============================================================================
// 9x9 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board9 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 9);
};
goog.inherits(gamebuilder.games.go.Board9, gamebuilder.games.go.BoardNxN);
