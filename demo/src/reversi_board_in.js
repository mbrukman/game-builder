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
// Demo usage of the Reversi library.

goog.provide('demo.reversi.board');

goog.require('gamebuilder.games.reversi');
goog.require('gamebuilder.games.reversi.ui');

/**
 * @type {?gamebuilder.games.reversi.PieceColor}
 * @private
 */
var currentColor = gamebuilder.games.reversi.PieceColor.BLACK;

/**
 * @private
 */
var colorToId = [
  [gamebuilder.games.reversi.PieceColor.BLACK, 'blackPiece'],
  [gamebuilder.games.reversi.PieceColor.WHITE, 'whitePiece'],
  [null, 'emptyPiece']
];

/**
 * Updates the outline around the to-be-placed-next piece in the UI.
 */
function updateNextPiece() {
  for (var i = 0; i < colorToId.length; ++i) {
    var elt = document.getElementById(colorToId[i][1]);
    elt.className = (currentColor == colorToId[i][0]) ? 'sel' : 'notsel';
  }
}

/**
 * Puts a piece on the board.
 *
 * @param {gamebuilder.games.reversi.ui.BoardUI} board_ui The visible board handler.
 * @param {gamebuilder.games.reversi.Board} board The board controller.
 * @param {string} pos Position on the board where to place the piece.
 */
function placePiece(board_ui, board, pos) {
  if (gamebuilder.util.isDefAndNotNull(currentColor)) {
    board.setPieceColorAtPos(currentColor, pos);
  } else {
    board.erasePieceAtPos(pos);
  }
  board_ui.update();
  updateNextPiece();
}

/**
 * TODO: document.
 *
 * @param {?gamebuilder.games.reversi.PieceColor} color
 * @return {Function}
 */
function createColorChangeClosure(color) {
  return function() {
    currentColor = color;
    updateNextPiece();
  };
}

/**
 * Handle key presses from the user.
 *
 * @param {*} key
 */
function captureKeypress(key) {
  var which = String.fromCharCode(key.which).toLowerCase();
  if (which == 'b') {
    currentColor = gamebuilder.games.reversi.PieceColor.BLACK;
  } else if (which == 'w') {
    currentColor = gamebuilder.games.reversi.PieceColor.WHITE;
  } else if (which == 'e') {
    currentColor = null;
  }
  updateNextPiece();
}

/**
 * TODO: document.
 *
 * @export
 */
demo.reversi.board.displayReversiBoard = function() {
  // Create and display the board.
  var board = new gamebuilder.games.reversi.Board();
  var board_ui = new gamebuilder.games.reversi.ui.BoardUI(board);
  board_ui.setImagePath('../data/images/go');
  document.getElementById('board').appendChild(board_ui.getHtmlTable());

  // Setup pieces in the legend.
  for (var i = 0; i < colorToId.length; ++i) {
    var color = colorToId[i][0];
    var piece = null;
    if (gamebuilder.util.isDefAndNotNull(color)) {
      piece = new gamebuilder.games.reversi.Piece(color);
    }
    var img = board_ui.newImageForPiece(piece);
    img.onclick = createColorChangeClosure(color);
    document.getElementById(colorToId[i][1]).appendChild(img);
  }

  board_ui.update();
  board_ui.bindEmptyCells(placePiece);
  updateNextPiece();

  document.onkeypress = captureKeypress;
};
