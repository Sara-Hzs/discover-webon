#!/bin/bash

# Navigate to the src/public directory
cd static || exit

source_file="prod_manifest.json"
destination_file="nomo_manifest.json"

# Check if the source file exists
if [ -e "$source_file" ]; then
    # Copy and rename the file
    cp "$source_file" "$destination_file"

    echo "File '$source_file' copied and renamed to '$destination_file'."
else
    echo "Error: Source file '$source_file' not found."
fi

source_file="prod_icon.svg"
destination_file="nomo_icon.svg"

# Check if the source file exists
if [ -e "$source_file" ]; then
    # Copy and rename the file
    cp "$source_file" "$destination_file"

    echo "File '$source_file' copied and renamed to '$destination_file'."
else
    echo "Error: Source file '$source_file' not found."
fi