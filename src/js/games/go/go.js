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
 * TODO: document.
 *
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
 * TODO: document.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @constructor
 * @extends {gamebuilder.games.Piece}
 */
gamebuilder.games.go.Piece = function(color) {
  /**
   * @type {gamebuilder.games.go.PieceColor}
   * @private
   */
  this.color_ = color;
};

goog.inherits(gamebuilder.games.go.Piece,
              gamebuilder.games.Piece);

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.go.PieceColor} The color of this piece.
 */
gamebuilder.games.go.Piece.prototype.color = function() {
  return this.color_;
};


/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.BoardLocation}
 */
gamebuilder.games.go.BoardLocation = function() {
  /**
   * @type {?gamebuilder.games.go.Piece}
   * @protected
   */
  this.piece_ = null;
};

/**
 * Sets a piece at this board location.
 *
 * @param {?gamebuilder.games.go.Piece} opt_piece
 */
gamebuilder.games.go.BoardLocation.prototype.setPiece = function(opt_piece) {
  this.piece_ = opt_piece || null;
};

/**
 * Gets a piece at this board location, if any.
 *
 * @return {?gamebuilder.games.go.Piece} Returns the piece, if any.
 */
gamebuilder.games.go.BoardLocation.prototype.getPiece = function() {
  return this.piece_;
};

/**
 * TODO: document.
 *
 * @param {number} m
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.BoardMxN}
 */
gamebuilder.games.go.BoardMxN = function(m, n) {
  gamebuilder.games.BoardMxN.call(this, m, n);

  /**
   * A redeclaration of a Board from the inherited {@code board_} which
   * originally contained instances of {@code gamebuilder.games.BoardLocation}.
   *
   * @type {Array.<Array.<gamebuilder.games.go.BoardLocation>>}
   * @protected
   */
  this.board_ = [];

  for (var i = 0; i < n; ++i) {
    this.board_[i] = [];
    for (var j = 0; j < m; ++j) {
      var loc = new gamebuilder.games.go.BoardLocation();
      // TODO: investigate why this doesn't work.
      // this.setLoc([i, j], loc);
      this.board_[i][j] = loc;
    }
  }
};

goog.inherits(gamebuilder.games.go.BoardMxN, gamebuilder.games.BoardMxN);

/**
 * Places a new piece with a given color at the specified position.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @param {string} pos string location, e.g. 'c10' or 'f9'
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.setPieceColorAtPos =
    function(color, pos) {
  this.setPieceAtPos(new gamebuilder.games.go.Piece(color), pos);
};

/**
 * TODO: document.
 *
 * @param {Array.<number>} coords A pair of numbers representing the coordinates.
 * @return {?gamebuilder.games.go.Piece} The piece at the coords, if any, or null.
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.getPieceAtCoords = function(coords) {
  var loc = /** @type {gamebuilder.games.go.BoardLocation} */ this.getLoc(coords);
  var piece = loc.getPiece();
  if (gamebuilder.util.isDefAndNotNull(piece)) {
    return piece;
  }
  return null;
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
