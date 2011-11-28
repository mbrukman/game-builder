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
// Display and interact with graphical UI for Reversi.

goog.provide('gamebuilder.games.reversi.ui');

goog.require('gamebuilder.games.reversi');
goog.require('gamebuilder.games.reversi.theme');


/**
 * Creates a UI handler for a Reversi board.
 *
 * @param {gamebuilder.games.reversi.Board} board A reversi board.
 * @constructor
 */
gamebuilder.games.reversi.ui.BoardUI = function(board) {
  /**
   * @type {gamebuilder.games.reversi.Board}
   * @private
   */
  this.board_ = board;

  /**
   * The HTML table containing the margin around the inner table.
   *
   * @type {Element}
   * @private
   */
  this.outer_table_ = document.createElement('table');

  /**
   * The HTML table representing this board's contents.
   *
   * @type {Element}
   * @private
   */
  this.inner_table_ = document.createElement('table');

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

  /**
   * @type {gamebuilder.games.reversi.theme.Theme}
   * @private
   */
  this.theme_ = gamebuilder.games.reversi.theme.Theme.DEFAULT_THEME;
};

/**
 * Sets the internal path to image tiles used to construct a visible
 * representation of the board.
 *
 * @param {string} image_path The directory containing board and piece tiles.
 * @export
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.setImagePath = function(image_path) {
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
gamebuilder.games.reversi.ui.BoardUI.prototype.imagePathForPiece =
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
 * Creates and returns a new HTML element IMG to represent the given piece.
 *
 * @param {gamebuilder.games.go.Piece} piece
 * @return {Element} IMG element for the piece.
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.newImageForPiece = function(piece) {
  var image = document.createElement('img');
  image.src = this.imagePathForPiece(piece);
  image.style.width = image.style.height = '50px';
  return image;
};

/**
 * Ensure that this class was initialized prior to calling another method,
 * via calling the {@code init()} method on this class, either directly or
 * indirectly via another method that causes lazy initialization.
 *
 * Throws an exception if the class is not yet initialized.
 *
 * @param {string} method that was called incorrectly prior to initialization
 * @private
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.checkInitialized =
    function(method) {
  if (!this.initialized_) {
    throw new Error('Error: must call reversi.ui.BoardUI.init() prior to ' +
                    'calling reversi.ui.BoardUI.' + method + '()');
  }
};

/**
 * Ensure that this class was NOT initialized prior to calling another method.
 *
 * Throws an exception if the class is already initialized.
 *
 * @param {string} method that was called incorrectly after initialization
 * @private
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.checkNotInitialized =
    function(method) {
  if (this.initialized_) {
    throw new Error('Error: must call reversi.ui.BoardUI.' + method +
                    '() prior to calling reversi.ui.BoardUI.init()');
  }
};

/**
 * Set the theme for this board (must be called prior to calling {@code init()}.
 *
 * @param {gamebuilder.games.reversi.theme.Theme} theme The theme to use.
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.setTheme = function(theme) {
  this.checkNotInitialized('setTheme');
  this.theme_ = theme;
};

/**
 * Initializes the display of the HTML tables.
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.init = function() {
  if (this.initialized_) {
    return;
  } else if (this.image_path_ == '') {
    throw new Error('Error: call reversi.ui.BoardUI.setImagePath() prior to ' +
                    'calling reversi.ui.BoardUI.init()');
  }

  var board = this.board_;
  var outer_table = this.outer_table_;
  var inner_table = this.inner_table_;

  // Set the class names on the two tables.
  outer_table.className = this.theme_.outerTableClass();
  inner_table.className = this.theme_.innerTableClass();

  // Make the outer table contain the inner table with a single row and a
  // single cell.
  var outer_tr = document.createElement('tr');
  var outer_td = document.createElement('td');
  outer_table.appendChild(outer_tr);
  outer_tr.appendChild(outer_td);
  outer_td.appendChild(inner_table);

  outer_table.cellSpacing = inner_table.cellSpacing = 0;
  outer_table.cellPadding = inner_table.cellPadding = 0;

  var rows = board.numRows();
  var cols = board.numCols();

  for (var j = rows - 1; j >= 0; --j) {
    var row = inner_table.insertRow(-1);
    for (var i = 0; i < cols; ++i) {
      var cell = document.createElement('td');
      cell.className = this.theme_.innerTdClass();
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
gamebuilder.games.reversi.ui.BoardUI.prototype.getHtmlTable = function() {
  if (!this.initialized_) {
    this.init();
  }
  return this.outer_table_;
};

/**
 * Converts the coordinates on the visible table to the underlying
 * gamebuilder.games.go.Board object indices.
 *
 * @param {Array.<number>} table_coords Coordinates relative to the visible
 *     table.
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.tableToBoardCoords =
    function(table_coords) {
  var row = table_coords[0];
  var col = table_coords[1]
  return [col, this.board_.numRows() - row - 1];
};

/**
 * Updates the displayed table to reflect the underlying board, by adding or
 * removing pieces appropriately.
 */
gamebuilder.games.reversi.ui.BoardUI.prototype.update = function() {
  this.checkInitialized('update');

  var board = this.board_;
  var table = this.inner_table_;

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
 * @param {gamebuilder.games.reversi.ui.BoardUI} board_ui
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
gamebuilder.games.reversi.ui.BoardUI.prototype.bindEmptyCells = function(callback) {
  this.checkInitialized('bindEmptyCells');

  var board = this.board_;
  var table = this.inner_table_;

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
