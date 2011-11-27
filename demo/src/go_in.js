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
// Demo usage of Go library.

goog.provide('demo.go');

goog.require('gamebuilder.games.go');


var currentColor = gamebuilder.games.go.PieceColor.BLACK;
var colorToId = [
  [gamebuilder.games.go.PieceColor.BLACK, 'blackPiece'],
  [gamebuilder.games.go.PieceColor.WHITE, 'whitePiece'],
  [null               , 'emptyPiece']
];

/**
 * TODO: document.
 *
 */
function updateNextPiece() {
  for (var i = 0; i < colorToId.length; ++i) {
    var elt = document.getElementById(colorToId[i][1]);
    // FIXME: we should be able to set the border via
    //   elt.style.className = 'sel';
    // but that doesn't seem to work.
    if (currentColor == colorToId[i][0]) {
      elt.style.border = '2px solid #224499';
    } else {
      elt.style.border = '2px solid white';
    }
  }
}

/**
 * TODO: document.
 *
 * @param {gamebuilder.games.go.BoardNxN} board The board controller.
 * @param {HTMLTableElement} table The visible board.
 * @param {string} pos Position on the board where to place the piece.
 */
function placePiece(board, table, pos) {
  if (gamebuilder.util.isDefAndNotNull(currentColor)) {
    board.setPieceColorAtPos(currentColor, pos);
  } else {
    board.erasePieceAtPos(pos);
  }
  board.update(table);
  updateNextPiece();
}

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
    currentColor = gamebuilder.games.go.PieceColor.BLACK;
  } else if (which == 'w') {
    currentColor = gamebuilder.games.go.PieceColor.WHITE;
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
demo.go.displayGoBoard = function() {
  // Create and display the board.
  var board = new gamebuilder.games.go.Board9();
  board.setImagePath('../data/images/go');
  var table = board.createHtmlTable();
  document.getElementById('board').appendChild(table);
  
  // Setup pieces in the legend.
  for (var i = 0; i < colorToId.length; ++i) {
    var color = colorToId[i][0];
    var piece = null;
    if (gamebuilder.util.isDefAndNotNull(color)) {
      piece = new gamebuilder.games.go.Piece(color);
    }
    var img = board.imageForPiece(piece);
    img.onclick = createColorChangeClosure(color);
    document.getElementById(colorToId[i][1]).appendChild(img);
  }

  board.update(table);
  board.bindEmptyCells(table, placePiece);
  updateNextPiece();
  
  document.onkeypress = captureKeypress;
};
