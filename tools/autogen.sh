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
# Outputs a header file comment, with the appropriate comments based on the
# language, as deduced from the extension of the file.
#
# Sample usage:
#   autogen.sh file.js
#   autogen.sh file.py

set -o errexit
set -o nounset

LICENSE="$(dirname $0)/apache-2.0-header.txt"

function printLicenseWithYear() {
  cat ${LICENSE} | sed "s/YEAR/$(date +%Y)/"
}

function printLicenseNonHashComment() {
  printLicenseWithYear | sed "s#^#$1 #;s/ \+$//"
}

function printLicenseHashComment() {
  printLicenseWithYear | sed "s/^/# /;s/ \+$//"
}

readonly TODO_COMMENT="<TODO: High-level file comment>"
function printFileCommentTemplate() {
  local comment=$1
  # Fit into 80 cols: repeat enough times, depending on our comment width.
  local repeat=$(echo 80 / $(echo -n ${comment} | wc -c) | bc)
  echo $comment
  perl -e "print \"$comment\" x $repeat . \"\n\""
  echo $comment
  echo "$comment ${TODO_COMMENT}"
}

if [[ $# -eq 0 ]]; then
  echo "Syntax: $0 [filename]"
  exit
fi

case $1 in

  *.c | *.h)
    echo "/*"
    printLicenseNonHashComment " *"
    echo " */"
    echo "/* ${TODO_COMMENT} */"
    ;;

  *.cpp | *.hpp | *.java | *.js | *.proto)
    printLicenseNonHashComment "//"
    printFileCommentTemplate "//"
    ;;

  *_test.py)
    # Get the common python header without the test additions.
    readonly BASE_PY=$(echo $1 | sed 's/_test//')
    $0 ${BASE_PY}
    echo
    echo "import unittest"
    # Maybe import the package that this is intended to test.
    if [ -e ${BASE_PY} ]; then
      echo "import $(echo ${BASE_PY} | sed 's/\.py$//')"
    fi
    ;;

  *.php)
    # PHP accepts C, C++, and shell-style comments.
    echo "#!/usr/bin/php"
    echo "#"
    printLicenseHashComment
    printFileCommentTemplate "#"
    ;;

  *.py)
    echo "#!/usr/bin/python2.4"
    echo "#"
    printLicenseHashComment
    printFileCommentTemplate "#"
    ;;

  *.sh)
    echo "#!/bin/bash"
    echo "#"
    printLicenseHashComment
    printFileCommentTemplate "#"
    echo
    echo "set -o errexit"
    echo "set -o nounset"
    ;;

  Makefile | Makefile.*)
    printLicenseHashComment
    ;;

  *)
    echo "File extension not recognized."
    ;;

esac
