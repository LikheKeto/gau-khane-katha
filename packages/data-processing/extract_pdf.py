#!/usr/bin/env python3
"""
Extract text from PDF files with selectable text.
Converts legacy Nepali fonts to proper Unicode.
"""

import argparse
import os
import sys
from pathlib import Path
import npttf2utf

mapper = npttf2utf.FontMapper("raw/map.json")

def process(text: str) -> str:
    return mapper.map_to_unicode(text, from_font="Preeti", unescape_html_input=False, escape_html_output=False)

try:
    import PyPDF2
except ImportError as e:
    print(f"Error: PyPDF2 is required. Install it with:")
    print(f"  pip install PyPDF2")
    sys.exit(1)



def extract_text_from_pdf(pdf_path: str, output_path: str) -> None:
    """
    Extract text from PDF file and convert legacy Nepali fonts to Unicode.
    
    Args:
        pdf_path: Path to input PDF file
        output_path: Path to output text file
    """
    all_text = []
    
    print(f"Extracting text from PDF: {pdf_path}")
    
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        num_pages = len(pdf_reader.pages)
        
        print(f"Processing {num_pages} pages...")
        
        for i, page in enumerate(pdf_reader.pages, 1):
            print(f"  Page {i}/{num_pages}...")
            text = page.extract_text()
            
            if text.strip():
                # Convert legacy Nepali fonts to Unicode
                try:
                    unicode_text = process(text)
                except Exception as e:
                    # If conversion fails, use original text
                    print(f"    Warning: Font conversion failed for page {i}, using original text")
                    unicode_text = text
                
                all_text.append(f"--- Page {i} ---\n{unicode_text}\n")
    
    # Write to output file
    output_file = Path(output_path)
    output_file.parent.mkdir(parents=True, exist_ok=True)
    
    full_text = '\n'.join(all_text)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    print(f"\n✓ Extraction complete: {output_path}")
    print(f"  Pages processed: {num_pages}")
    print(f"  Total characters extracted: {len(full_text)}")


def main():
    parser = argparse.ArgumentParser(
        description="Extract text from PDF files with selectable text"
    )
    parser.add_argument(
        "--input", "-i",
        required=True,
        help="Input PDF file path"
    )
    parser.add_argument(
        "--output", "-o",
        required=True,
        help="Output text file path"
    )
    
    args = parser.parse_args()
    
    # Validate input file
    if not os.path.exists(args.input):
        print(f"Error: Input file not found: {args.input}")
        sys.exit(1)
    
    extract_text_from_pdf(args.input, args.output)


if __name__ == "__main__":
    main()
