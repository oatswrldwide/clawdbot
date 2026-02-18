import { chromium } from 'playwright-core';
import fs from 'node:fs';

/**
 * Convert HTML to PDF using Playwright
 * @param {string} htmlPath - Path to HTML file
 * @param {string} pdfPath - Path where PDF should be saved
 * @returns {Promise<void>}
 */
export async function htmlToPdf(htmlPath, pdfPath) {
  let browser;
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    await page.setContent(htmlContent);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
