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
# Makefile for working with GameBuilder Javascript and Closure.

ROOT = ../..
DEPSWRITER = $(ROOT)/third_party/closure-library/closure/bin/build/depswriter.py

include $(ROOT)/src/Makefile.common

# Get all the Javascript files in our tree, without the leading "./" prefix that
# find(1) prepends to all paths.
ALL_JS_FILES = $(shell find . -name \*\.js -type f | sed 's,^\./,,')

deps: $(ALL_JS_FILES)
	$(VERB) echo -n "Generating Javascript dependencies ... "
	$(VERB) $(DEPSWRITER) $(ALL_JS_FILES) > deps.js
	$(VERB) echo "done."
