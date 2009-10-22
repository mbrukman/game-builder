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
# Implements a generic Connect-style game.

import board
import game

class ConnectGame(game.Game):
  def __init__(self, dim, connect_num,
               initial_piece, initial_color_plays, subsequent_turn_plays):
    """
    Args:
      dim: board dimentions by parts: (alpha, numeric)
      connect_num: number
      initial_color: game.Piece
      initial_color_plays: number
      subsequent_turn_plays: number
    """
    self.__board = board.Board(dim)
    self.__connect_num = connect_num
    self.__color_to_play = initial_piece
    self.__num_plays_remaining = initial_color_plays
    if subsequent_turn_plays <= 0:
      raise Exception('Subsequent turn plays must be > 0, but is %d' % \
                      subsequent_turn_plays)
    self.__subsequent_turn_plays = subsequent_turn_plays
    self.__winner = None

  def isValidMove(self, piece, pos):
    """Checks whether the given color can place at given position.
    Args:
      piece: game.Piece
      pos: string
    Returns:
      True iff the game is not over, the color is correct, and the position is
      empty.
    """
    is_won = self.isGameWon(game.Piece.white()) or \
        self.isGameWon(game.Piece.black())
    return self.__board.isEmptyPos(pos) and \
        piece == self.__color_to_play and not is_won

  def makeMove(self, piece, pos):
    """If the move is valid, will place piece at the given position.
    Args:
      piece: game.Piece
      pos: string
    """
    if not self.isValidMove(piece, pos):
      raise Exception('Invalid move for %s at %s' % (piece, pos))

    self.__board.setPieceAtPos(piece, pos)
    self.__num_plays_remaining -= 1
    if self.__num_plays_remaining == 0:
      self.__num_plays_remaining = self.__subsequent_turn_plays
      self.__color_to_play = self.__color_to_play.reverseColor()

  def nextMoveColor(self):
    return self.__color_to_play

  def isGameWon(self, color):
    pass
