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
# Tests for the unittesting library.

set -o errexit
set -o nounset

readonly TOP="$(dirname $0)/../.."

function testComparisons() {
  assertEQ 2 2
  assertEQ '2' '2'

  assertStrEQ 'abc' 'abc'

  assertNE 12 3
  
  assertGT 5 3
  assertGE 5 5
  assertGE 7 3

  assertLE 56 93
  assertLE 56 56
  assertLT 11 17
}

source ${TOP}/src/sh/testing.sh
