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
# Populates gamebuilder/third_party with snapshots of other projects and tools
# we use in GameBuilder.
#
# Currently, those tools are:
#   * Closure (library + compiler)
#   * JsUnit

set -o errexit
set -o nounset

if [[ ! -d third_party ]]; then
  mkdir third_party
fi
cd third_party

# Download Closure compiler.
if [[ ! -d closure-compiler ]]; then
  mkdir closure-compiler && cd closure-compiler
  echo "Downloading Closure compiler..."
  curl http://closure-compiler.googlecode.com/files/compiler-latest.tar.gz \
       -o closure-compiler.tar.gz
  tar zxf closure-compiler.tar.gz
  cd ..
fi

# Download Closure library.
if [[ ! -d closure-library ]]; then
  echo "Exporting Closure library from SVN..."
  svn -q export "http://closure-library.googlecode.com/svn/trunk@9" closure-library
  rm -rf closure-library/closure/docs
fi

# Grab relevant parts of JsUnit that we need for testing.
if [[ ! -d jsunit ]]; then
  mkdir jsunit && cd jsunit
  echo "Exporting JsUnit parts from SVN..."

  readonly JSUNIT_SVN_BASE="http://jsunit.svn.sourceforge.net/svnroot/jsunit/trunk/jsunit"
  readonly JSUNIT_SVN_REV="1338"
  readonly JSUNIT_PARTS="app images lib testRunner.html"

  for part in ${JSUNIT_PARTS}; do
    if [[ ! -e ${part} ]]; then
      svn -q export ${JSUNIT_SVN_BASE}/${part}@${JSUNIT_SVN_REV}
    fi
  done
  cd ..
fi

echo Done.
