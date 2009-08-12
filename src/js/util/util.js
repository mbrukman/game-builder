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

gamebuilder.util = {};

/**
 * @param {Object?} obj
 * @return {boolean} Whether obj is defined.
 */
gamebuilder.util.isDef = function(obj) {
  return (typeof obj != 'undefined');
};

/**
 * @param {Object?} obj
 * @return {boolean} Whether obj is defined and not null.
 */
gamebuilder.util.isDefAndNotNull = function(obj) {
  return gamebuilder.util.isDef(obj) && (obj != null);
};

gamebuilder.util.isNotDefOrNull = function(obj) {
  return (typeof obj == 'undefined') || (obj == null);
};

/**
 * Copies all prototype definitions from {@code base} to {@code derived}.
 * Discussion: http://www.crockford.com/javascript/inheritance.html .
 *
 * @param {Function} derived
 * @param {Function} base
 */
gamebuilder.util.inherits = function(derived, base) {
  for (proto in base.prototype) {
    derived.prototype[proto] = base.prototype[proto];
  }
};

/**
 * @param {string} fmt
 * @return {string} Formatted string with argument substitution.
 */
gamebuilder.util.sprintf = function(fmt) {
  for (var i = 1; i < arguments.length; ++i) {
    if (gamebuilder.util.isDefAndNotNull(fmt.match('%s'))) {
      fmt = fmt.replace(/%s/, arguments[i]);
    } else {
      throw new Error('Too many positional arguments to fill format string: ' + fmt);
    }
  }
  if (gamebuilder.util.isDefAndNotNull(fmt.match('%s'))) {
    throw new Error('Not enough positional arguments to fill in format string: ' + fmt);
  }
  return fmt;
};
