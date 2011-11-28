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
// Displaying and interacting with Go and Go-like boards.

goog.provide('gamebuilder.games.go.ui');

goog.require('gamebuilder.games.go');


/**
 * Creates a UI handler for a Go-like board.
 *
 * @param {gamebuilder.games.go.BoardMxN} board Accept any MxN board.
 * @constructor
 */
gamebuilder.games.go.ui.BoardUI = function(board) {
  /**
   * @type {gamebuilder.games.go.BoardMxN}
   * @private
   */
  this.board_ = board;

  /**
   * The HTML table representing this board.
   *
   * @type {Element}
   * @private
   */
  this.table_ = document.createElement('table');

  /**
   * Whether we have fully initialized the HTML representation of this board.
   *
   * @type {boolean}
   * @private
   */
  this.initialized_ = false;

  /**
   * @type {string}
   * @private
   */
  this.image_path_ = '';
};

/**
 * Sets the internal path to image tiles used to construct a visible
 * representation of the board.
 *
 * @param {string} image_path The directory containing board and piece tiles.
 * @export
 */
gamebuilder.games.go.ui.BoardUI.prototype.setImagePath = function(image_path) {
  this.image_path_ = image_path;
};

/**
 * setImagePath() must have been called before using this function.
 *
 * @param {gamebuilder.games.go.Piece} piece
 * @return {string} The path to an image corresponding to the given piece.
 *     Passing in null will return a clear transparent image, which can be used
 *     to capture user clicks for processing.
 * @export
 */
gamebuilder.games.go.ui.BoardUI.prototype.imagePathForPiece =
    function(piece) {
  if (gamebuilder.util.isDefAndNotNull(piece)) {
    if (piece.color() == gamebuilder.games.go.PieceColor.BLACK) {
      return gamebuilder.util.sprintf('%s/black.png', this.image_path_);
    } else if (piece.color() == gamebuilder.games.go.PieceColor.WHITE) {
      return gamebuilder.util.sprintf('%s/white.png', this.image_path_);
    } else {
      throw new Error('Invalid color of piece: ' + piece.color());
    }
  } else {
    return gamebuilder.util.sprintf('%s/clear.png', this.image_path_);
  }
};

/**
 * TODO: document.
 *
 * @param {gamebuilder.games.go.Piece} piece
 * @return {Element} HTML <img> element for the piece.
 */
gamebuilder.games.go.ui.BoardUI.prototype.newImageForPiece = function(piece) {
  var image = document.createElement('img');
  image.src = this.imagePathForPiece(piece);
  image.style.width = image.style.height = '50px';
  return image;
};

/**
 * Initializes the display of the HTML table.
 */
gamebuilder.games.go.ui.BoardUI.prototype.init = function() {
  if (this.initialized_) {
    return;
  } else if (this.image_path_ == '') {
    throw new Error('Error: call go.BoardUI.setImagePath() prior to ' +
                    'calling go.BoardUI.init()');
  }

  var board = this.board_;
  var table = this.table_;

  table.cellSpacing = 0;
  table.cellPadding = 0;
  table.style.border = '0';

  var rows = board.numRows();
  var cols = board.numCols();

  for (var j = rows - 1; j >= 0; --j) {
    var row = table.insertRow(-1);
    for (var i = 0; i < cols; ++i) {
      // TODO: can we use the shorter version?
      // var cell = row.insertCell(0);
      var cell = document.createElement('td');
      var bg_image = '';
      // Prefix (upper/center/bottom)
      if (j == cols - 1) {
        bg_image = 'upper-';
      } else if (j == 0) {
        bg_image = 'bottom-';
      } else {
        bg_image = 'center-';
      }
      // Suffix (left/middle/right)
      if (i == 0) {
        bg_image += 'left';
      } else if (i == rows - 1) {
        bg_image += 'right';
      } else {
        bg_image += 'middle';
      }
      bg_image += '.png';
      cell.style.backgroundImage =
          gamebuilder.util.sprintf('url(%s/%s)', this.image_path_, bg_image);
      // TODO: replace with CSS classes.
      cell.style.width = cell.style.height = '50px';
      cell.appendChild(this.newImageForPiece(board.getPieceAtCoords([i, j])));
      row.appendChild(cell);
    }
  }

  this.initialized_ = true;
};

/**
 * Returns the HTML version of the underlying board.  The table is a singleton;
 * calling this function multiple times will always return the same table.
 *
 * @return {Element} The table containing the contents of the Go board.
 */
gamebuilder.games.go.ui.BoardUI.prototype.getHtmlTable = function() {
  if (!this.initialized_) {
    this.init();
  }
  return this.table_;
};

/**
 * Converts the coordinates on the visible table to the underlying
 * gamebuilder.games.go.Board object indices.
 *
 * @param {Array.<number>} table_coords Coordinates relative to the visible
 *     table.
 */
gamebuilder.games.go.ui.BoardUI.prototype.tableToBoardCoords =
    function(table_coords) {
  var row = table_coords[0];
  var col = table_coords[1]
  return [col, this.board_.numRows() - row - 1];
};

/**
 * Updates the displayed table to reflect the underlying board, by adding or
 * removing pieces appropriately.
 */
gamebuilder.games.go.ui.BoardUI.prototype.update = function() {
  var board = this.board_;
  var table = this.table_;

  for (var r = 0; r < table.rows.length; ++r) {
    var row = table.rows[r];
    for (var c = 0; c < row.childNodes.length; ++c) {
      var cell = row.childNodes[c];
      var image = cell.childNodes[0];
      var piece = board.getPieceAtCoords(this.tableToBoardCoords([r, c]));

      if (image.src != this.imagePathForPiece(piece)) {
        image.src = this.imagePathForPiece(piece);
      }
    }
  }
};

/**
 * TODO: document.
 *
 * @param {Function} callback
 * @param {gamebuilder.games.go.ui.BoardUI} board_ui
 * @param {gamebuilder.games.go.BoardMxN} board
 * @param {string} pos
 * @return {Function}
 */
function createImageClickClosure(callback, board_ui, board, pos) {
  return function() {
    callback(board_ui, board, pos);
  };
}

/**
 * Binds the supplied closure to be run on a click on any empty cell on the board.
 *
 * @param {Function} callback A function that accepts the board and location of
 *     the piece that was clicked on.
 */
gamebuilder.games.go.ui.BoardUI.prototype.bindEmptyCells = function(callback) {
  var board = this.board_;
  var table = this.table_;

  for (var r = 0; r < table.rows.length; ++r) {
    var row = table.rows[r];
    for (var c = 0; c < row.childNodes.length; ++c) {
      var cell = row.childNodes[c];
      var image = cell.childNodes[0];
      var coords = this.tableToBoardCoords([r, c]);
      var pos = gamebuilder.games.coordsToStringPos(coords);
      if (gamebuilder.util.isNotDefOrNull(board.getPieceAtCoords(coords))) {
        image.onclick = createImageClickClosure(callback, this, board, pos);
      }
    }
  }
};
