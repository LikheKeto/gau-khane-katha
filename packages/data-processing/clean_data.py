#!/usr/bin/env python3
"""
Clean and structure extracted Ukhan Tukka data into JSON format.
"""

import argparse
import json
import re
import sys
from pathlib import Path
from typing import List, Dict, Optional


def parse_riddles(text: str) -> List[Dict[str, str]]:
    """
    Parse riddles from extracted text.
    
    Expected format:
    - List prefix (like अ, ज्ञ., द्द., etc.) followed by riddle text
    - Contains "के हो ?" followed by answer
    
    Args:
        text: Extracted text from PDF
        
    Returns:
        List of riddle dictionaries
    """
    riddles = []
    
    # Remove page markers and the line after them
    lines = text.split('\n')
    cleaned_lines = []
    skip_next = False
    
    for line in lines:
        # Skip page markers
        if re.match(r'^--- Page \d+ ---', line.strip()):
            skip_next = True
            continue
        if skip_next:
            skip_next = False
            continue
        
        # Skip dictionary section headers (single Nepali letter on its own line)
        if re.match(r'^[ऀ-ॿ]\s*$', line.strip()):
            continue
            
        cleaned_lines.append(line)
    
    text = '\n'.join(cleaned_lines)
    
    # Split by list prefixes to get individual riddles
    # Pattern: Nepali letters (possibly combined) followed by a dot
    parts = re.split(r'([ऀ-ॿ]+\.)\s+', text)
    
    # Process each riddle
    for i in range(1, len(parts), 2):
        if i + 1 < len(parts):
            riddle_text = parts[i + 1]
        else:
            riddle_text = parts[i] if i < len(parts) else ""
        
        if not riddle_text.strip():
            continue
        
        # Find "के हो ?" and extract riddle (including "के हो ?") and answer
        # Stop at the answer, don't include subsequent text
        match = re.search(r'(.+?\s*[।,]?\s*के\s+हो\s*[?？])\s*([^\n]+?)(?=\s+[ऀ-ॿ]+\.|\n|$)', riddle_text, re.DOTALL | re.UNICODE)
        
        if match:
            riddle = match.group(1).strip()
            answer = match.group(2).strip()
            
            # Remove any trailing text after the answer that looks like a new riddle
            # (text that contains another "के हो")
            answer = re.sub(r'\s+[ऀ-ॿ]+\..+', '', answer)
            answer = re.split(r'[ऀ-ॿ]+\.', answer)[0].strip()
            
            # Skip if too short (likely errors)
            if len(riddle) < 5 or len(answer) < 2:
                continue
            
            # Clean up the text
            riddle = clean_text(riddle)
            answer = clean_text(answer)
            
            # Skip if empty after cleaning
            if not riddle or not answer:
                continue
            
            # Skip if riddle contains page markers or other metadata
            if any(x in riddle.lower() for x in ['page', 'पेज', 'पृष्ठ']):
                continue
            
            riddles.append({
                "riddle": riddle,
                "answer": answer
            })
    
    return riddles


def clean_text(text: str) -> str:
    """
    Clean up artifacts and normalize text.
    
    Args:
        text: Text to clean
        
    Returns:
        Cleaned text
    """
    # Remove extra whitespace and newlines
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove common artifacts
    text = re.sub(r'[|¥§_]', '', text)
    
    # Remove leading/trailing punctuation artifacts
    text = re.sub(r'^[^\w\u0900-\u097F]+', '', text)
    text = re.sub(r'[^\w\u0900-\u097F?।]+$', '', text)
    
    # Clean up danda (।) spacing
    text = re.sub(r'\s*।\s*', '। ', text).strip()
    
    return text


def remove_duplicates(riddles: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """
    Remove duplicate riddles based on similarity.
    
    Args:
        riddles: List of riddle dictionaries
        
    Returns:
        Deduplicated list
    """
    seen = set()
    unique_riddles = []
    
    for riddle in riddles:
        # Use normalized riddle text as key
        key = re.sub(r'\s+', '', riddle['riddle'].lower())
        if key not in seen:
            seen.add(key)
            unique_riddles.append(riddle)
    
    return unique_riddles


def add_metadata(riddles: List[Dict[str, str]]) -> List[Dict]:
    """
    Add IDs and optional metadata to riddles.
    
    Args:
        riddles: List of riddle dictionaries
        
    Returns:
        Riddles with added metadata
    """
    for i, riddle in enumerate(riddles, 1):
        riddle['id'] = i
        riddle['category'] = ""  # Can be filled manually
        riddle['difficulty'] = ""  # Can be filled manually
    
    return riddles


def validate_riddles(riddles: List[Dict]) -> tuple[List[Dict], List[str]]:
    """
    Validate riddle data and return valid riddles and warnings.
    
    Args:
        riddles: List of riddle dictionaries
        
    Returns:
        Tuple of (valid_riddles, warnings)
    """
    valid_riddles = []
    warnings = []
    
    for riddle in riddles:
        # Check for required fields
        if not riddle.get('riddle') or not riddle.get('answer'):
            warnings.append(f"Skipping riddle {riddle.get('id')}: Missing riddle or answer")
            continue
        
        # Check minimum length
        if len(riddle['riddle']) < 5:
            warnings.append(f"Riddle {riddle['id']} seems too short: {riddle['riddle'][:30]}...")
            continue
        
        valid_riddles.append(riddle)
    
    return valid_riddles, warnings


def clean_data(input_path: str, output_path: str) -> None:
    """
    Main function to clean and structure riddle data.
    
    Args:
        input_path: Path to extracted text file
        output_path: Path to output JSON file
    """
    print(f"Reading input file: {input_path}")
    
    with open(input_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    print("Parsing riddles...")
    riddles = parse_riddles(text)
    print(f"  Found {len(riddles)} riddles")
    
    print("Removing duplicates...")
    riddles = remove_duplicates(riddles)
    print(f"  {len(riddles)} unique riddles")
    
    print("Adding metadata...")
    riddles = add_metadata(riddles)
    
    print("Validating data...")
    riddles, warnings = validate_riddles(riddles)
    
    if warnings:
        print("\nWarnings:")
        for warning in warnings[:10]:  # Show first 10 warnings
            print(f"  ⚠ {warning}")
        if len(warnings) > 10:
            print(f"  ... and {len(warnings) - 10} more warnings")
    
    # Create output directory
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    # Write JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(riddles, f, ensure_ascii=False, indent=2)
    
    print(f"\n✓ Cleaning complete: {output_path}")
    print(f"  Valid riddles: {len(riddles)}")
    print(f"\nNext steps:")
    print(f"  1. Review the output file for accuracy")
    print(f"  2. Manually add categories and difficulty levels if needed")
    print(f"  3. Correct any OCR errors in riddles/answers")


def main():
    parser = argparse.ArgumentParser(
        description="Clean and structure Ukhan Tukka data"
    )
    parser.add_argument(
        "--input", "-i",
        required=True,
        help="Input text file (from extraction)"
    )
    parser.add_argument(
        "--output", "-o",
        required=True,
        help="Output JSON file path"
    )
    
    args = parser.parse_args()
    
    # Validate input file
    if not Path(args.input).exists():
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    clean_data(args.input, args.output)


if __name__ == "__main__":
    main()
