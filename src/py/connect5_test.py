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
# Tests for Connect5.

from connect5 import Connect5
import game
import unittest

class TestConnect6(unittest.TestCase):
  def setUp(self):
    self.__c5 = Connect5()

  def testMakeMove(self):
    c5 = self.__c5
    c5.makeMove(game.Piece.black(), 'a1')
    self.assertRaises(Exception, Connect5.makeMove,
                      c5, game.Piece.black(), 'a1')

  def testIsValidMove(self):
    c5 = self.__c5

    # First move: black
    self.assertFalse(c5.isValidMove(game.Piece.white(), 'a1'))
    self.assertTrue(c5.isValidMove(game.Piece.black(), 'a1'))
    c5.makeMove(game.Piece.black(), 'a1')
    self.assertFalse(c5.isValidMove(game.Piece.black(), 'a1'))

    # Second move: white
    self.assertFalse(c5.isValidMove(game.Piece.black(), 'b2'))
    self.assertTrue(c5.isValidMove(game.Piece.white(), 'b2'))
    c5.makeMove(game.Piece.white(), 'b2')
    self.assertFalse(c5.isValidMove(game.Piece.white(), 'b2'))

    # Third move: black
    self.assertFalse(c5.isValidMove(game.Piece.white(), 'c3'))
    self.assertTrue(c5.isValidMove(game.Piece.black(), 'c3'))
    c5.makeMove(game.Piece.black(), 'c3')
    self.assertFalse(c5.isValidMove(game.Piece.black(), 'c3'))


if __name__ == '__main__':
  unittest.main()
