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

goog.require('gamebuilder.games.go');


/**
 * Reversi {@code PieceColor} is simply an alias for {@code
 * gamebuilder.games.go.PieceColor} which we are reusing for simplicity and to
 * avoid duplication.
 *
 * @constructor
 */
gamebuilder.games.reversi.PieceColor = gamebuilder.games.go.PieceColor;


/**
 * Reversi {@code Piece} is simply an alias for {@code
 * gamebuilder.games.go.Piece} which we are reusing for simplicity and to
 * avoid duplication.
 *
 * @constructor
 */
gamebuilder.games.reversi.Piece = gamebuilder.games.go.Piece;


/**
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.reversi.Board = function() {
  gamebuilder.games.go.BoardNxN.call(this, 8);
};

goog.inherits(gamebuilder.games.reversi.Board,
              gamebuilder.games.go.BoardNxN);

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
