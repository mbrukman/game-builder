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
# Sets the appropriate MIME type on HTML, PNG, etc. files to make them viewable
# via the Google Code website directly.

set -o errexit
set -o nounset

setMimeType() {
  case $1 in
    *.html)
      svn propset 'svn:mime-type' text/html $1
      ;;
    *.jpg)
      svn propset 'svn:mime-type' image/jpg $1
      ;;
    *.png)
      svn propset 'svn:mime-type' image/png $1
      ;;
    *.py | *.sh)
      svn propset 'svn:executable' ON $1
      ;;
  esac
}

for file in $*; do
  setMimeType $file
done
