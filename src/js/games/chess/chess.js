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

gamebuilder.games.chess = {};

/**
 * @param {gamebuilder.games.chess.PieceColor} color
 * @param {gamebuilder.games.chess.PieceType} type
 * @constructor
 */
gamebuilder.games.chess.Piece = function(color, value) {
  switch (color) {
    case gamebuilder.games.chess.Piece.BLACK:
    case gamebuilder.games.chess.Piece.WHITE:
      break;
    default:
      throw new Error('Invalid piece color: ' + color);
  }
  /**
   * @type {string}
   * @private
   */
  this.color_ = color;

  switch (value) {
    case gamebuilder.games.chess.Piece.PAWN:
    case gamebuilder.games.chess.Piece.KNIGHT:
    case gamebuilder.games.chess.Piece.BISHOP:
    case gamebuilder.games.chess.Piece.ROOK:
    case gamebuilder.games.chess.Piece.QUEEN:
    case gamebuilder.games.chess.Piece.KING:
      break;
    default:
      throw new Error('Invalid piece value: ' + value);
  }
  /**
   * @type {string}
   * @private
   */
  this.value_ = value;
};

/**
 * @return {string}
 */
gamebuilder.games.chess.Piece.prototype.color = function() {
  return this.color_;
};

/**
 * @return {string}
 */
gamebuilder.games.chess.Piece.prototype.value = function() {
  return this.value_;
};

// Colors
gamebuilder.games.chess.Piece.BLACK = 'black';
gamebuilder.games.chess.Piece.WHITE = 'white';

// Piece values
gamebuilder.games.chess.Piece.PAWN   = 'pawn';
gamebuilder.games.chess.Piece.KNIGHT = 'knight';
gamebuilder.games.chess.Piece.BISHOP = 'bishop';
gamebuilder.games.chess.Piece.ROOK   = 'rook';
gamebuilder.games.chess.Piece.QUEEN  = 'queen';
gamebuilder.games.chess.Piece.KING   = 'king';

/**
 * @param {string} piece_value
 */
gamebuilder.games.chess.Piece.pieceToLowerCaseChar = function(piece_value) {
  // Only storing one version since the difference is just case
  switch (piece_value) {
    case gamebuilder.games.chess.Piece.PAWN  : return 'p';
    case gamebuilder.games.chess.Piece.KNIGHT: return 'n';
    case gamebuilder.games.chess.Piece.BISHOP: return 'b';
    case gamebuilder.games.chess.Piece.ROOK  : return 'r';
    case gamebuilder.games.chess.Piece.QUEEN : return 'q';
    case gamebuilder.games.chess.Piece.KING  : return 'k';
    default:
      throw new Error('Invalid piece value: ' + piece_value);
  }
};

gamebuilder.games.chess.Piece.prototype.toCharCode = function() {
  var char_code = gamebuilder.games.chess.Piece.pieceToLowerCaseChar(this.value_);
  if (this.color_ == gamebuilder.games.chess.Piece.WHITE) {
    return char_code.toUpperCase();
  } else {
    return char_code.toLowerCase();
  }
};

gamebuilder.games.chess.Piece.lowerCaseCharToPiece = function(char_code) {
  switch (char_code) {
    case 'p': return gamebuilder.games.chess.Piece.PAWN;
    case 'n': return gamebuilder.games.chess.Piece.KNIGHT;
    case 'b': return gamebuilder.games.chess.Piece.BISHOP;
    case 'r': return gamebuilder.games.chess.Piece.ROOK;
    case 'q': return gamebuilder.games.chess.Piece.QUEEN;
    case 'k': return gamebuilder.games.chess.Piece.KING;
    default:
      throw new Error('Invalid piece char code: ' + char_code);
  }
};

gamebuilder.games.chess.Piece.createFromCharCode = function(char_code) {
  var color = (char_code == char_code.toLowerCase()) ?
      gamebuilder.games.chess.Piece.BLACK : gamebuilder.games.chess.Piece.WHITE;
  var value = gamebuilder.games.chess.Piece.lowerCaseCharToPiece(char_code.toLowerCase());
  return new gamebuilder.games.chess.Piece(color, value);
};

gamebuilder.games.chess.SquareColor = {};
gamebuilder.games.chess.SquareColor.DARK  = 8;
gamebuilder.games.chess.SquareColor.LIGHT = 9;

/**
 * @param {gamebuilder.games.chess.SquareColor} color
 * @param {gamebuilder.games.chess.Piece?} piece
 * @constructor
 */
gamebuilder.games.chess.BoardSquare = function(color, opt_piece) {
  /**
   * @type {gamebuilder.games.chess.SquareColor}
   */
  this.color_ = color;
  /**
   * @type {gamebuilder.games.chess.Piece}
   */
  this.piece_ = opt_piece;
};

gamebuilder.games.chess.BoardSquare.prototype.color = function() {
  return this.color_;
};

gamebuilder.games.chess.BoardSquare.prototype.getPiece = function() {
  return this.piece_;
};

gamebuilder.games.chess.BoardSquare.prototype.setPiece = function(piece) {
  this.piece_ = piece;
};

// ==============================================================================
// Chess board: generic: rectangular
// ==============================================================================

/**
 * @param {number} m
 * @param {number} n
 * @constructor
 */
