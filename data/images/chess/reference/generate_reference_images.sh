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
# Generates reference images to show the process behind the rendering of symols
# in chess fonts and why a much simpler approach doesn't work.

readonly SIZE=75
readonly FONT="$1"

# All Unicode codepoints for chess symbols in a font.
readonly U_ALL_CHARS=" 2654 2655 2656 2657 2658 2659 265A 265B 265C 265D 265E 265F"
readonly LABEL="$(env LC_TYPE=en_US.utf8 printf "${U_ALL_CHARS// 2/\\u2}")"
echo "Generating images using text: ${LABEL}"

# Reference image: black on white background.
echo "Generating reference (black on white) ..."
convert -font "${FONT}" -pointsize ${SIZE} \
        -strokewidth 1 -fill black -stroke none -bordercolor black label:${LABEL} \
        "1-black-on-white.png"

# Attempt to make the background transparent via fill on anti-aliased image.
echo "Filling background on antialiased image ..."
convert -font "${FONT}" -pointsize ${SIZE} \
        -strokewidth 1 -fill black -stroke none -bordercolor black label:${LABEL} \
        -fill blue -draw 'color 1,1 filltoborder' -transparent blue \
        "2-black-on-white-transparent-bg.png"

# Black-and-white on clear background, no anti-aliasing.
echo "Generating b&w on clear background ..."
convert -font "${FONT}" -pointsize ${SIZE} +antialias \
        -strokewidth 1 -fill black -stroke none -bordercolor black label:"${LABEL}" \
        -fill blue -draw 'color 1,1 filltoborder' -transparent blue \
        "3-bw-no-aa.png"

# Erase the black, leaving only the white inner regions.
echo "Erasing black from b&w image ..."
convert "3-bw-no-aa.png" -fill blue -opaque black -transparent blue "4-w-no-aa.png"

# Create an anti-aliased outline of black on a transparent background.
echo "Creating anti-aliased outline of black ..."
convert -font "${FONT}" -pointsize ${SIZE} -background none \
        -strokewidth 1 -fill black -stroke none -bordercolor black label:"${LABEL}" \
        "5-b-outline-aa.png"

# Compose the anti-aliased black outline on top of the white-only background.
echo "Compositing final image ..."
convert "4-w-no-aa.png" "5-b-outline-aa.png" -composite "6-final.png"
