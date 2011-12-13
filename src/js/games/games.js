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

goog.provide('gamebuilder.games');

goog.require('gamebuilder.util');


/**
 *
 * @param {string} color
 * @constructor
 */
gamebuilder.games.PieceColor = function(color) {
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;
};

/**
 * TODO: document.
 *
 * @param {gamebuilder.games.PieceColor} color
 * @constructor
 */
gamebuilder.games.Piece = function(color) {
  /**
   * @type {gamebuilder.games.PieceColor}
   * @protected
   */
  this.color_ = color;
};

/**
 * Returns the color of this piece.
 *
 * @return {gamebuilder.games.PieceColor}
 */
gamebuilder.games.Piece.prototype.color = function () {
  return this.color_;
};


/**
 * TODO: document.
 *
 * @param {number} m
 * @param {number} n
 * @constructor
 */
gamebuilder.games.BoardMxN = function(m, n) {
  /**
   * @type {Array.<Array.<?gamebuilder.games.Piece>>}
   * @protected
   */
  this.board_ = [];
  for (var i = 0; i < n; ++i) {
    this.board_[i] = [];
    for (var j = 0; j < m; ++j) {
      this.board_[i][j] = null;
    }
  }
};

/**
 * TODO: document.
 *
 * @return {number} number of rows on this board.
 */
gamebuilder.games.BoardMxN.prototype.numRows = function() {
  return this.board_.length;
};

/**
 * TODO: document.
 *
 * @return {number} number of columns on this board.
 */
gamebuilder.games.BoardMxN.prototype.numCols = function() {
  // Given that the board is rectangular, all the rows are the same size.
  return this.board_[0].length;
};

/**
 * Sets the given piece (or null if none) at the given position.
 *
 * @param {?gamebuilder.games.Piece} piece
 * @param {string} pos
 * @protected
 */
gamebuilder.games.BoardMxN.prototype.setPieceAtPos_ = function(piece, pos) {
  var coords = gamebuilder.games.stringPosToCoords(pos);
  this.setPieceAtCoords_(piece, coords);
};

/**
 * Returns the piece on the board at the given position, if any, or null if none.
 *
 * @param {string} pos
 * @return {?gamebuilder.games.Piece} the piece at the given position, if any.
 * @protected
 */
gamebuilder.games.BoardMxN.prototype.getPieceAtPos_ = function(pos) {
  var coords = gamebuilder.games.stringPosToCoords(pos);
  this.getPieceAtCoords_(coords);
};

/**
 * Erases the piece at the given position.
 *
 * @param {string} pos
 */
gamebuilder.games.BoardMxN.prototype.erasePieceAtPos = function(pos) {
  this.setPieceAtPos_(null, pos);
};

gamebuilder.games.BoardMxN.prototype.validateCoords = function(coords) {
  if (coords[0] < 0 || this.board_.length <= coords[0] ||
      coords[1] < 0 || this.board_[0].length <= coords[1]) {
    throw new Error(gamebuilder.util.sprintf(
        'Invalid coords (%s, %s) for board (%s x %s)',
        coords[0], coords[1], this.board_.length, this.board_[0].length));
  }
};

/**
 * Places the given piece at the provided coordinates
 *
 * @param {gamebuilder.games.Piece} piece
 * @param {Array.<number>} coords A 2-element array that specifies the
 *     board-relative coordinates.
 * @protected
 */
gamebuilder.games.BoardMxN.prototype.setPieceAtCoords_ =
    function(piece, coords) {
  // Will throw an error if invalid.
  this.validateCoords(coords);
  this.board_[coords[0]][coords[1]] = piece;
};

/**
 * Deletes the piece at the given coordinates.
 *
 * @param {Array.<number>} coords
 * @protected
 */
gamebuilder.games.BoardMxN.prototype.erasePieceAtCoords_ = function(coords) {
  this.setPieceAtCoords_(null, coords);
};

/**
 * Returns the piece at the given coordinates.
 *
 * @param {Array.<number>} coords
 * @return {gamebuilder.games.Piece}
 * @protected
 */
gamebuilder.games.BoardMxN.prototype.getPieceAtCoords_ = function(coords) {
  // Will throw an error if invalid.
  this.validateCoords(coords);
  return this.board_[coords[0]][coords[1]];
};


/**
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.BoardMxN}
 */
gamebuilder.games.BoardNxN = function(n) {
  gamebuilder.games.BoardMxN.call(this, n, n);
};
goog.inherits(gamebuilder.games.BoardNxN, gamebuilder.games.BoardMxN);

/**
 * Given a string board position, converts it into an ordered pair (x, y),
 * e.g. 'j10' becomes (10, 10). The input is 1-based and lower-case, so
 * 'a1' is the lower-left corner; and 'a0' is invalid.
 *
 * The output is zero-based pair of array indices.
 *
 * @param {string} name A string position such as "j10".
 * @return {Array.<number>} Array of 2 ints representing the position.
 */
gamebuilder.games.stringPosToCoords = function(name) {
  if (name.length < 2) {
    throw new Error('Invalid format of coordinates: ' + name)
  }
  return [name.charCodeAt(0) - 'a'.charCodeAt(0),
          name.substr(1, name.length) - 1];
};

/**
 * This is the inverse of stringPosToCoords().
 *
 * @param {Array.<number>} coords A pair of integers, representing a position
 *     on the board, implementation-specific; not user-visible.
 * @return {string} A lower-case string position such as 'i5'.
 */
gamebuilder.games.coordsToStringPos = function(coords) {
  return gamebuilder.util.sprintf('%s%s',
                      String.fromCharCode('a'.charCodeAt(0) + coords[0]),
                      coords[1] + 1);
};
