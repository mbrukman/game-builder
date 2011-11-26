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

goog.provide('gamebuilder.games.go');

goog.require('gamebuilder.games');


/**
 * TODO: document.
 *
 * @constructor
 */
gamebuilder.games.go.PieceColor = function(color) {
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;
};

/** type {gamebuilder.games.go.PieceColor} */
gamebuilder.games.go.PieceColor.WHITE =
    new gamebuilder.games.go.PieceColor('white');

/** type {gamebuilder.games.go.PieceColor} */
gamebuilder.games.go.PieceColor.BLACK =
    new gamebuilder.games.go.PieceColor('black');


/**
 * TODO: document.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @constructor
 * @extends {gamebuilder.games.Piece}
 */
gamebuilder.games.go.Piece = function(color) {
  /**
   * @type {gamebuilder.games.go.PieceColor}
   * @private
   */
  this.color_ = color;
};

goog.inherits(gamebuilder.games.go.Piece,
              gamebuilder.games.Piece);

/**
 * TODO: document.
 *
 * @return {gamebuilder.games.go.PieceColor} The color of this piece.
 */
gamebuilder.games.go.Piece.prototype.color = function() {
  return this.color_;
};


/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.BoardLocation}
 */
gamebuilder.games.go.BoardLocation = function() {
  /**
   * @type {?gamebuilder.games.go.Piece}
   * @protected
   */
  this.piece_ = null;
};

/**
 * Sets a piece at this board location.
 *
 * @param {?gamebuilder.games.go.Piece} opt_piece
 */
gamebuilder.games.go.BoardLocation.prototype.setPiece = function(opt_piece) {
  this.piece_ = opt_piece || null;
};

/**
 * Gets a piece at this board location, if any.
 *
 * @return {?gamebuilder.games.go.Piece} Returns the piece, if any.
 */
gamebuilder.games.go.BoardLocation.prototype.getPiece = function() {
  return this.piece_;
};

/**
 * TODO: document.
 *
 * @param {number} m
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.BoardMxN}
 */
gamebuilder.games.go.BoardMxN = function(m, n) {
  gamebuilder.games.BoardMxN.call(this, m, n);

  /**
   * A redeclaration of a Board from the inherited {@code board_} which
   * originally contained instances of {@code gamebuilder.games.BoardLocation}.
   *
   * @type {Array.<Array.<gamebuilder.games.go.BoardLocation>>}
   * @protected
   */
  this.board_ = [];

  for (var i = 0; i < n; ++i) {
    this.board_[i] = [];
    for (var j = 0; j < m; ++j) {
      var loc = new gamebuilder.games.go.BoardLocation();
      //this.setLoc([i, j], loc); 
      this.board_[i][j] = loc;
    }
  }

  /**
   * @type {string}
   * @private
   */
  this.image_path_ = 'Error: call setImagePath() to set the path';
};

goog.inherits(gamebuilder.games.go.BoardMxN, gamebuilder.games.BoardMxN);

/**
 * Sets the internal path to image tiles used to construct a visible
 * representation of the board.
 *
 * @param {string} image_path The directory containing board and piece tiles.
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.setImagePath = function(image_path) {
  this.image_path_ = image_path;
};

/**
 * Places a new piece with a given color at the specified position.
 *
 * @param {gamebuilder.games.go.PieceColor} color
 * @param {string} pos string location, e.g. 'c10' or 'f9'
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.setPieceColorAtPos =
    function(color, pos) {
  this.setPieceAtPos(new gamebuilder.games.go.Piece(color), pos);
};

/**
 * TODO: document.
 *
 * @param {Array.<number>} coords A pair of numbers representing the coordinates.
 * @return {?gamebuilder.games.go.Piece} The piece at the coords, if any, or null.
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.getPieceAtCoords = function(coords) {
  var loc = /** @type {gamebuilder.games.go.BoardLocation} */ this.getLoc(coords);
  var piece = loc.getPiece();
  if (gamebuilder.util.isDefAndNotNull(piece)) {
    return piece;
  }
  return null;
}

/**
 * setImagePath() must have been called before using this function.
 *
 * @param {gamebuilder.games.go.Piece} piece
 * @return {string} The path to an image corresponding to the given piece.
 *     Passing in null will return a clear transparent image, which can be used
 *     to capture user clicks for processing.
 * @export
 */
gamebuilder.games.go.BoardMxN.prototype.imagePathForPiece =
    function(piece) {
  if (gamebuilder.util.isDefAndNotNull(piece)) {
    if (piece.color() == gamebuilder.games.go.PieceColor.BLACK) {
      return gamebuilder.util.sprintf('%s/black.png', this.image_path_);
    } else if (piece.color_ == gamebuilder.games.go.PieceColor.WHITE) {
      return gamebuilder.util.sprintf('%s/white.png', this.image_path_);
    } else {
      throw new Error('Invalid color of piece: ' + piece.color_);
    }
  } else {
    return gamebuilder.util.sprintf('%s/clear.png', this.image_path_);
  }
};

/**
 * TODO: document.
 *
 * @param {gamebuilder.games.go.Piece} piece
 * @return {Element} path to image for given piece.
 */
gamebuilder.games.go.BoardMxN.prototype.imageForPiece = function(piece) {
  var image = document.createElement('img');
  image.src = this.imagePathForPiece(piece);
  image.style.width = image.style.height = '50px';
  return image;
};

