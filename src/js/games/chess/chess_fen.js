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

goog.provide('gamebuilder.games.chess.FEN');

goog.require('gamebuilder.games.chess');


/**
 * The FEN format is described here:
 * http://en.wikipedia.org/wiki/Forsyth-Edwards_Notation
 *
 * This function will attempt to parse the given FEN string and return a valid
 * chess board with pieces properly positioned, if the input were valid and
 * parsed, or null otherwise.
 *
 * @param {string} fen The FEN for this diagram.
 * @param {Array.<string>} errors
 * @return {?gamebuilder.games.chess.Board} a valid chess board, if parsed
 *     correctly, or null if an error were found
 */
gamebuilder.games.chess.FEN.parse = function(fen, errors) {
  var board = new gamebuilder.games.chess.Board();

  // Replace newlines with spaces.
  fen = fen.replace(/\n/g, ' ').replace(/\r/g, ' ');
  // Replaces multiple spaces with a single space.
  fen = fen.replace(/\s+/, ' ');
  // Trim leading and trailing whitespace.
  fen = fen.replace(/^\s+/, '').replace(/\s+$/, '');
  if (fen.length == 0) {
    errors.push('No FEN present');
    return null;
  }
  var fen_parts = fen.split(' ');
  /*
  // We currently ignore everything but the board position, so this is
  // too strict
  if (fen_parts.length != 6) {
    return null;
  }
  */
  if (fen_parts.length < 1) {
    errors.push('FEN has no information');
    return null;
  }

  var pieces = fen_parts[0];
  // Debug!
  errors.push(pieces);
  var piece_rows = pieces.split('/');
  var rows = board.numRows();
  for (var r = 0, row; row = piece_rows[r]; ++r) {
    if (r >= rows) {
      errors.push('Row ' + (r + 1) + ' is outside board size: ' + rows);
      return null;
    }
    var board_col = 0;
    errors.push('row: [' + row + ']');
    if (!board.isRowValid(r)) {
      errors.push('More data in row ' + (r + 1) +
                  ' (' + board_col + ') than the board has space (' +
                  board.numRows() + ')');
      return null;
    }
    for (var c = 0, row_char; row_char = row[c++]; /* inc. in condition */) {
      if (!board.isColValid(board_col)) {
        errors.push('More data in col ' + (board_col + 1) +
                    ' (' + row_char + ') than the board has space (' +
                    board.numCols() + ')');
        return null;
      }
      // Blank squares.
      if (row_char >= '1' && row_char <= '8') {
        var col_inc = row_char - '0';
        if (!board.isColValid(board_col + col_inc - 1)) {
          errors.push('Increment ' + row_char + ' is too high; ' +
                      'the board only has ' + board.numCols() + ' columns.');
          return null;
        }
        board_col += col_inc;
      } else {
        var piece = null;
        try {
          piece = gamebuilder.games.chess.Piece.createFromCharCode(row_char);
        } catch (exception) {
          errors.push(exception);
          return null;
        }
        if (gamebuilder.util.isDefAndNotNull(piece)) {
          board.setPiece(r, board_col++, piece);
        } else {
          errors.push('Could not parse piece "' + row_char + '"');
          return null;
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
  return board;
};
