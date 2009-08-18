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
# Exports the minimum parts of JsUnit from SVN that we need to run Javascript
# tests.

if [[ ! -e third_party ]]; then
  mkdir third_party
fi
cd third_party

# Grab relevant parts of JsUnit that we need for testing.
JSUNIT_SVN_BASE="http://jsunit.svn.sourceforge.net/svnroot/jsunit/trunk/jsunit"
JSUNIT_SVN_REV="1338"
JSUNIT_PARTS="app images lib testRunner.html"

if [[ ! -e jsunit ]]; then
  mkdir jsunit
fi
cd jsunit
for part in ${JSUNIT_PARTS}; do
  if [[ ! -e ${part} ]]; then
    svn export ${JSUNIT_SVN_BASE}/${part}@${JSUNIT_SVN_REV}
  fi
done
