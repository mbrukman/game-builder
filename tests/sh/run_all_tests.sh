#!/bin/bash
#
# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License")
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

for t in *_test.sh ; do
  echo -n "Testing ${t} ... "
  stdout="$(mktemp "/tmp/${t}.XXXXXX")"
  "./${t}" > "${stdout}" 2>&1
  if [[ -n "$(tail -n 1 "${stdout}" | grep PASSED)" ]]; then
    rm -f "${stdout}"
    echo "OK."
  else
    echo "failed, see log in ${stdout}"
  fi
done
