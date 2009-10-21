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

/**
 * Stores the design of this board.
 *
 * @param {Array.<string>} colors CSS class names, order: {light, dark}
 * @param {string} images_root
 * @param {Array.<Array<string>>} images A 2x8 array with the format:
 *     {{white pieces}, {black pieces}}; order of pieces:
 *     pawn, knight, bishop, rook, queen, king.
 * @param {string} piece_img_class
 */
gamebuilder.games.chess.Theme = function(colors, images_root, images,
                                         piece_img_class) {
  /**
   * @type {Array<string>}
   * @private
   */
  this.colors_ = colors;
  if (colors.length != 2) {
    throw new Error("`colors' should be an array of size 2");
  }

  /**
   * @type {string}
   * @private
   */
  this.images_root_ = images_root;
	
  /**
   * @type {Array.<Array<string>>}
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
   * @type {string}
   * @private
   */
  this.piece_image_class_ = piece_img_class;
};

/**
 * 
 *
 * @param {string} One of {@chess.SquareColor.LIGHT} or
 *     {@code gamebuilder.games.chess.SquareColor.DARK}
 * @return {string} The color o
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

gamebuilder.games.chess.Theme.prototype.getPieceImageClass = function() {
  return this.piece_image_class_;
};

/**
 *
 *
 * @param {string} color One of {@code gamebuilder.games.chess.Piece.WHITE} or
 *      {@code gamebuilder.games.chess.Piece.BLACK}
 * @param {string} piece One of {@code gamebuilder.games.chess.Piece.PAWN, BISHOP, KNIGHT,
 *     ROOK, QUEEN, KING}
 */
gamebuilder.games.chess.Theme.prototype.getPieceImage = function(color, piece) {
  var color_index = -1;
  switch (color) {
    case gamebuilder.games.chess.Piece.WHITE: {
      color_index = 0;
      break;
    }
    case gamebuilder.games.chess.Piece.BLACK: {
      color_index = 1;
      break;
    }
    default: {
      throw new Error("Invalid color: " + color);
    }
  }
  
  var piece_index = -1;
  switch (piece) {
    case gamebuilder.games.chess.Piece.PAWN: {
      piece_index = 0;
      break;
    }
    case gamebuilder.games.chess.Piece.KNIGHT: {
      piece_index = 1;
      break;
    }
    case gamebuilder.games.chess.Piece.BISHOP: {
      piece_index = 2;
      break;
    }
    case gamebuilder.games.chess.Piece.ROOK: {
      piece_index = 3;
      break;
    }
    case gamebuilder.games.chess.Piece.QUEEN: {
      piece_index = 4;
      break;
    }
    case gamebuilder.games.chess.Piece.KING: {
      piece_index = 5;
      break;
    }
    default:
      throw new Error('Invalid piece: ' + piece);
  }

  return this.images_root_ + '/' + this.images_[color_index][piece_index];
};

/**
 * @type {chess.Theme}
 */
gamebuilder.games.chess.Theme.DEFAULT_THEME = null;