gamebuilder.games.chess.BoardMxN = function(m, n) {
  /**
   * @type {Array.<Array.<gamebuilder.games.chess.Piece>>}
   */
  this.board_ = [];
  for (var i = 0; i < n; ++i) {
    this.board_[i] = [];
    for (var j = 0; j < m; ++j) {
      this.board_[i][j] = new gamebuilder.games.chess.BoardSquare((i + j) % 2
          ? gamebuilder.games.chess.SquareColor.LIGHT
          : gamebuilder.games.chess.SquareColor.DARK,
          null);
    }
  }
};

gamebuilder.games.chess.BoardMxN.prototype.numRows = function() {
  return this.board_.length;
};

gamebuilder.games.chess.BoardMxN.prototype.isRowValid = function(row) {
  return (row >= 0) && (row <= this.numRows());
};

gamebuilder.games.chess.BoardMxN.prototype.isCoordValid = function(row, col) {
  return this.isRowValid(row) && (col >= 0) && (col <= this.board_[row].length);
};

gamebuilder.games.chess.BoardMxN.prototype.setPiece = function(row, col, piece) {
  if (this.isCoordValid(row, col)) {
    this.board_[row][col].setPiece(piece);
  } else {
    throw new Error('Invalid coordinates for setPiece: (' +
                    row + ', ' + col + ')');
  }
};

gamebuilder.games.chess.BoardMxN.prototype.getPiece = function(row, col) {
  if (isCoordValid(row, col)) {
    return this.board_[row][col].getPiece();
  }
  return null;
};

/**
 * Draws the board in text mode, attaching it to the parent node passed in.
 *
 * @param {Node} node
 */
gamebuilder.games.chess.BoardMxN.prototype.displayText = function(node) {
  var MARGIN = ' ';
  var text = '';
  // Top border
  text += MARGIN + '+'
  for (var i = 0, e = this.board_.length; i < e; ++i) {
    text += '-+';
  }
  // Each row
  for (var i = 0, e = this.board_.length; i < e; ++i) {
    // The row number
    text += '\n' + (this.board_.length - i) + '|';
    for (var j = 0; j < this.board_[i].length; ++j) {
      // The cell contents
      var piece = this.board_[i][j].getPiece();
      if (gamebuilder.util.isDefAndNotNull(piece)) {
        text += piece.toCharCode();
      } else {
        text += ' ';
      }
      text += '|';
    }
    // Horizontal separator
    text += '\n' + MARGIN + '+';
    for (var k = 0, e = this.board_[k].length; k < e; ++k) {
      text += '-+';
    }
  }

  // Bottom labels
  text += '\n' + MARGIN + ' ';  // Spacer for vertical border
  for (var i = 0, e = this.board_.length; i < e; ++i) {
    text += String.fromCharCode('a'.charCodeAt(0) + i) + ' ';
  }

  var text_node = document.createTextNode(text);
  var pre = document.createElement('pre');
  pre.appendChild(text_node);
  node.appendChild(pre);
};

/**
 * Draws the board in HTML, attaching it to the parent node passed in.
 *
 * @param {Node} node
 */
gamebuilder.games.chess.BoardMxN.prototype.displayHtml = function(node) {
  // TODO: create a table which contains the board and row/column labels
  // separately, so we can apply individual styles to each (e.g., border).
  var table = document.createElement('table');
  table.style.border = '';
  table.style.cellPadding = table.cellSpacing = 0;
  var theme = gamebuilder.games.chess.Theme.DEFAULT_THEME;
  for (var i = 0, e = this.board_.length; i < e; ++i) {
    var row = document.createElement('tr');
    table.appendChild(row);
    // The row number
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode(this.board_.length - i));
    cell.valign = 'middle';
    row.appendChild(cell);

    for (var j = 0; j < this.board_[i].length; ++j) {
      var piece = this.board_[i][j].getPiece();
      var cell = document.createElement('td');
      cell.className = theme.getSquareClass(this.board_[i][j].color());

      if (gamebuilder.util.isDefAndNotNull(piece)) {
        var image = document.createElement('img');
        image.src = theme.getPieceImage(piece.color(), piece.value());
        image.className = theme.getPieceImageClass();
        cell.appendChild(image);
      }

      row.appendChild(cell);
    }
  }

  // Bottom labels
  var bottom_labels_row = document.createElement('tr');
  // Empty cell to compensate for the row number labels
  bottom_labels_row.appendChild(document.createElement('td'));
  for (var i = 0, e = this.board_.length; i < e; ++i) {
    var cell = document.createElement('td');
    var text = String.fromCharCode('a'.charCodeAt(0) + i);
    cell.appendChild(document.createTextNode(text));
    cell.align = 'center';
    bottom_labels_row.appendChild(cell);
  }
  table.appendChild(bottom_labels_row);
  node.appendChild(table);
};

// ==============================================================================
// Chess board: generic: square
// ==============================================================================

/**
 * @param {number} n
 * @constructor
 */
gamebuilder.games.chess.BoardNxN = function(n) {
  gamebuilder.games.chess.BoardMxN.call(this, n, n);
};
gamebuilder.util.inherits(gamebuilder.games.chess.BoardNxN,
                          gamebuilder.games.chess.BoardMxN);

// ==============================================================================
// Chess board: traditional
// ==============================================================================

/**
 * @constructor
 */
gamebuilder.games.chess.Board = function() {
  gamebuilder.games.chess.BoardNxN.call(this, 8);
};
gamebuilder.util.inherits(gamebuilder.games.chess.Board,
                          gamebuilder.games.chess.BoardNxN);
