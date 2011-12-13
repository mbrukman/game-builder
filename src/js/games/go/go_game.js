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
// Create a complete, interactive Go game with a visible UI.

goog.provide('gamebuilder.games.go.game');

goog.require('gamebuilder.games.go');
goog.require('gamebuilder.games.go.ui');


/**
 * A generic Go game on an NxN board.
 *
 * @param {number} n Length of the side of the board.
 * @constructor
 */
gamebuilder.games.go.game.GoGameNxN = function(n) {
  var go = gamebuilder.games.go;

  /**
   * TODO: document.
   *
   * @type {gamebuilder.games.go.BoardNxN}
   * @private
   */
  this.board_ = new go.BoardNxN(n);

  /**
   * TODO: document.
   *
   * @type {gamebuilder.games.go.ui.BoardUI}
   * @private
   */
  this.boardUi_ = new go.ui.BoardUI(this.board_);

  /**
   * TODO: document.
   *
   * @type {gamebuilder.games.go.PieceColor}
   * @private
   */
  this.nextToMove_ = go.PieceColor.BLACK;

  /**
   * Array of callbacks to execute when a move occurs.  The callbacks must have
   * the signature: {@code function(color: go.PieceColor, pos: string)} .
   *
   * @type {Array.<Function>}
   * @private
   */
  this.moveCallbacks_ = [];
};

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.game.GoGameNxN.prototype.board = function() {
  return this.board_;
};

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.go.ui.BoardUI}
 */
gamebuilder.games.go.game.GoGameNxN.prototype.board_ui = function() {
  return this.boardUi_;
};

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.go.PieceColor}
 */
gamebuilder.games.go.game.GoGameNxN.prototype.nextToMove = function() {
  return this.nextToMove_;
};

/**
 * Adds a callback to the list of callbacks which are called whenever a valid
 * move occurs.
 *
 * @param {Function} cb callback to be added.
 */
gamebuilder.games.go.game.GoGameNxN.prototype.addMoveCallback = function(cb) {
  this.moveCallbacks_.push(cb);
};

/**
 * TODO: document.
 *
 * @param {string} pos
 */
gamebuilder.games.go.game.GoGameNxN.prototype.updateForPlacedPiece =
    function(pos) {
  var piece = this.board_.getPieceAtPos(pos);
  if (gamebuilder.util.isDefAndNotNull(piece)) {
    // There's already a piece at this position, and you can't replace pieces
    // in Go, so this is a no-op.
    return;
  }

  var moveColor = this.nextToMove_;

  // Play a piece at the position.
  this.board_.setPieceColorAtPos(moveColor, pos);

  // TODO: find any groups that are now completely surrounded and remove them.
  // TODO: add points for any removed groups.

  this.boardUi_.update();

  // Call any registered callbacks for this move.
  for (var i = 0; i < this.moveCallbacks_.length; ++i) {
    this.moveCallbacks_[i](moveColor, pos);
  }

  // Update the next-to-move piece color.
  var black = gamebuilder.games.go.PieceColor.BLACK;
  var white = gamebuilder.games.go.PieceColor.WHITE;
  this.nextToMove_ = (moveColor == black) ? white : black;
};

/**
 * Returns an anonymous function callback for handling clicks on the UI
 * elements in the displayed Go board, which simply delegates to the game to
 * update its internal state and signal to the UI to update itself from the
 * undelying Board object.
 *
 * @private
 */
function getPlacePieceCallback_(game) {
  return function(unused_board_ui, unused_board, pos) {
    game.updateForPlacedPiece(pos);
  };
}

/**
 * Initializes the HTML UI for this game, sets the callbacks to handle clicks.
 */
gamebuilder.games.go.game.GoGameNxN.prototype.init = function() {
  this.boardUi_.init();
  this.boardUi_.bindEmptyCells(getPlacePieceCallback_(this));
};

/**
 * A traditional Go game on a 9x9 board.
 *
 * @constructor
 * @extends {gamebuilder.games.go.game.GoGameNxN}
 */
gamebuilder.games.go.game.GoGame9 = function() {
  gamebuilder.games.go.game.GoGameNxN.call(this, 9);
};

goog.inherits(gamebuilder.games.go.game.GoGame9,
              gamebuilder.games.go.game.GoGameNxN);


/**
 * A traditional Go game on a 13x13 board.
 *
 * @constructor
 * @extends {gamebuilder.games.go.game.GoGameNxN}
 */
gamebuilder.games.go.game.GoGame13 = function() {
  gamebuilder.games.go.game.GoGameNxN.call(this, 13);
};

goog.inherits(gamebuilder.games.go.game.GoGame13,
              gamebuilder.games.go.game.GoGameNxN);


/**
 * A traditional Go game on a 19x19 board.
 *
 * @constructor
 * @extends {gamebuilder.games.go.game.GoGameNxN}
 */
gamebuilder.games.go.game.GoGame19 = function() {
  gamebuilder.games.go.game.GoGameNxN.call(this, 19);
};

goog.inherits(gamebuilder.games.go.game.GoGame19,
              gamebuilder.games.go.game.GoGameNxN);
