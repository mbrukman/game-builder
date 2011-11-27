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
goog.require('gamebuilder.games.chess.theme');

/**
 * TODO: document.
 *
 * @export
 */
demo.chess.showFenDiagrams = function() {
  var basename = document.location.href.replace(/[^\/]*$/, '');
  var my_theme = new gamebuilder.games.chess.theme.Theme(
    ['light_sq', 'dark_sq'],
    basename + '../data/images/chess',
    [['pawn_w.png', 'knight_w.png', 'bishop_w.png',
      'rook_w.png', 'queen_w.png', 'king_w.png'],
     ['pawn_b.png', 'knight_b.png', 'bishop_b.png',
      'rook_b.png', 'queen_b.png', 'king_b.png']],
    'piece_img');
  
  gamebuilder.games.chess.theme.DEFAULT_THEME = my_theme;
  gamebuilder.games.chess.FEN.parseAllFenInDocument();
};
