# Quick Start Guide

## Step 1: Prepare Your Data

Create a JSON file with your school leads data following this structure:

```json
[
  {
    "schoolName": "Your School Name",
    "province": "Province Name",
    "email": "contact@school.ca",
    "contactType": "person",
    "contactName": "Contact Person Name",
    "dateContacted": "2026-02-18",
    "notes": "Any notes about this lead"
  }
]
```

**Required fields:**
- `schoolName`: Name of the school
- `province`: Province/state
- `email`: Contact email
- `contactType`: Either `"person"` or `"admin"`

**Optional fields:**
- `contactName`: Name of the person (if contactType is "person")
- `dateContacted`: Date format YYYY-MM-DD
- `notes`: Any additional notes

## Step 2: Run the Generator

### Using Sample Data
```bash
cd scripts/school-leads
node generate-report.mjs
```

### Using Your Data
```bash
node scripts/school-leads/generate-report.mjs /path/to/your-data.json
```

### Specify Output Directory
```bash
node scripts/school-leads/generate-report.mjs /path/to/data.json /path/to/output
```

## Step 3: Convert to PDF

### Option A: Manual (Recommended)
1. Open the generated `school-leads-report.html` in your browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Select "Save as PDF"
4. Save the file

### Option B: Automated (After installing dependencies)
```bash
# First time: install dependencies
npm install  # or pnpm install

# Then generate with PDF
node scripts/school-leads/generate-report.mjs --pdf
```

## Example Output

The script will show:
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

📊 Summary by Province:
   British Columbia: 2 total (1 person, 1 admin)
   Ontario: 2 total (1 person, 1 admin)
   Quebec: 1 total (1 person, 0 admin)

✨ Done! Your reports are ready.
```

## Report Features

The HTML report includes:
- **Summary Section**: Total leads, breakdown by contact type and province
- **By Contact Type**: Separate tables for Person and Admin contacts
- **By Province**: Tables grouped by province with totals
- **Color Coding**: Green for person contacts, yellow for admin contacts
- **Sortable View**: Data sorted alphabetically within each section

## Troubleshooting

**Q: The script says "Cannot find file"**
A: Make sure the path to your JSON file is correct. Use absolute paths if needed.

**Q: I get a JSON parsing error**
A: Check that your JSON is valid. Common issues:
- Missing commas between objects
- Quotes around all string values
- No trailing comma after the last object

**Q: PDF generation fails**
A: Use the manual PDF generation method via browser print. This doesn't require any dependencies.

## Need Help?

See the full [README.md](README.md) for more details.
