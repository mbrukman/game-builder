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
 * @param {Array.<string>} colors CSS class names, order: {light, dark}.
 * @param {string} images_root Root directory for images.
 * @param {Array.<Array.<string>>} images A 2x8 array with the format:
 *     {{white pieces}, {black pieces}}; order of pieces:
 *     pawn, knight, bishop, rook, queen, king.
 * @param {string} piece_img_class CSS class for piece images.
 *
 * @constructor
 * @export
 */
gamebuilder.games.chess.Theme = function(colors, images_root, images, piece_img_class) {
  /**
   * CSS classes for the board squares, in order: [light, dark].
   * Must be of size 2.
   *
   * @type {Array.<string>}
   * @private
   */
  this.colors_ = colors;
  if (colors.length != 2) {
    throw new Error("`colors' should be an array of size 2");
  }

  /**
   * Root directory for piece image files.
   *
   * @type {string}
   * @private
   */
  this.images_root_ = images_root;

  /**
   * Array of paths to piece images.
   *
   * @type {Array.<Array.<string>>}
   * @private
   */
  this.images_ = images;
  if (images.length != 2) {
    throw new Error("`images' should be an array of size 2");
  }
  for (var i = 0; i < images.length; ++i) {
    if (images[i].length != 6) {
      throw new Error("`images' should be an array of 2x6, is:" + images[i].length);
    }
  }

  /**
   * TODO: document.
   *
   * @type {string}
   * @private
   */
  this.piece_image_class_ = piece_img_class;
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
      return this.colors_[0];
    }
    case gamebuilder.games.chess.SquareColor.DARK: {
      return this.colors_[1];
    }
    default: {
      throw new Error("Invalid color: " + color);
    }
  }
};

/**
 * TODO: document.
 */
gamebuilder.games.chess.Theme.prototype.getPieceImageClass = function() {
  return this.piece_image_class_;
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

  return this.images_root_ + '/' + this.images_[color_index][piece_index];
};

/**
 * @type {gamebuilder.games.chess.Theme}
 * @export
 */
gamebuilder.games.chess.Theme.DEFAULT_THEME = null;
