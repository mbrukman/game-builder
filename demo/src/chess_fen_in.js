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
goog.require('goog.Uri');

/**
 * TODO: document.
 *
 * @export
 */
demo.chess.showFenDiagrams = function() {
  var basename = document.location.href.replace(/[^\/]*$/, '');

  var THEME_MERIDA = new gamebuilder.games.chess.Theme(
    ['light_sq', 'dark_sq'],
    basename + '../data/images/chess/merida',
    [['pawn_w.png', 'knight_w.png', 'bishop_w.png',
      'rook_w.png', 'queen_w.png', 'king_w.png'],
     ['pawn_b.png', 'knight_b.png', 'bishop_b.png',
      'rook_b.png', 'queen_b.png', 'king_b.png']],
    'piece_img');

  var THEME_WIKIMEDIA = new gamebuilder.games.chess.Theme(
    ['light_sq', 'dark_sq'],
    basename + '../data/images/chess/wikimedia',
    [['pawn_w.png', 'knight_w.png', 'bishop_w.png',
      'rook_w.png', 'queen_w.png', 'king_w.png'],
     ['pawn_b.png', 'knight_b.png', 'bishop_b.png',
      'rook_b.png', 'queen_b.png', 'king_b.png']],
    'piece_img');

  var THEMES = { 'merida': THEME_MERIDA,
                 'wikimedia': THEME_WIKIMEDIA };

  var uri = goog.Uri.parse(window.location, false);
  var theme_name = uri.getParameterValue('theme') || 'merida';
  
  gamebuilder.games.chess.Theme.DEFAULT_THEME =
      THEMES[theme_name] || THEME_MERIDA;
  gamebuilder.games.chess.FEN.parseAllFenInDocument();
};
