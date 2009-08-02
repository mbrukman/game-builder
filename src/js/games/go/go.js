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

var games = gamebuilder.games;
var go = games.go = {};

go.PieceColor = {
  BLACK: 0,
  WHITE: 1
};

/**
 * @constructor
 * @param {go.PieceColor} color
 */
go.Piece = function(color) {
  this.color_ = color;
};

/**
 * @constructor
 */
go.BoardNxN = function() {
};
gamebuilder.util.inherits(go.BoardNxN, games.BoardNxN);

/**
 * @param {go.PieceColor} color
 * @param {string} location, e.g. 'c10' or 'f9'
 */
go.BoardNxN.prototype.placePiece = function(color, location) {
  var coords = games.stringPosToCoords(location);
  this.board_[coords[0]][coords[1]] = new go.Piece(color);
};

// ==============================================================================
// 19x19 Go board
// ==============================================================================

/**
 * @constructor
 */
go.Board = function() {
  games.BoardNxN.call(this, 19);
};
gamebuilder.util.inherits(go.Board, games.BoardNxN);

/**
 * @param {string} parent_id
 * @param {string} images_path
 */
go.Board.prototype.display = function(parent_id, images_path) {
  var parent = document.getElementById(parent_id);
   
  var table = document.createElement('table');
  table.cellSpacing = 0;
  table.cellPadding = 0;
  table.style.border = '0';
  for (var i = this.board_.length - 1; i >= 0; --i) {
    var row = table.insertRow(-1);
    for (var j = 0; j < this.board_[i].length; ++j) {
      // TODO: can we use the shorter version?
      // var cell = row.insertCell(0);
      var cell = document.createElement('td');
      var bg_image = '';
      // Prefix (upper/center/bottom)
      if (i == this.board_.length - 1) {
        bg_image = 'upper-';
      } else if (i == 0) {
        bg_image = 'bottom-';
      } else {
        bg_image = 'center-';
      }
      // Suffix (left/middle/right)
      if (j == 0) {
        bg_image += 'left';
      } else if (j == this.board_[i].length - 1) { 
        bg_image += 'right';
      } else {
        bg_image += 'middle';
      }
      bg_image += '.png';
      cell.style.backgroundImage = 'url(' + images_path + '/' + bg_image + ')';
      cell.style.width = cell.style.height = '50px';

      var image = document.createElement('img');
      if (Math.random() < 0.33) {
        image.src = images_path + '/' + 'white.png';
      } else if (Math.random() < 0.66) {
        image.src = images_path + '/' + 'black.png';
      } else {
        image.src = images_path + '/' + 'clear.png';
      }
      cell.appendChild(image);
      
      row.appendChild(cell);
    }
  }

  parent.appendChild(table);
};

/**
 * @param {HTMLElement} element
 */
go.Board.prototype.update = function(element) {

};

// ==============================================================================
// 13x13 Go board
// ==============================================================================

/**
 * @constructor
 */
go.Board13 = function() {
  games.BoardNxN.call(this, 13);
};
gamebuilder.util.inherits(go.Board13, games.BoardNxN);

// ==============================================================================
// 9x9 Go board
// ==============================================================================

/**
 * @constructor
 */
go.Board9 = function() {
  games.BoardNxN.call(this, 9);
};
gamebuilder.util.inherits(go.Board9, games.BoardNxN);
