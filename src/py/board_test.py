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
# Tests for game board functionality.

import board
import unittest

class TestBoard(unittest.TestCase):
  def testIsValid(self):
    rows = 3
    cols = 4
    b = board.Board((rows, cols))
    alpha = map(chr, range(ord('a'), ord('a') + rows))
    num = range(1, cols + 1)
    # The cross-product of alpha and num are the possible positions.
    for pos in ['%s%d' % (a, n) for a in alpha for n in num]:
      self.assertTrue(b.isValidPos(pos))

  def testGetAndSetPiece(self):
    rows = 3
    cols = 4
    b = board.Board((rows, cols))
    self.assertEquals(None, b.getPieceAtPos('a1'))
    b.setPieceAtPos('New piece', 'a1')
    self.assertEqual('New piece', b.getPieceAtPos('a1'))

  def testInvalidPositions(self):
    rows = 5
    cols = 6
    b = board.Board((rows, cols))
    self.assertRaises(Exception, b.getPieceAtPos, 'f4')
    self.assertRaises(Exception, b.setPieceAtPos, 'piece', 'a7')


if __name__ == '__main__':
  unittest.main()
