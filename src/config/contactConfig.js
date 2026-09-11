// Configuration for Portfolio Contact & Hire form
// Submissions are saved to Google Sheets (Excel) and trigger mobile push notifications

export const contactConfig = {
  // Google Apps Script Web App URL:
  googleScriptUrl: 
    import.meta.env.VITE_GOOGLE_SCRIPT_URL || 
    'https://script.google.com/macros/s/AKfycbxYxLcFfpBGr9QZ2lIv-HdMCAzUY8kAqRyzi5zPRVkTALl28csn73Sjuuq24Cn_Ow8u/exec',

  // Your notification email (where instant mobile alerts will arrive)
  notificationEmail: 'amareshapplies@gmail.com',
  
  // Optional: direct link to view your live Google Sheet (Excel)
  sheetUrl: ''
};
