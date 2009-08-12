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

function testStringPosToCoords() {
  var s2c = gamebuilder.games.stringPosToCoords;
  assertArrayEquals([0, 0], s2c('a1'));
}

function testCoordsToStringPos() {
  var c2s = gamebuilder.games.coordsToStringPos;
  assertEquals('a1', c2s([0, 0]));
  assertEquals('s19', c2s([18, 18]));
}
