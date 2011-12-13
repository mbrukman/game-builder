# Copyright 2011 Google Inc.
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
# Building compiled Javascript bundles for the demos.

TOP = ..
include $(TOP)/src/Makefile.common

CALC_DEPS = $(TOP)/third_party/closure-library/closure/bin/calcdeps.py
GAMEBUILDER_SRC_JS = $(TOP)/src/js
COMPILE_JS = ./compile_js.sh
COMPILE_OPTS = -O 2

SRC_JS = src
OUT_JS = out

all: chess go reversi

clean:
	$(VERB) rm -f $(CHESS_OUT) $(GO_BOARD_OUT) $(GO_GAME_OUT) $(REVERSI_OUT)

# Chess
CHESS_FEN = chess_fen
CHESS_FEN_SRC = $(SRC_JS)/$(CHESS_FEN)_in.js
CHESS_FEN_OUT = $(OUT_JS)/$(CHESS_FEN)_out.js
CHESS_FEN_DEPS := $(shell $(CALC_DEPS) -i $(CHESS_FEN_SRC) -p $(GAMEBUILDER_SRC_JS) 2> /dev/null)

$(CHESS_FEN_OUT): $(CHESS_FEN_DEPS)
	$(VERB) $(COMPILE_JS) $(COMPILE_OPTS) $(CHESS_FEN) || rm -f $(CHESS_FEN_OUT)

chess: $(CHESS_OUT)

# Go board
GO_BOARD = go_board
GO_BOARD_SRC = $(SRC_JS)/$(GO_BOARD)_in.js
GO_BOARD_OUT = $(OUT_JS)/$(GO_BOARD)_out.js
GO_BOARD_DEPS := $(shell $(CALC_DEPS) -i $(GO_BOARD_SRC) -p $(GAMEBUILDER_SRC_JS) 2> /dev/null)

$(GO_BOARD_OUT): $(GO_BOARD_DEPS)
	$(VERB) $(COMPILE_JS) $(COMPILE_OPTS) $(GO_BOARD) || rm -f $(GO_BOARD_OUT)

go_board: $(GO_BOARD_OUT)

# Go game
GO_GAME = go_game
GO_GAME_SRC = $(SRC_JS)/$(GO_GAME)_in.js
GO_GAME_OUT = $(OUT_JS)/$(GO_GAME)_out.js
GO_GAME_DEPS := $(shell $(CALC_DEPS) -i $(GO_GAME_SRC) -p $(GAMEBUILDER_SRC_JS) 2> /dev/null)

$(GO_GAME_OUT): $(GO_BOARD_DEPS)
	$(VERB) $(COMPILE_JS) $(COMPILE_OPTS) $(GO_GAME) || rm -f $(GO_GAME_OUT)

go_game: $(GO_GAME_OUT)

# Go: summary
go: go_board go_game

# Reversi
REVERSI_BOARD = reversi_board
REVERSI_SRC = $(SRC_JS)/$(REVERSI_BOARD)_in.js
REVERSI_OUT = $(OUT_JS)/$(REVERSI_BOARD)_out.js
REVERSI_DEPS := $(shell $(CALC_DEPS) -i $(REVERSI_SRC) -p $(GAMEBUILDER_SRC_JS) 2> /dev/null)

$(REVERSI_OUT): $(CHESS_DEPS)
	$(VERB) $(COMPILE_JS) $(COMPILE_OPTS) $(REVERSI_BOARD) || rm -f $(REVERSI_OUT)

reversi: $(REVERSI_OUT)
