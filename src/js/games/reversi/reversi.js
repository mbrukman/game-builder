// Copyright 2011 Google Inc.
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
//
////////////////////////////////////////////////////////////////////////////////
//
// Basic classes and definitions for Reversi.  For simplicity, we reuse the
// pieces and colors from Go.

goog.provide('gamebuilder.games.reversi');

goog.require('gamebuilder.games');


/**
 * Represents the color of a Reversi piece (or the color used by a player).
 *
 * @param {string} color
 * @constructor
 */
gamebuilder.games.reversi.PieceColor = function(color) {
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;
};

/** type {gamebuilder.games.reversi.PieceColor} */
gamebuilder.games.reversi.PieceColor.WHITE =
    new gamebuilder.games.reversi.PieceColor('white');

/** type {gamebuilder.games.reversi.PieceColor} */
gamebuilder.games.reversi.PieceColor.BLACK =
    new gamebuilder.games.reversi.PieceColor('black');


/**
 * Represents a Reversi piece.
 *
 * @param {gamebuilder.games.reversi.PieceColor} color
 * @constructor
 * @extends {gamebuilder.games.Piece}
 */
gamebuilder.games.reversi.Piece = function(color) {
  var base_color = /** @type {gamebuilder.games.PieceColor} */ color;
  gamebuilder.games.Piece.call(this, base_color);

  /**
   * @type {gamebuilder.games.reversi.PieceColor}
   * @protected
   */
  this.color_ = color;
};

goog.inherits(gamebuilder.games.reversi.Piece, gamebuilder.games.Piece);

/**
 * Returns the color of this piece.
 *
 * @return {gamebuilder.games.reversi.PieceColor}
 */
gamebuilder.games.reversi.Piece.prototype.color = function () {
  return this.color_;
};


/**
 * @constructor
 * @extends {gamebuilder.games.BoardNxN}
 */
gamebuilder.games.reversi.Board = function() {
  gamebuilder.games.BoardNxN.call(this, 8);
};

goog.inherits(gamebuilder.games.reversi.Board,
              gamebuilder.games.BoardNxN);

/**
 * Returns the piece (if any) at the given coordinates.
 *
 * @param {Array.<number>} coords board-relative coordinates
 * @return {?gamebuilder.games.reversi.Piece} the piece at the given
 *     coordinates.
 */
gamebuilder.games.reversi.Board.prototype.getPieceAtCoords = function(coords) {
  var piece = /** @type {?gamebuilder.games.reversi.Piece} */
      (this.getPieceAtCoords_(coords));
  return piece;
};

/**
 * Returns the piece (if any) at the given position.
 *
 * @param {string} pos position on the board using alpha-numeric notation
 * @return {?gamebuilder.games.reversi.Piece} the piece at the given
 *     position.
 */
gamebuilder.games.reversi.Board.prototype.getPieceAtPos = function(pos) {
  var piece = /** @type {?gamebuilder.games.reversi.Piece} */
      (this.getPieceAtPos_(pos));
  return piece;
};

/**
 * Places a new piece of the given color at the given position.
 *
 * @param {gamebuilder.games.reversi.PieceColor} color color of the piece
 * @param {string} pos position to place piece
 */
gamebuilder.games.reversi.Board.prototype.setPieceColorAtPos =
    function(color, pos) {
  var piece = /** type {gamebuilder.games.Piece} */
      (new gamebuilder.games.reversi.Piece(color));
  this.setPieceAtPos_(piece, pos);
};

/**
 * Fills in the initial configuration for the start of a new game.
 */
gamebuilder.games.reversi.Board.prototype.initForGame = function() {
  var piece_pos = [[gamebuilder.games.reversi.PieceColor.BLACK,
                    ['e4', 'd5']],
                   [gamebuilder.games.reversi.PieceColor.WHITE,
                    ['d4', 'e5']]];
  for (var i = 0; i < piece_pos.length; ++i) {
    var piece_cfg = piece_pos[i];
    var color = piece_cfg[0];
    var pos = piece_cfg[1];
    for (var j = 0; j < pos.length; ++j) {
      this.setPieceColorAtPos(color, pos[j]);
    }
  }
};

/**
 * Place a piece of the given color and update the board configuration,
 * possibly triggering a UI update.
 *
 * @param {gamebuilder.games.reversi.PieceColor} color
 * @param {string} pos
 */
gamebuilder.games.reversi.Board.prototype.placeColorAndUpdate =
    function(color, pos) {
  // TODO: implement.
};


/**
 * @param {gamebuilder.games.reversi.PieceColor} color
 * @constructor
 */
gamebuilder.games.reversi.Player = function(color) {
  /**
   * @type {gamebuilder.games.reversi.PieceColor}
   * @private
   */
  this.color_ = color;
};


/**
 * TODO: document.
 *
 * @constructor
 */
gamebuilder.games.reversi.Game = function() {
  var reversi = gamebuilder.games.reversi;
  var board = new reversi.Board();
  var players = [new reversi.Player(reversi.PieceColor.BLACK),
                 new reversi.Player(reversi.PieceColor.WHITE)];
};
