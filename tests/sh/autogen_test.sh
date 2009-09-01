#!/bin/bash
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

set -o errexit
set -o nounset

readonly TOP="$(dirname $0)/../.."

function autogen() {
  ${TOP}/tools/autogen.sh $1
}

function testValid() {
  assertGT 1 $(autogen a.c | wc -l)
  assertGT 1 $(autogen b.h | wc -l)
  assertGT 1 $(autogen c.cpp | wc -l)
  assertGT 1 $(autogen d.hpp | wc -l)
  assertGT 1 $(autogen e.java | wc -l)
  assertGT 1 $(autogen f.js | wc -l)
  assertGT 1 $(autogen g.py | wc -l)
  assertGT 1 $(autogen h_test.py | wc -l)
  assertStrEQ "import unittest" "$(autogen h_test.py | grep import)"
  assertEQ 1 $(autogen h_test.py | grep unittest | wc -l)
  assertGT 1 $(autogen i.py | wc -l)
  assertGT 1 $(autogen j.sh | wc -l)
  assertGT 1 $(autogen j_test.sh | wc -l)
}

function testInvalid() {
  assertEQ 1 $(autogen a.foo | wc -l)
  assertEQ 1 $(autogen b.bar | wc -l)
}

source ${TOP}/src/sh/testing.sh
