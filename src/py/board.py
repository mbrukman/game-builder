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
# An implementation of a game board.

class Board:
  def __init__(self, dim):
    """Creates a new Board object, with the given dimensions.
    Args:
      dim: tuple of 2 positive numbers, first cooresponding to the alpha part of
           the coordinates, the second to the numeric part.
    """
    rows, cols = dim
    if rows <= 0 or cols <= 0:
      raise Exception('rows (%d) and cols (%d) must be positive' % (rows, cols))

    self.__board = []
    r = 0
    while r < rows:
      self.__board.append([])
      c = 0
      while c < cols:
        self.__board[r].append(None)
        c += 1

      r += 1

  def __str__(self):
    return repr(self.__board)

  def __isValidCoord(self, coords):
    """Tests validity of given internal board coordinates.
    Args:
      coords: tuple of 2 positive numbers

    Returns:
      True iff this is a valid coordinate for this board.
    """
    row, col = coords
    if row < 0 or row > len(self.__board):
      return False
    return col >= 0 and col < len(self.__board[row])

  def isValidPos(self, pos):
    """Tests validity of given alphanumeric position.
    Args:
      pos: human-readable alpha-numeric string position

    Returns:
      True iff this is a valid position for this board.
    """
    return self.__isValidCoord(Board.posToCoords(pos))

  def isEmpty(self, pos):
    """Tells whether the given position on the board is empty.
    Args:
      pos: human-readable alpha-numeric position

    Returns:
      True iff pos is an empty square on this board.
    """
    return self.getPieceAtPos(pos) is None

  @classmethod
  def posToCoords(cls, pos):
    """Converts a human-readable alphanumeric position to internal coordinates.

    Args:
      pos: string, 2+ characters long, first is a letter, then a number
    """
    if len(pos) < 2:
      raise Exception('Invalid format for position: %s' % pos)
    alpha = int(pos[0].lower(), 36) - int('a', 36)
    num = int(pos[1:]) - 1
    return (alpha, num)

  def __getPieceAtCoords(self, coords):
    """Returns the piece at the given internal coordinates.

    Args:
      coords: tuple of (row, col)
    """
    row, col = coords
    if not self.__isValidCoord(coords):
      raise Exception('Invalid position (%d, %d) for board (%d, %d)' % \
                  (row, col, len(self.__board), len(self.__board[0])))
    return self.__board[row][col]

  def getPieceAtPos(self, pos):
    """Returns the piece at the given alphanumeric position.

    Args:
      pos: a alphanumeric position, must be valid for this board
    """
    return self.__getPieceAtCoords(Board.posToCoords(pos))

  def __setPieceAtCoords(self, piece, coords):
    """Sets a given piece at the given internal coordinates.

    Args:
      piece: any value
      coords: tuple of (row, col)
    """
    row, col = coords
    if not self.__isValidCoord(coords):
      raise Exception('Invalid position (%d, %d) for board (%d, %d)' % \
                  (row, col, len(self.__board), len(self.__board[0])))
    self.__board[row][col] = piece

  def setPieceAtPos(self, piece, pos):
    """Sets a given piece at the given alphanumeric position.

    Args:
      piece: any value
      pos: a alphanumeric position, must be valid for this board
    """
    self.__setPieceAtCoords(piece, Board.posToCoords(pos))
