# School Email Leads Report Generator

A utility to sort and generate PDF reports for school email leads, organized by province and contact type (direct person vs. admin).

## Features

- ✅ Sorts school leads by province
- ✅ Categorizes contacts as direct-to-person or admin
- ✅ Generates formatted HTML reports
- ✅ Converts HTML to PDF using Playwright
- ✅ Summary statistics and breakdowns

## Data Format

The input data should be a JSON file with an array of school leads. Each lead should have the following structure:

```json
{
  "schoolName": "Example School",
  "province": "Ontario",
  "email": "contact@school.ca",
  "contactType": "person",
  "contactName": "John Doe",
  "dateContacted": "2026-01-15",
  "notes": "Principal - interested in program"
}
```

### Fields

- **schoolName** (required): Name of the school
- **province** (required): Province/state where the school is located
- **email** (required): Contact email address
- **contactType** (required): Either `"person"` (direct contact) or `"admin"` (general admin email)
- **contactName** (optional): Name of the contact person
- **dateContacted** (optional): Date when the school was contacted
- **notes** (optional): Additional notes about the lead

## Usage

### Option 1: Using the default sample data

```bash
cd scripts/school-leads
node generate-report.mjs
```

This will use the sample `data.json` file and generate an HTML report in the current directory.

### Option 2: Using your own data file

```bash
node scripts/school-leads/generate-report.mjs /path/to/your/leads.json
```

### Option 3: Specify both input and output

```bash
node scripts/school-leads/generate-report.mjs /path/to/leads.json /path/to/output-dir
```

### Option 4: Generate PDF (requires dependencies)

After running `pnpm install` or `npm install`, you can generate PDF directly:

```bash
node scripts/school-leads/generate-report.mjs --pdf
```

## Output

The script generates an HTML report:

1. **school-leads-report.html** - A formatted HTML report with:
   - Summary statistics
   - Leads sorted by contact type (Person vs Admin)
   - Leads sorted by province
   - Color-coded rows for easy identification

## Creating a PDF

You have two options to create a PDF:

### Manual (No dependencies required)
1. Open the generated `school-leads-report.html` file in your web browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to print
3. Select "Save as PDF" as the destination
4. Save the PDF

### Automated (Requires dependencies)
After installing dependencies with `pnpm install` or `npm install`:
```bash
node scripts/school-leads/generate-report.mjs --pdf
```
This will automatically generate both HTML and PDF files.

## Example Output

```
📚 School Leads Report Generator
================================

📖 Reading leads from: data.json
✅ Loaded 5 school leads

🔄 Sorting leads by province and contact type...
✅ Sorted into 3 provinces
   - Direct to person: 3
   - Admin contact: 2

📝 Generating HTML report...
✅ HTML report saved to: school-leads-report.html

📄 Generating PDF report...
✅ PDF report saved to: school-leads-report.pdf

📊 Summary by Province:
   British Columbia: 2 total (1 person, 1 admin)
   Ontario: 2 total (1 person, 1 admin)
   Quebec: 1 total (1 person, 0 admin)

✨ Done! Your reports are ready.
```

## Customization

You can modify the following files to customize the report:

- **html-generator.mjs** - Adjust the HTML template and styling
- **sorter.mjs** - Change sorting logic or add additional groupings
- **data.json** - Sample data structure (replace with your actual data)

## Optional Dependencies

For automated PDF generation:
- `playwright-core` - Converts HTML to PDF (already in Clawdbot's dependencies)

The HTML generator works without any dependencies installed.
