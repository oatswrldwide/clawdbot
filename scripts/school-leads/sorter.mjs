/**
 * @typedef {Object} SchoolLead
 * @property {string} schoolName
 * @property {string} province
 * @property {string} email
 * @property {'person' | 'admin'} contactType
 * @property {string} [contactName]
 * @property {string} [dateContacted]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} SortedLeads
 * @property {Record<string, SchoolLead[]>} byProvince
 * @property {{ person: SchoolLead[], admin: SchoolLead[] }} byContactType
 */

/**
 * Sort school leads by province and contact type
 * @param {SchoolLead[]} leads
 * @returns {SortedLeads}
 */
export function sortLeads(leads) {
  const byProvince = {};
  const byContactType = {
    person: [],
    admin: [],
  };

  for (const lead of leads) {
    // Group by province
    if (!byProvince[lead.province]) {
      byProvince[lead.province] = [];
    }
    byProvince[lead.province].push(lead);

    // Group by contact type
    if (lead.contactType === 'person') {
      byContactType.person.push(lead);
    } else {
      byContactType.admin.push(lead);
    }
  }

  // Sort each province's leads alphabetically by school name
  for (const province of Object.keys(byProvince)) {
    byProvince[province].sort((a, b) =>
      a.schoolName.localeCompare(b.schoolName),
    );
  }

  // Sort contact type arrays by province, then school name
  byContactType.person.sort((a, b) => {
    if (a.province !== b.province) {
      return a.province.localeCompare(b.province);
    }
    return a.schoolName.localeCompare(b.schoolName);
  });

  byContactType.admin.sort((a, b) => {
    if (a.province !== b.province) {
      return a.province.localeCompare(b.province);
    }
    return a.schoolName.localeCompare(b.schoolName);
  });

  return { byProvince, byContactType };
}
