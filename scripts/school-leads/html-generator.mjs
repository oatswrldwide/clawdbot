import fs from 'node:fs';

/**
 * @typedef {import('./sorter.mjs').SchoolLead} SchoolLead
 * @typedef {import('./sorter.mjs').SortedLeads} SortedLeads
 */

/**
 * Generate an HTML report for school leads
 * @param {SortedLeads} sorted
 * @param {SchoolLead[]} allLeads
 * @returns {string}
 */
export function generateHtmlReport(sorted, allLeads) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School Email Leads Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      line-height: 1.6;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    h2 {
      color: #34495e;
      margin-top: 30px;
      border-bottom: 2px solid #95a5a6;
      padding-bottom: 5px;
    }
    h3 {
      color: #7f8c8d;
      margin-top: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    th {
      background-color: #3498db;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #ecf0f1;
    }
    tr:hover {
      background-color: #f8f9fa;
    }
    .person {
      background-color: #d4edda;
    }
    .admin {
      background-color: #fff3cd;
    }
    .summary {
      background-color: #e7f3ff;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
    }
    .summary-stat {
      display: inline-block;
      margin-right: 20px;
      font-weight: bold;
    }
    @media print {
      body {
        margin: 20px;
      }
      tr {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <h1>School Email Leads Report</h1>
  <p>Generated: ${new Date().toLocaleDateString()}</p>
  
  <div class="summary">
    <div class="summary-stat">Total Leads: ${allLeads.length}</div>
    <div class="summary-stat">Direct Contact: ${sorted.byContactType.person.length}</div>
    <div class="summary-stat">Admin Contact: ${sorted.byContactType.admin.length}</div>
    <div class="summary-stat">Provinces: ${Object.keys(sorted.byProvince).length}</div>
  </div>

  <h2>Leads by Contact Type</h2>
  
  <h3>Direct to Person (${sorted.byContactType.person.length})</h3>
  ${renderLeadsTable(sorted.byContactType.person)}
  
  <h3>Admin Contact (${sorted.byContactType.admin.length})</h3>
  ${renderLeadsTable(sorted.byContactType.admin)}

  <h2>Leads by Province</h2>
  ${Object.entries(sorted.byProvince)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([province, leads]) => `
    <h3>${province} (${leads.length} ${leads.length === 1 ? 'school' : 'schools'})</h3>
    ${renderLeadsTable(leads)}
  `,
    )
    .join('\n')}

</body>
</html>`;

  return html;
}

/**
 * Render a table of leads
 * @param {SchoolLead[]} leads
 * @returns {string}
 */
function renderLeadsTable(leads) {
  if (leads.length === 0) {
    return '<p><em>No leads in this category</em></p>';
  }

  return `
  <table>
    <thead>
      <tr>
        <th>School Name</th>
        <th>Province</th>
        <th>Email</th>
        <th>Contact Type</th>
        <th>Contact Name</th>
        <th>Date Contacted</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${leads
        .map(
          (lead) => `
        <tr class="${lead.contactType === 'person' ? 'person' : 'admin'}">
          <td>${escapeHtml(lead.schoolName)}</td>
          <td>${escapeHtml(lead.province)}</td>
          <td>${escapeHtml(lead.email)}</td>
          <td>${lead.contactType === 'person' ? '👤 Person' : '📧 Admin'}</td>
          <td>${lead.contactName ? escapeHtml(lead.contactName) : '-'}</td>
          <td>${lead.dateContacted || '-'}</td>
          <td>${lead.notes ? escapeHtml(lead.notes) : '-'}</td>
        </tr>
      `,
        )
        .join('\n')}
    </tbody>
  </table>
  `;
}

/**
 * Escape HTML special characters
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Save HTML report to file
 * @param {string} html
 * @param {string} outputPath
 */
export function saveHtmlReport(html, outputPath) {
  fs.writeFileSync(outputPath, html, 'utf-8');
}
