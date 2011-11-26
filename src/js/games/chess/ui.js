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

goog.provide('gamebuilder.games.chess.ui');

goog.require('gamebuilder.games.chess');
goog.require('gamebuilder.games.chess.theme');
goog.require('gamebuilder.util');


/**
 * Draws the board in text mode, attaching it to the parent node passed in.
 *
 * @param {gamebuilder.games.chess.BoardMxN} board The board to display.
 * @param {Node} node The HTML node to attach to.
 */
gamebuilder.games.chess.ui.displayText = function(board, node) {
  var MARGIN = ' ';
  var text = '';
  // Top border
  text += MARGIN + '+';
  var rows = board.numRows();
  var cols = board.numCols();
  for (var i = 0; i < rows; ++i) {
    text += '-+';
  }
  // Each row
  for (var i = 0; i < rows; ++i) {
    // The row number
    text += '\n' + (rows - i) + '|';
    for (var j = 0; j < cols; ++j) {
      // The cell contents
      var piece = board.getPiece(i, j);
      if (gamebuilder.util.isDefAndNotNull(piece)) {
        text += piece.toCharCode();
      } else {
        text += ' ';
      }
      text += '|';
    }
    // Horizontal separator
    text += '\n' + MARGIN + '+';
    for (var k = 0; k < cols; ++k) {
      text += '-+';
    }
  }

  // Bottom labels
  text += '\n' + MARGIN + ' ';  // Spacer for vertical border
  for (var i = 0; i < rows; ++i) {
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
 * @param {gamebuilder.games.chess.BoardMxN} board The board to display.
 * @param {Node} node The HTML node to attach to.
 */
gamebuilder.games.chess.ui.displayHtml = function(board, node) {
  // TODO: create a table which contains the board and row/column labels
  // separately, so we can apply individual styles to each (e.g., border).
  // <table>
  // <tr>
  //   <td><table><!-- 8 -> 1 --></table></td>
  //   <td><table><!-- The  board --></table></td>
  // </tr>
  // <tr>
  //   <td><!-- Empty cell --></td>
  //   <td><!-- a -> h --></td>
  // </tr>
  // </table>
  var container = document.createElement('table');
  var first_row = container.insertRow(-1);
  var numbers_cell = document.createElement('td');
  var numbers_table = document.createElement('table');
  numbers_table.style.border = '';
  numbers_table.style.cellPadding = numbers_table.cellSpacing = 0;
  var rows = board.numRows();
  for (var i = 0; i < rows; ++i) {
    var row = numbers_table.insertRow(-1);
    var cell = document.createElement('td');
    cell.appendChild(document.createTextNode((rows - i).toString()));
    cell.valign = 'middle';
    row.appendChild(cell);
  }
  numbers_cell.appendChild(numbers_table);
  first_row.appendChild(numbers_cell);

  // The board itself.
  var board_cell = document.createElement('td');
  var board_table = document.createElement('table');
  board_table.style.border = '';
  board_table.style.cellPadding = board_table.cellSpacing = 0;
  // TODO: Allow user to override the default theme.
  var theme = gamebuilder.games.chess.theme.DEFAULT_THEME;
  var cols = board.numCols();
  for (var i = 0; i < rows; ++i) {
    var row = board_table.insertRow(-1);
    for (var j = 0; j < cols; ++j) {
      var piece = board.getPiece(i, j);
      var cell = document.createElement('td');
      cell.className = theme.getSquareClass(board.getSquareColor(i, j));

      if (gamebuilder.util.isDefAndNotNull(piece)) {
        var image = document.createElement('img');
        image.src = theme.getPieceImage(piece.color(), piece.value());
        image.className = theme.getPieceImageClass();
        cell.appendChild(image);
      }

      row.appendChild(cell);
    }
  }
  board_cell.appendChild(board_table);
  first_row.appendChild(board_cell);

  // Start the second row.
  var second_row = container.insertRow(-1);

  // Empty cell in the corner.
  second_row.appendChild(document.createElement('td'));

  // Bottom labels
  var alpha_cell = document.createElement('td');
  var alpha_table = document.createElement('table');
  var alpha_row = alpha_table.insertRow(-1);
  for (var i = 0; i < rows; ++i) {
    var cell = document.createElement('td');
    var text = String.fromCharCode('a'.charCodeAt(0) + i);
    cell.appendChild(document.createTextNode(text));
    cell.align = 'center';
    alpha_row.appendChild(cell);
  }
  alpha_cell.appendChild(alpha_table);
  second_row.appendChild(alpha_cell);

  // Attach the results to the real node.
  node.appendChild(container);
};
