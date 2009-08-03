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

var util = gamebuilder.util;
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
  /** @type {go.PieceColor} */
  this.color_ = color;
};

/**
 * @constructor
 */
go.BoardNxN = function() {
};
util.inherits(go.BoardNxN, games.BoardNxN);

/**
 * 
 *
 * @param {go.PieceColor} color
 * @param {string} location, e.g. 'c10' or 'f9'
 */
go.BoardNxN.prototype.placePieceColor = function(color, pos) {
  try {
    var coords = games.stringPosToCoords(pos);
    this.board_[coords[0]][coords[1]] = new go.Piece(color);
  } catch (e) {
    throw new Error(util.sprintf('Invalid coords: (%s, %s)', coords[0], coords[1]));
  }
};

// ==============================================================================
// 19x19 Go board
// ==============================================================================

/**
 * @param {string} image_path
 * @constructor
 */
go.Board = function(image_path) {
  games.BoardNxN.call(this, 19);
  /** @type {string} */
  this. image_path_ = image_path;
};
util.inherits(go.Board, go.BoardNxN);

go.Board.prototype.imageForPiece_ = function(piece) {
  var image = document.createElement('img');
  if (util.isDefAndNotNull(piece)) {
    if (piece.color_ == go.PieceColor.BLACK) {
      image.src = util.sprintf('%s/black.png', this.image_path_);
    } else if (piece.color_ == go.PieceColor.WHITE) {
      image.src = util.sprintf('%s/white.png', this.image_path_);
    } else {
      throw new Error('Invalid color of piece: ' + piece.color_);
    }
  } else {
    image.src = util.sprintf('%s/clear.png', this.image_path_);
  }
  return image;
};

/**
 * Creates an HTML-visible version of the underlying board and returns it.
 *
 * @return {HTMLTableElement} The table containing the contents of the go board.
 */
go.Board.prototype.create = function() {
  var table = document.createElement('table');
  table.cellSpacing = 0;
  table.cellPadding = 0;
  table.style.border = '0';
  for (var j = this.board_[0].length - 1; j >= 0; --j) {
    var row = table.insertRow(-1);
    for (var i = 0; i < this.board_.length; ++i) {
      // TODO: can we use the shorter version?
      // var cell = row.insertCell(0);
      var cell = document.createElement('td');
      var bg_image = '';
      // Prefix (upper/center/bottom)
      if (j == this.board_[i].length - 1) {
        bg_image = 'upper-';
      } else if (j == 0) {
        bg_image = 'bottom-';
      } else {
        bg_image = 'center-';
      }
      // Suffix (left/middle/right)
      if (i == 0) {
        bg_image += 'left';
      } else if (i == this.board_.length - 1) {
        bg_image += 'right';
      } else {
        bg_image += 'middle';
      }
      bg_image += '.png';
      cell.style.backgroundImage = util.sprintf('url(%s/%s)', this.image_path_, bg_image);
      // TODO: replace with CSS classes.
      cell.style.width = cell.style.height = '50px';
      cell.appendChild(this.imageForPiece_(this.board_[i][j]));
      row.appendChild(cell);
    }
  }

  return table;
};

/**
 *
 *
 * @param {HTMLTableElement} table The table containing the Go board to be
 * updated.  It must match in size the underlying board that this class owns.
 */
go.Board.prototype.update = function(table) {
  // TODO: check that the table size matches the board size.
  if (this.board_.length != table.rows.length ||
      this.board_[0].length != table.rows[0].childNodes.length) {
    throw new Error(
        util.sprintf('Incompatible sizes: board (%s x %s) vs. table (%s x %s)',
                     this.board_.length, this.board_[0].length,
                     table.rows.length, table.rows[0].childNodes.length));
  }

  for (var r = 0; r < table.rows.length; ++r) {
    var row = table.rows[r];
    for (var c = 0; c < row.childNodes.length; ++c) {
      var cell = row.childNodes[c];
      var piece = null;
      var j = table.rows.length - r - 1;
      try {
        piece = this.board_[c][j];
      } catch (e) {
        throw new Error(util.sprintf('Invalid coords: (%s, %s)', c, j));
      }
      cell.innerHTML = '';
      cell.appendChild(this.imageForPiece_(piece));
    }
  }
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
util.inherits(go.Board13, go.BoardNxN);

// ==============================================================================
// 9x9 Go board
// ==============================================================================

/**
 * @constructor
 */
go.Board9 = function() {
  games.BoardNxN.call(this, 9);
};
util.inherits(go.Board9, go.BoardNxN);
