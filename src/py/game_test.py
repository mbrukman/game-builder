#!/usr/bin/python
#
# Copyright 2009 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
################################################################################
#
# Tests for the Game class.

import game
import unittest

class TestPiece(unittest.TestCase):
  def testEquals(self):
    w1 = game.Piece.white()
    w2 = game.Piece.white()
    b1 = game.Piece.black()
    b2 = game.Piece.black()

    self.assertEquals(w1, w2)
    self.assertEquals(b1, b2)

    for w in (w1, w2):
      for b in (b1, b2):
        self.assertNotEquals(w, b)

  def testToString(self):
    self.assertEquals('black', str(game.Piece.black()))
    self.assertEquals('white', str(game.Piece.white()))

  def testCheckValidColor(self):
    for i in xrange(2, 5):
      self.assertRaises(Exception, game.Piece, game.Piece.checkValidColor, i)

  def reverseColor(self):
    white = game.Piece.white()
    black = game.Piece.black();
    self.assertEquals(white, black.reverseColor())
    self.assertEquals(black, white.reverseColor())
    self.assertEquals(white, white.reverseColor().reverseColor())
    self.assertEquals(black, black.reverseColor().reverseColor())


if __name__ == '__main__':
  unittest.main()
