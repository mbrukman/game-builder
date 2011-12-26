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
# Script to generate piece images from fonts containing chess piece characters.
#
# Currently works for pieces whose characters match Unicode codepoints for
# chess pieces.

# Args:
#   $1: font
#   $2: char
#   $3: output image path
draw_piece() {
  local font="$1"
  local char="$2"
  local output="$3"

  local size="100"
  local gravity="west"

  # Create a black outline with white fill (without antialiasing), with a
  # transparent background.
  convert -font ${font} -size ${size}x${size} +antialias \
          -strokewidth 1 -fill black -stroke none -bordercolor black label:${char} \
          -fill blue -draw 'color 1,1 filltoborder' -transparent blue \
          bw-no-aa.png

  # Calculate the bounding box and extract the width.
  local width="$(convert bw-no-aa.png -format '%@' info: | sed 's/x.*//')"

  # Now compute the horizontal offset as the margin that needs to be on the left
  # and right of the image.
  local margin="$(echo "($size - $width) / 2" | bc)"
  local offset="+$margin+0"

  # Recompute the original image with the new geometry.
  convert -font ${font} -size ${size}x${size}${offset} -gravity ${gravity} +antialias \
          -strokewidth 1 -fill black -stroke none -bordercolor black label:${char} \
          -fill blue -draw 'color 1,1 filltoborder' -transparent blue \
          bw-no-aa.png

  # Delete the black color from the image, leaving only white inner regions.
  convert bw-no-aa.png -fill blue -opaque black -transparent blue w-no-aa.png
  rm -f bw-no-aa.png

  # Create an anti-aliased outline of black on a transparent background.
  convert -font ${font} -size ${size}x${size}${offset} -gravity ${gravity} -background none \
          -strokewidth 1 -fill black -stroke none -bordercolor black label:${char} \
          b-outline-aa.png

  # Compose the anti-aliased black outline on top of the white-only background.
  convert w-no-aa.png b-outline-aa.png -composite ${output}
  rm -f w-no-aa.png b-outline-aa.png
}

# Unicode codepoints for chess symbols, in hex, as per:
# http://en.wikipedia.org/wiki/Template:Unicode_chart_Chess_Symbols
readonly U_WHITE_KING="2654"
readonly U_WHITE_QUEEN="2655"
readonly U_WHITE_ROOK="2656"
readonly U_WHITE_BISHOP="2657"
readonly U_WHITE_KNIGHT="2658"
readonly U_WHITE_PAWN="2659"

readonly U_BLACK_KING="265A"
readonly U_BLACK_QUEEN="265B"
readonly U_BLACK_ROOK="265C"
readonly U_BLACK_BISHOP="265D"
readonly U_BLACK_KNIGHT="265E"
readonly U_BLACK_PAWN="265F"

readonly U_ALL_CHARS="2654 2655 2656 2657 2658 2659 \
                      265A 265B 265C 265D 265E 265F"

declare -A uchar_to_filename
uchar_to_filename["${U_WHITE_KING}"]=king_w
uchar_to_filename["${U_WHITE_QUEEN}"]=queen_w
uchar_to_filename["${U_WHITE_ROOK}"]=rook_w
uchar_to_filename["${U_WHITE_BISHOP}"]=bishop_w
uchar_to_filename["${U_WHITE_KNIGHT}"]=knight_w
uchar_to_filename["${U_WHITE_PAWN}"]=pawn_w
uchar_to_filename["${U_BLACK_KING}"]=king_b
uchar_to_filename["${U_BLACK_QUEEN}"]=queen_b
uchar_to_filename["${U_BLACK_ROOK}"]=rook_b
uchar_to_filename["${U_BLACK_BISHOP}"]=bishop_b
uchar_to_filename["${U_BLACK_KNIGHT}"]=knight_b
uchar_to_filename["${U_BLACK_PAWN}"]=pawn_b

# Args:
#   $1: font file path
#   $2: output directory
#   $*: piece characters to generate
draw_unicode_pieces() {
  local font="$1"
  local output_dir="$2"
  shift 2

  local unicode_piece=""
  local output=""
  for piece in $*; do
    unicode_piece="$(env LC_CTYPE=en_US.utf8 printf "\\u$piece")"
    output="${output_dir}/${uchar_to_filename[$piece]}.png"
    rm -f ${output}
    echo "Creating image for ${font} piece ${unicode_piece} -> ${output} ..."
    draw_piece ${font} ${unicode_piece} ${output}
  done
}

draw_unicode_pieces "merida.ttf" "merida" ${U_ALL_CHARS}
