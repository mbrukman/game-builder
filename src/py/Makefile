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

SRC = ..
include $(SRC)/Makefile.common

ALL_PY = $(wildcard *.py)
TESTS = $(wildcard *_test.py)

ECHO = /bin/echo

# Save test output to a file, print a message, and link to output file
# only if the test failed.
test: $(ALL_PY)
	$(VERB) for t in $(TESTS); do \
		$(ECHO) -n "Testing: $${t} ... "; \
		TEST_OUT=`mktemp /tmp/$${t}.XXXXXX`; \
		./$${t} > $${TEST_OUT} 2>&1; \
		if [[ `wc -l < $${TEST_OUT}` == 0 ]]; then \
			rm -f $${TEST_OUT}; \
			$(ECHO) "no output: no tests defined?"; \
		elif [[ "`tail -n 1 $${TEST_OUT}`" == "OK" ]]; then \
			rm -f $${TEST_OUT}; \
			$(ECHO) "OK."; \
		else \
			$(ECHO) "failed, see log in $${TEST_OUT}"; \
		fi \
	done
