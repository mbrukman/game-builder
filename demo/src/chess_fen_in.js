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
// Demo using the Chess FEN diagram display API.

goog.provide('demo.chess');

goog.require('gamebuilder.games.chess.FEN');
goog.require('gamebuilder.games.chess.Theme');
goog.require('gamebuilder.games.chess.ui');
goog.require('goog.Uri');

/**
 * TODO: document.
 *
 * @param {string} basePath
 * @param {string} pieceStyle
 * @return {gamebuilder.games.chess.Theme}
 */
function chessTheme(basePath, pieceStyle) {
  return new gamebuilder.games.chess.Theme(
    { 'tableClass': 'chess',
      'squareClasses': ['light_sq', 'dark_sq'],
      'numberCellClass': 'number',
      'letterCellClass': 'letter',
      'imagesRoot': basePath + '../data/images/chess/' + pieceStyle,
      'pieceImages': [['pawn_w.png', 'knight_w.png', 'bishop_w.png',
                       'rook_w.png', 'queen_w.png', 'king_w.png'],
                      ['pawn_b.png', 'knight_b.png', 'bishop_b.png',
                       'rook_b.png', 'queen_b.png', 'king_b.png']],
      'pieceImgClass': 'piece_img' });
}

/**
 * Parses a FEN diagram and attaches it to the given node.
 *
 * @param {string} fen
 * @param {Element} container
 * @export
 */
demo.chess.parseAndDisplayFen = function(fen, container) {
  var errors = [];
  var board = gamebuilder.games.chess.FEN.parse(fen, errors);
  if (board != null) {
    container.innerHTML = '';
    gamebuilder.games.chess.ui.displayHtml(board, container);
  } else {
    container.innerHTML = 'Error: ' + errors.join('<br>');
  }
};

/**
 * Parses and displays all FEN diagrams in the HTML document.
 *
 * @export
 */
demo.chess.showFenDiagrams = function() {
  var basePath = document.location.href.replace(/[^\/]*$/, '');

  var THEME_MERIDA = chessTheme(basePath, 'merida');
  var THEME_WIKIMEDIA = chessTheme(basePath, 'wikimedia');
  var THEMES = { 'merida': THEME_MERIDA,
                 'wikimedia': THEME_WIKIMEDIA };

  var uri = goog.Uri.parse(window.location, false);
  var theme_name = uri.getParameterValue('theme') || 'merida';
  
  gamebuilder.games.chess.Theme.DEFAULT_THEME =
      THEMES[theme_name] || THEME_MERIDA;

  // Parse and display all FEN diagrams in the document as view-only boards.
  var elts = document.getElementsByName('gamebuilder_chess_fen');
  if (!gamebuilder.util.isDefAndNotNull(elts)) {
    return;
  }
  for (var f = 0; f < elts.length; ++f) {
    var container = elts[f];
    demo.chess.parseAndDisplayFen(container.innerHTML, container);
  }
};
