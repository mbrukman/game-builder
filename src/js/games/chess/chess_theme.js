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

goog.provide('gamebuilder.games.chess.Theme');

goog.require('gamebuilder.games.chess');


/**
 * Represents the style of the chess board.
 *
 * @param {Object} theme The settings describing the theme, including CSS class
 *     names, paths to images for the pieces, etc., with the following required
 *     fields:
 *     {@code tableClass}: CSS class name for the container table,
 *     {@code squareClasses}: square CSS class names, in order: [light, dark];
 *     {@code numberCellClass}: CSS class name for cells holding numbers;
 *     {@code letterCellClass}: CSS class name for cells holding letters;
 *     {@code imagesRoot}: root path for piece images;
 *     {@code pieceImages}: a 2x8 array with the format:
 *         {{white pieces}, {black pieces}} with the order of pieces:
 *         pawn, knight, bishop, rook, queen, king;
 *     {@code pieceImgClass}: CSS class for piece images.
 *
 * @constructor
 * @export
 */
gamebuilder.games.chess.Theme = function(theme) {
  var throwError = function(field) {
    throw new Error("required field '" + field + "' not found in theme: " +
        theme);
  };

  var TABLE_CLASS = 'tableClass';
  var SQUARE_CLASSES = 'squareClasses';
  var NUMBER_CELL_CLASS = 'numberCellClass';
  var LETTER_CELL_CLASS = 'letterCellClass';
  var IMAGES_ROOT = 'imagesRoot';
  var PIECE_IMAGES = 'pieceImages';
  var PIECE_IMG_CLASS = 'pieceImgClass';

  /**
   * @type {string}
   * @private
   */
  this.tableClass_ = theme[TABLE_CLASS] || throwError(TABLE_CLASS);

  /**
   * CSS classes for the board squares, in order: [light, dark].
   * Must be of size 2.
   *
   * @type {Array.<string>}
   * @private
   */
  this.squareClasses_ = theme[SQUARE_CLASSES] || throwError(SQUARE_CLASSES);
  if (this.squareClasses_.length != 2) {
    throw new Error("`colors' should be an array of size 2");
  }

  /**
   * CSS class for cells containing row numbers.
   *
   * @type {string}
   * @private
   */
  this.numberCellClass_ = theme[NUMBER_CELL_CLASS] ||
      throwError(NUMBER_CELL_CLASS);

  /**
   * CSS class for cells containing column letters.
   *
   * @type {string}
   * @private
   */
  this.letterCellClass_ = theme[LETTER_CELL_CLASS] ||
      throwError(LETTER_CELL_CLASS);

  /**
   * Root directory for piece image files.
   *
   * @type {string}
   * @private
   */
  this.imagesRoot_ = theme[IMAGES_ROOT] || throwError(IMAGES_ROOT);

  /**
   * Array of paths to piece images.
   *
   * @type {Array.<Array.<string>>}
   * @private
   */
  this.pieceImages_ = theme[PIECE_IMAGES] || throwError(PIECE_IMAGES);
  var images = this.pieceImages_;
  if (images.length != 2) {
    throw new Error("`images' should be an array of size 2");
  }
  for (var i = 0; i < images.length; ++i) {
    if (images[i].length != 6) {
      throw new Error("`images' should be an array of 2x6, is:" + images[i].length);
    }
  }

  /**
   * CSS class of piece images.
   *
   * @type {string}
   * @private
   */
  this.pieceImageClass_ = theme[PIECE_IMG_CLASS] ||
      throwError(PIECE_IMG_CLASS);
};

/**
 * Returns the stored class name for the container table.
 *
 * @return {string} the name of the class.
 */
gamebuilder.games.chess.Theme.prototype.getTableClass = function() {
  return this.tableClass_;
};

/**
 * Returns the CSS class of a given color.
 *
 * @param {gamebuilder.games.chess.SquareColor} color
 * @return {string} The CSS class of the given color.
 */
gamebuilder.games.chess.Theme.prototype.getSquareClass = function(color) {
  switch (color) {
    case gamebuilder.games.chess.SquareColor.LIGHT: {
      return this.squareClasses_[0];
    }
    case gamebuilder.games.chess.SquareColor.DARK: {
      return this.squareClasses_[1];
    }
    default: {
      throw new Error("Invalid color: " + color);
    }
  }
};

/**
 * Returns the stored class name for the number cells.
 *
 * @return {string} the name of the class.
 */
gamebuilder.games.chess.Theme.prototype.getNumberCellClass = function() {
  return this.numberCellClass_;
};

/**
 * Returns the stored class name for the letter cells.
 *
 * @return {string} the name of the class.
 */
gamebuilder.games.chess.Theme.prototype.getLetterCellClass = function() {
  return this.letterCellClass_;
};

/**
 * Returns the stored class name for the piece images.
 *
 * @return {string} the name of the class.
 */
gamebuilder.games.chess.Theme.prototype.getPieceImageClass = function() {
  return this.pieceImageClass_;
};

/**
 * Returns the path to an image file for the given color and piece value.
 *
 * @param {gamebuilder.games.chess.PieceColor} color
 * @param {gamebuilder.games.chess.PieceValue} value
 */
gamebuilder.games.chess.Theme.prototype.getPieceImage = function(color, value) {
  var color_index = -1;
  switch (color) {
    case gamebuilder.games.chess.PieceColor.WHITE: {
      color_index = 0;
      break;
    }
    case gamebuilder.games.chess.PieceColor.BLACK: {
      color_index = 1;
      break;
    }
    default: {
      throw new Error("Invalid color: " + color.str());
    }
  }

  var piece_index = -1;
  switch (value) {
    case gamebuilder.games.chess.PieceValue.PAWN: {
      piece_index = 0;
      break;
    }
    case gamebuilder.games.chess.PieceValue.KNIGHT: {
      piece_index = 1;
      break;
    }
    case gamebuilder.games.chess.PieceValue.BISHOP: {
      piece_index = 2;
      break;
    }
    case gamebuilder.games.chess.PieceValue.ROOK: {
      piece_index = 3;
      break;
    }
    case gamebuilder.games.chess.PieceValue.QUEEN: {
      piece_index = 4;
      break;
    }
    case gamebuilder.games.chess.PieceValue.KING: {
      piece_index = 5;
      break;
    }
    default:
      throw new Error('Invalid piece: ' + value.str());
  }

  return this.imagesRoot_ + '/' + this.pieceImages_[color_index][piece_index];
};

/**
 * @type {gamebuilder.games.chess.Theme}
 * @export
 */
gamebuilder.games.chess.Theme.DEFAULT_THEME = null;
