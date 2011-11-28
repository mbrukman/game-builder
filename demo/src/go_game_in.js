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
// Demo usage of the Go game library.

goog.provide('demo.go.game');

goog.require('gamebuilder.games.go');
goog.require('gamebuilder.games.go.game');
goog.require('gamebuilder.games.go.ui');


/**
 * @private
 */
var colorToId = [
  [gamebuilder.games.go.PieceColor.BLACK, 'blackPiece'],
  [gamebuilder.games.go.PieceColor.WHITE, 'whitePiece']
];

/**
 * Updates the outline around the to-be-placed-next piece in the UI.
 *
 * @private
 */
function updateNextMovePiece_(color, pos) {
  for (var i = 0; i < colorToId.length; ++i) {
    var elt = document.getElementById(colorToId[i][1]);
    elt.className = (color != colorToId[i][0]) ? 'sel' : 'notsel';
  }
}

/**
 * Initializes and starts a simple Go game.
 *
 * @export
 */
demo.go.game.playGoGame = function() {
  // Create a new 9x9 Go game and display the board.
  var game = new gamebuilder.games.go.game.GoGame9();
  game.addMoveCallback(updateNextMovePiece_);

  var board_ui = game.board_ui();
  board_ui.setImagePath('../data/images/go');
  document.getElementById('board').appendChild(board_ui.getHtmlTable());

  // Setup pieces in the legend.
  for (var i = 0; i < colorToId.length; ++i) {
    var color = colorToId[i][0];
    var piece = new gamebuilder.games.go.Piece(color);
    var img = board_ui.newImageForPiece(piece);
    document.getElementById(colorToId[i][1]).appendChild(img);
  }
  // Pretend that WHITE just made a move so that we correctly start with BLACK.
  updateNextMovePiece_(gamebuilder.games.go.PieceColor.WHITE, '');

  game.init();
};
