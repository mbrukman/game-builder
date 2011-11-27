#!/bin/bash -eu
#
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
# Run the Closure compiler on GameBuilder Javascript library to produce a final
# compiled version.

readonly GAMEBUILDER="${GAMEBUILDER:-$(pwd)}"

readonly CLOSURE_LIBRARY="${GAMEBUILDER}/third_party/closure-library"
readonly CLOSURE_BUILDER="${CLOSURE_LIBRARY}/closure/bin/build/closurebuilder.py"

readonly CLOSURE_COMPILER="${GAMEBUILDER}/third_party/closure-compiler"
readonly CLOSURE_COMPILER_JAR="${CLOSURE_COMPILER}/compiler.jar"

# Externally-passed in flags via environment.
readonly COMPILER_FLAGS="${COMPILER_FLAGS:-}"

err_exit() {
  echo -e "$(basename $0): $@" >&2
  exit 1
}

notfound_err_exit() {
  err_exit "$1 not found; run\ntools/setup_workspace.sh"
}

if [ ! -d ${CLOSURE_LIBRARY} ]; then
  notfound_err_exit "directory ${CLOSURE_LIBRARY}"
elif [ ! -x "${CLOSURE_BUILDER}" ]; then
  notfound_err_exit "${CLOSURE_BUILDER}"
elif [ ! -d "${CLOSURE_COMPILER}" ]; then
  notfound_err_exit "directory ${CLOSURE_COMPILER}"
elif [ ! -f "${CLOSURE_COMPILER_JAR}" ]; then
  notfound_err_exit "Closure compiler jar ${CLOSURE_COMPILER_JAR}"
fi

jscomp_error_flags() {
  readonly ERROR_CLASSES="\
      accessControls ambiguousFunctionDecl checkRegExp checkTypes checkVars \
      constantProperty deprecated es5Strict externsValidation fileoverviewTags \
      globalThis internetExplorerChecks invalidCasts missingProperties \
      nonStandardJsDocs strictModuleDepCheck typeInvalidation undefinedVars \
      unknownDefines uselessCode visibility"
  for class in $ERROR_CLASSES; do
    echo "-f" "--jscomp_error=$class"
  done
}

readonly COMPILER_DBG="\
    -f --compilation_level=WHITESPACE_ONLY \
    -f --debug \
    -f --formatting=PRETTY_PRINT \
"

readonly COMPILER_OPT1="\
    -f --compilation_level=SIMPLE_OPTIMIZATIONS \
    -f --formatting=PRETTY_PRINT \
"

readonly COMPILER_OPT2="-f --compilation_level=ADVANCED_OPTIMIZATIONS"

COMPILER_DBG_OR_OPT="${COMPILER_OPT2}"

while getopts 'dO:' OPTION "${COMPILER_FLAGS}"; do
  case $OPTION in
    d) COMPILER_DBG_OR_OPT="${COMPILER_DBG}"
       ;;
    O) if [ ${OPTARG} -eq 1 ]; then
         COMPILER_DBG_OR_OPT="${COMPILER_OPT1}"
       elif [ ${OPTARG} -eq 2 ]; then
         COMPILER_DBG_OR_OPT="${COMPILER_OPT2}"
       else
         err_exit "invalid flag value -O ${OPTARG} (allowed: 1, 2)"
       fi
       ;;
    *) exit 1
       ;;
  esac
done

${CLOSURE_BUILDER} \
    --compiler_jar=${CLOSURE_COMPILER_JAR} \
    --root=${CLOSURE_LIBRARY} \
    --root=${GAMEBUILDER}/src/js \
    "$@" \
    -o compiled \
    ${COMPILER_DBG_OR_OPT} \
    -f "--generate_exports" \
    -f "--warning_level=VERBOSE" \
    $(jscomp_error_flags)
