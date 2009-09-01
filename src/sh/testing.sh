# No run line -- this should be sourced into another file.
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
# Helper methods for testing shell scripts.

set -o functrace

function assertTrue() {
  if [[ ! $1 ]]; then
    echo "Assert failed: $1 expected: true, actual: false"
    caller
    exit -1
  fi
}

function assertFalse() {
  if [[ $1 ]]; then
    echo "Assert failed: $1 expected: false, actual: true"
    caller
    exit -1
  fi
}

function assertStrEQ() {
  if [[ "$1" != "$2" ]]; then
    echo "Assert failed: expected \"$1\", actual: \"$2\""
    caller
    exit -1
  fi
}

function assertEQ() {
  if [[ $1 -ne $2 ]]; then
    echo "Assert failed: expected: $1, actual: $2"
    caller
    exit -1
  fi
}

function assertNE() {
  if [[ $1 -eq $2 ]]; then
    echo "Assert failed: expected: unequal, both: $1"
    caller
    exit -1
  fi
}

function assertGT() {
  if [[ $2 -le $1 ]]; then
    echo "Assert failed: expected: $2 >= $1"
    caller
    exit -1
  fi
}

# Execute all test cases in the file that sourced this one.
readonly TEST_FN=$(egrep "^function test" $0 | sed 's/^function //;s/().*$//')
for fn in ${TEST_FN}; do
  echo "Running: ${fn}..."
  $fn
  echo "Done: ${fn}."
done

function printFns() {
  for fn in ${TEST_FN}; do
    echo $fn
  done
}

echo "PASSED $(printFns | wc -l) test(s)."
