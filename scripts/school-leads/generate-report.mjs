#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sortLeads } from './sorter.mjs';
import { generateHtmlReport, saveHtmlReport } from './html-generator.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    const args = process.argv.slice(2);
    const inputFile = args[0] || path.join(__dirname, 'data.json');
    const outputDir = args[1] || __dirname;
    const generatePdf = args.includes('--pdf');

    console.log('📚 School Leads Report Generator');
    console.log('================================\n');

    // Read input data
    console.log(`📖 Reading leads from: ${inputFile}`);
    const leadsData = fs.readFileSync(inputFile, 'utf-8');
    const leads = JSON.parse(leadsData);
    console.log(`✅ Loaded ${leads.length} school leads\n`);

    // Sort leads
    console.log('🔄 Sorting leads by province and contact type...');
    const sorted = sortLeads(leads);
    console.log(
      `✅ Sorted into ${Object.keys(sorted.byProvince).length} provinces`,
    );
    console.log(
      `   - Direct to person: ${sorted.byContactType.person.length}`,
    );
    console.log(`   - Admin contact: ${sorted.byContactType.admin.length}\n`);

    // Generate HTML
    console.log('📝 Generating HTML report...');
    const html = generateHtmlReport(sorted, leads);
    const htmlPath = path.join(outputDir, 'school-leads-report.html');
    saveHtmlReport(html, htmlPath);
    console.log(`✅ HTML report saved to: ${htmlPath}\n`);

    // Generate PDF if requested and dependencies are available
    if (generatePdf) {
      try {
        const { htmlToPdf } = await import('./pdf-generator.mjs');
        console.log('📄 Generating PDF report...');
        const pdfPath = path.join(outputDir, 'school-leads-report.pdf');
        await htmlToPdf(htmlPath, pdfPath);
        console.log(`✅ PDF report saved to: ${pdfPath}\n`);
      } catch (error) {
        console.log(
          '⚠️  PDF generation skipped (playwright-core not installed)',
        );
        console.log(
          `   Open ${htmlPath} in a browser and use Print > Save as PDF\n`,
        );
      }
    } else {
      console.log('💡 To generate PDF:');
      console.log(
        `   1. Open ${htmlPath} in your browser`,
      );
      console.log('   2. Press Ctrl+P (Cmd+P on Mac) to print');
      console.log('   3. Select "Save as PDF" as the destination');
      console.log('   Or run with --pdf flag after installing dependencies\n');
    }

    // Print summary
    console.log('📊 Summary by Province:');
    const provinces = Object.entries(sorted.byProvince).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    for (const [province, provinceLeads] of provinces) {
      const personCount = provinceLeads.filter(
        (l) => l.contactType === 'person',
      ).length;
      const adminCount = provinceLeads.filter(
        (l) => l.contactType === 'admin',
      ).length;
      console.log(
        `   ${province}: ${provinceLeads.length} total (${personCount} person, ${adminCount} admin)`,
      );
    }

    console.log('\n✨ Done! Your reports are ready.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