/**
 * Creates an HTML-visible version of the underlying board and returns it.
 *
 * @return {Element} The table containing the contents of the go board.
 */
gamebuilder.games.go.BoardMxN.prototype.createHtmlTable = function() {
  var table = document.createElement('table');
  table.cellSpacing = 0;
  table.cellPadding = 0;
  table.style.border = '0';
  for (var j = this.numRows() - 1; j >= 0; --j) {
    var row = table.insertRow(-1);
    for (var i = 0; i < this.board_.length; ++i) {
      // TODO: can we use the shorter version?
      // var cell = row.insertCell(0);
      var cell = document.createElement('td');
      var bg_image = '';
      // Prefix (upper/center/bottom)
      if (j == this.numCols() - 1) {
        bg_image = 'upper-';
      } else if (j == 0) {
        bg_image = 'bottom-';
      } else {
        bg_image = 'center-';
      }
      // Suffix (left/middle/right)
      if (i == 0) {
        bg_image += 'left';
      } else if (i == this.numRows() - 1) {
        bg_image += 'right';
      } else {
        bg_image += 'middle';
      }
      bg_image += '.png';
      cell.style.backgroundImage =
          gamebuilder.util.sprintf('url(%s/%s)', this.image_path_, bg_image);
      // TODO: replace with CSS classes.
      cell.style.width = cell.style.height = '50px';
      cell.appendChild(this.imageForPiece(this.getPieceAtCoords([i, j])));
      row.appendChild(cell);
    }
  }

  return table;
};

/**
 * Converts the coordinates on the visible table to the underlying
 * gamebuilder.games.go.Board object indices.
 *
 * @param {Array.<number>} table_coords Coordinates relative to the visible
 *     table.
 */
gamebuilder.games.go.BoardMxN.prototype.tableToBoardCoords =
    function(table_coords) {
  var row = table_coords[0];
  var col = table_coords[1]
  return [col, this.numRows() - row - 1];
};

/**
 * Updates the displayed table to reflect the underlying board, by adding or
 * removing pieces appropriately.
 *
 * @param {Element} table The table containing the Go board to be
 * updated.  It must match in size the underlying board that this class owns.
 */
gamebuilder.games.go.BoardMxN.prototype.update = function(table) {
  // TODO: check that the table size matches the board size.
  if (this.numRows() != table.rows.length ||
      this.numCols() != table.rows[0].childNodes.length) {
    throw new Error(
        gamebuilder.util.sprintf(
            'Incompatible sizes: board (%s x %s) vs. table (%s x %s)',
            this.numRows(), this.numCols(),
            table.rows.length, table.rows[0].childNodes.length));
  }

  for (var r = 0; r < table.rows.length; ++r) {
    var row = table.rows[r];
    for (var c = 0; c < row.childNodes.length; ++c) {
      var cell = row.childNodes[c];
      var image = cell.childNodes[0];
      var piece = this.getPieceAtCoords(this.tableToBoardCoords([r, c]));

      if (image.src != this.imagePathForPiece(piece)) {
        image.src = this.imagePathForPiece(piece);
      }
    }
  }
};

/**
 * TODO: document.
 *
 * @return {Function}
 */
function createImageClickClosure(callback, board, table, pos) {
  return function() {
    callback(board, table, pos);
  };
}

/**
 * Binds the supplied closure to be run on a click on any empty cell on the board.
 *
 * @param {Element} table The visible board.
 * @param {Function} callback A function that accepts the board and location of
 *     the piece that was clicked on.
 */
gamebuilder.games.go.BoardMxN.prototype.bindEmptyCells = function(table,
                                                                  callback) {
  var board = this;
  for (var r = 0; r < table.rows.length; ++r) {
    var row = table.rows[r];
    for (var c = 0; c < row.childNodes.length; ++c) {
      var cell = row.childNodes[c];
      var image = cell.childNodes[0];
      var coords = this.tableToBoardCoords([r, c]);
      var pos = gamebuilder.games.coordsToStringPos(coords);
      if (gamebuilder.util.isNotDefOrNull(this.getPieceAtCoords(coords))) {
        image.onclick = createImageClickClosure(callback, board, table, pos);
      }
    }
  }
};


// =============================================================================
// NxN Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @param {number} n
 * @constructor
 * @extends {gamebuilder.games.go.BoardMxN}
 */
gamebuilder.games.go.BoardNxN = function(n) {
  gamebuilder.games.go.BoardMxN.call(this, n, n);
};
goog.inherits(gamebuilder.games.go.BoardNxN, gamebuilder.games.go.BoardMxN);

// =============================================================================
// 19x19 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board19 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 19);
};
goog.inherits(gamebuilder.games.go.Board19, gamebuilder.games.go.BoardNxN);

// =============================================================================
// 13x13 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board13 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 13);
};
goog.inherits(gamebuilder.games.go.Board13, gamebuilder.games.go.BoardNxN);

// =============================================================================
// 9x9 Go board
// =============================================================================

/**
 * TODO: document.
 *
 * @constructor
 * @extends {gamebuilder.games.go.BoardNxN}
 */
gamebuilder.games.go.Board9 = function() {
  gamebuilder.games.go.BoardNxN.call(this, 9);
};
goog.inherits(gamebuilder.games.go.Board9, gamebuilder.games.go.BoardNxN);
