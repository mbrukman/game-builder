#!/bin/bash -eu
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
# Tests for the autogen script.

readonly TOP="$(dirname $0)/../.."
readonly MIN_LOC=$(wc -l < ${TOP}/tools/apache-2.0-header.txt)

function autogen() {
  ${TOP}/tools/autogen.sh $1
}

function testValid() {
  # C
  assertLT ${MIN_LOC} $(autogen a.c | wc -l)
  assertLT ${MIN_LOC} $(autogen b.h | wc -l)

  # C++
  assertLT ${MIN_LOC} $(autogen c.cpp | wc -l)
  assertLT ${MIN_LOC} $(autogen d.hpp | wc -l)

  # Haskell
  assertLT ${MIN_LOC} $(autogen c.hs | wc -l)

  # Java
  assertLT ${MIN_LOC} $(autogen e.java | wc -l)

  # Javascript
  assertLT ${MIN_LOC} $(autogen f.js | wc -l)

  # Lisp
  assertLT ${MIN_LOC} $(autogen c.lisp | wc -l)

  # ML
  assertLT ${MIN_LOC} $(autogen c.ml | wc -l)
  assertLT ${MIN_LOC} $(autogen c.sml | wc -l)

  # Perl
  assertLT ${MIN_LOC} $(autogen f.pl | wc -l)
  assertStrEQ "use strict;" "$(autogen foo.pl | egrep ^use)"

  # PHP
  assertLT ${MIN_LOC} $(autogen f.php | wc -l)
  assertEQ 1 $(autogen f.php | grep "error_reporting" | wc -l)

  # Python
  assertLT ${MIN_LOC} $(autogen g.py | wc -l)
  assertLT ${MIN_LOC} $(autogen h_test.py | wc -l)
  assertStrEQ "import unittest" "$(autogen h_test.py | grep import)"
  assertEQ 1 $(autogen h_test.py | grep unittest | wc -l)
  assertLT ${MIN_LOC} $(autogen i.py | wc -l)

  # Shell
  assertLT ${MIN_LOC} $(autogen j.sh | wc -l)
  assertLT ${MIN_LOC} $(autogen j_test.sh | wc -l)
}

function testInvalid() {
  assertStrEQ "File extension not recognized." "$(autogen a.foo)"
  assertStrEQ "File extension not recognized." "$(autogen a.bar)"
}

source "${TOP}/src/sh/testing.sh"
