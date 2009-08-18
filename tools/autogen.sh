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
  printLicenseWithYear | sed "s#^#$1#;s/ \+$//"
}

function printLicenseHashComment() {
  printLicenseWithYear | sed "s/^/# /;s/ \+$//"
}

if [ -z $1 ]; then
  echo "Syntax: $0 [filename]"
  exit
fi

case $1 in

  *.js)
    printLicenseNonHashComment "// "
    ;;

  *.py)
    echo "#!/usr/bin/python2.4"
    echo "#"
    printLicenseHashComment
    ;;

  *.sh)
    echo "#!/bin/bash"
    echo "#"
    printLicenseHashComment
    echo
    echo "set -o errexit"
    echo "set -o nounset"
    ;;

  *)
    echo "File extension not recognized."
    ;;

esac
