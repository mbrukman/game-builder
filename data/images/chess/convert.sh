#!/bin/bash

convert -background white \
        -fill black \
        -font $1 \
        -pointsize $2 \
        -label:$3 \
        $4.png
