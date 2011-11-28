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
// Theme support for Reversi.

goog.provide('gamebuilder.games.reversi.theme');

goog.require('gamebuilder.games.reversi');


/**
 * Represents the theme for the Reversi board.
 * TODO: move imagePath from reversi.ui.BoardUI to this class.
 *
 * @param {string} outer_table_class outer TABLE class
 * @param {string} inner_table_class inner TABLE class
 * @param {string} inner_td_class inner TD class
 * @constructor
 */
gamebuilder.games.reversi.theme.Theme =
    function(outer_table_class, inner_table_class, inner_td_class) {
  /**
   * @type {string}
   * @private
   */
  this.outerTableClass_ = outer_table_class;

  /**
   * @type {string}
   * @private
   */
  this.innerTableClass_ = inner_table_class;

  /**
   * @type {string}
   * @private
   */
  this.innerTdClass_ = inner_td_class;
};

/**
 * @return {string} the outer TABLE class
 */
gamebuilder.games.reversi.theme.Theme.prototype.outerTableClass =
    function() {
  return this.outerTableClass_;
};

/**
 * @return {string} the inner TABLE class
 */
gamebuilder.games.reversi.theme.Theme.prototype.innerTableClass =
    function() {
  return this.innerTableClass_;
};

/**
 * @return {string} the inner TD class
 */
gamebuilder.games.reversi.theme.Theme.prototype.innerTdClass =
    function() {
  return this.innerTdClass_;
};

/**
 * @type {gamebuilder.games.reversi.theme.Theme}
 */
gamebuilder.games.reversi.theme.Theme.DEFAULT_THEME =
    // Note: the class names used here match the classes defined in
    // gamebuilder/data/css/reversi.css .
    new gamebuilder.games.reversi.theme.Theme(
        'reversi-holder', 'reversi', 'reversi');
