#!/usr/bin/python2.4
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
# Tests for Connect6.

from connect6 import Connect6
import game
import unittest

class TestConnect6(unittest.TestCase):
  def setUp(self):
    self.__c6 = Connect6()

  def testMakeMove(self):
    c6 = self.__c6
    c6.makeMove(game.Piece.black(), 'g1')
    self.assertRaises(Exception, Connect6.makeMove,
                      c6, game.Piece.black(), 'g1')

  def testIsValidMove(self):
    c6 = self.__c6

    # First move: 1 for black.
    self.assertFalse(c6.isValidMove(game.Piece.white(), 'a1'))
    self.assertTrue(c6.isValidMove(game.Piece.black(), 'a1'))
    c6.makeMove(game.Piece.black(), 'a1')
    self.assertFalse(c6.isValidMove(game.Piece.black(), 'a1'))

    # Second move: 2 for white.
    self.assertFalse(c6.isValidMove(game.Piece.black(), 'b1'))
    self.assertTrue(c6.isValidMove(game.Piece.white(), 'b1'))
    c6.makeMove(game.Piece.white(), 'b1')
    self.assertFalse(c6.isValidMove(game.Piece.black(), 'b2'))
    self.assertTrue(c6.isValidMove(game.Piece.white(), 'b2'))
    c6.makeMove(game.Piece.white(), 'b2')

    # Third move: 2 for white.
    self.assertFalse(c6.isValidMove(game.Piece.white(), 'c1'))
    self.assertTrue(c6.isValidMove(game.Piece.black(), 'c1'))
    c6.makeMove(game.Piece.black(), 'c1')
    self.assertFalse(c6.isValidMove(game.Piece.white(), 'c2'))
    self.assertTrue(c6.isValidMove(game.Piece.black(), 'c2'))
    c6.makeMove(game.Piece.black(), 'c2')


if __name__ == '__main__':
  unittest.main()
