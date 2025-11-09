# Data Processing

Tools for extracting and cleaning Ukhan Tukka (Nepali riddles) from PDF files.

## Setup

Navigate to this directory first:
```bash
cd packages/data-processing
```

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Linux/Mac
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### 1. Extract text from PDF

Place your PDF files in the `raw/` directory, then run:

```bash
python extract_pdf.py --input raw/your_file.pdf --output extracted/your_file.txt
```

This extracts text directly from PDFs with selectable text.

### 2. Clean and structure the data

```bash
python clean_data.py --input extracted/your_file.txt --output output/riddles.json
```

This will:
- Parse the riddles and answers
- Remove duplicates
- Format into structured JSON
- Validate the data

### 3. Manual review (optional)

Review the generated JSON file and make any necessary corrections.

## Data Format

The output JSON file has the following structure:

```json
[
  {
    "id": 1,
    "riddle": "उखान/टुक्का text",
    "answer": "जवाफ",
    "category": "optional category",
    "difficulty": "easy|medium|hard"
  }
]
```

## Directory Structure

```
data-processing/
├── raw/              # Place PDF files here
├── extracted/        # Extracted text files
├── output/           # Final cleaned JSON files
├── extract_pdf.py    # Text extraction script
├── clean_data.py     # Data cleaning script
├── merge_files.py    # Merge multiple JSON files
├── requirements.txt  # Python dependencies
└── README.md
```

## Dependencies

- `PyPDF2`: Text extraction from PDFs with selectable text
