#!/usr/bin/env python3
"""
Utility script to merge multiple JSON riddle files.
"""

import argparse
import json
from pathlib import Path
from typing import List, Dict


def merge_riddle_files(input_files: List[str], output_file: str) -> None:
    """
    Merge multiple riddle JSON files into one.
    
    Args:
        input_files: List of input JSON file paths
        output_file: Output JSON file path
    """
    all_riddles = []
    
    for input_file in input_files:
        print(f"Reading: {input_file}")
        with open(input_file, 'r', encoding='utf-8') as f:
            riddles = json.load(f)
            all_riddles.extend(riddles)
    
    # Remove duplicates based on riddle text
    seen = set()
    unique_riddles = []
    for riddle in all_riddles:
        riddle_text = riddle.get('riddle', '').strip().lower()
        if riddle_text and riddle_text not in seen:
            seen.add(riddle_text)
            unique_riddles.append(riddle)
    
    # Re-assign IDs
    for i, riddle in enumerate(unique_riddles, 1):
        riddle['id'] = i
    
    # Write merged file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(unique_riddles, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Merged {len(input_files)} files")
    print(f"  Total riddles: {len(all_riddles)}")
    print(f"  Unique riddles: {len(unique_riddles)}")
    print(f"  Output: {output_file}")


def main():
    parser = argparse.ArgumentParser(
        description="Merge multiple riddle JSON files"
    )
    parser.add_argument(
        "--inputs", "-i",
        nargs='+',
        required=True,
        help="Input JSON files to merge"
    )
    parser.add_argument(
        "--output", "-o",
        required=True,
        help="Output JSON file path"
    )
    
    args = parser.parse_args()
    
    # Validate input files
    for input_file in args.inputs:
        if not Path(input_file).exists():
            print(f"Error: Input file not found: {input_file}")
            return
    
    merge_riddle_files(args.inputs, args.output)


if __name__ == "__main__":
    main()
