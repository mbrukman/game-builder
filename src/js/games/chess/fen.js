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

gamebuilder.games.chess.FEN = function() {
  /**
   * @type {chess.Board}
   * @private
   */
  this.chess_board_ = new gamebuilder.games.chess.Board();
};

/**
 * Format is described here:
 * http://en.wikipedia.org/wiki/Forsyth-Edwards_Notation
 *
 * Function will attempt ...
 *
 * @param {string} fen
 * @param {Array.<string>} errors
 * @returns {boolean} true if parsed correctly; false otherwise
 */
gamebuilder.games.chess.FEN.prototype.parse = function(fen, errors) {
  fen = fen.replace(/^\s+/, '');
  if (fen.length == 0) {
    errors.push('No FEN present');
    return false;
  }
  var fen_parts = fen.split(' ');
  /*
  // We currently ignore everything but the board position, so this is
  // too strict
  if (fen_parts.length != 6) {
    return false;
  }
  */
  if (fen_parts.length < 1) {
    errors.push('FEN has no information');
    return false;
  }

  var pieces = fen_parts[0];
  // Debug!
  errors.push(pieces);
  var piece_rows = pieces.split('/');
  for (var r = 0, row; row = piece_rows[r]; ++r) {
    if (r >= this.chess_board_.length) {
      errors.push('Row ' + (r + 1) + ' is outside board size: ' +
                  this.chess_board_.length);
      return false;
    }
    var board_col = 0;
    errors.push('row: [' + row + ']');
    if (!this.chess_board_.isRowValid(r)) {
      errors.push('More data in row ' + (r + 1) +
                  ' (' + board_col + ') than the board has space (' +
                  this.chess_board_.numRows() + ')');
      return false;
    }
    for (var c = 0; c < row.length; ++c) {
      var row_char = row[c];
      // Blank squares
      if (row_char >= '1' && row_char <= '8') {
        board_col += row_char - '0';
      } else {
        var single_piece =
            gamebuilder.games.chess.Piece.createFromCharCode(row_char);
        if (gamebuilder.util.isDefAndNotNull(single_piece)) {
          this.chess_board_.setPiece(r, board_col++, single_piece);
        } else {
          errors.push('Could not parse piece "' + row_char + '"');
          return false;
        }
      }  
    }
  }

  /*
  // The rest of the fields are currently ignored
  var active_color = fen_parts[1];
  var castling = fen_parts[2];
  var en_passant = fen_parts[3];
  var halfmove_clock = fen_parts[4];
  var fullmove_num = fen_parts[5];
  */
  return true;
};

/**
 * @param {Node} node
 */
gamebuilder.games.chess.FEN.prototype.attachDiagramToNode = function(node) {
  //var diagram = document.createTextNode('...');
  //node.appendChild(diagram);
  this.chess_board_.displayHtml(node);
};

/**
 *
 */
gamebuilder.games.chess.FEN.parseAllFenInDocument = function() {
  var elts = document.getElementsByClassName('gamebuilder_chess_fen');
  if (!gamebuilder.util.isDefAndNotNull(elts)) {
    return;
  }
  for (var f = 0, container; container = elts[f]; ++f) {
    var fen = new gamebuilder.games.chess.FEN();
    var errors = [];
    if (fen.parse(container.innerHTML, errors)) {
      container.innerHTML = '';
      fen.attachDiagramToNode(container);
    } else {
      container.innerHTML = 'Error: ' + error;
    }
  }
};
