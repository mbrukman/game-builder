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
# Implements the abstract Game class.

class Piece:
  __BLACK = 0
  __WHITE = 1

  def __init__(self, color):
    Piece.checkValidColor(color)
    self.__color = color

  def __str__(self):
    if self.__color == Piece.__BLACK:
      return 'black'
    return 'white'

  def color(self):
    return self.__color

  def __eq__(self, other):
    return self.__color == other.__color

  @classmethod
  def black(cls):
    return Piece(Piece.__BLACK)

  @classmethod
  def white(cls):
    return Piece(Piece.__WHITE)

  @classmethod
  def checkValidColor(cls, color):
    if color != Piece.__BLACK and color != Piece.__WHITE:
      raise Exception('Invalid color: %d' % color)

  def reverseColor(self):
    if self.__color == Piece.__BLACK:
      return Piece(Piece.__WHITE)
    return Piece(Piece.__BLACK)


class Game:
  def isValidMove(self, piece, pos):
    raise Exception('Unimplemented: Game.isValidMove()')

  def makeMove(self, piece, pos):
    raise Exception('Unimplemented: Game.makeMove()')

  def nextMovePiece(self):
    raise Exception('Unimplemented: Game.nextMovePiece()')

  def isGameWon(self, color):
    raise Exception('Unimplemented: Game.isGameWon()')
