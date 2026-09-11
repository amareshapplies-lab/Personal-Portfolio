/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: CONTACT FORM TO EXCEL (GOOGLE SHEETS) + MOBILE ALERTS
 * =========================================================================
 * 
 * INSTRUCTIONS TO SET UP (Takes ~2 minutes):
 * 
 * 1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *    Name it: "Amaresh Portfolio - Contact Messages"
 * 
 * 2. In the top menu, click on:
 *    Extensions > Apps Script
 * 
 * 3. Delete any default code in the editor (Code.gs) and paste this entire code.
 * 
 * 4. (Optional) Check NOTIFICATION_EMAIL below to verify it matches your email.
 * 
 * 5. In the top right corner, click on:
 *    "Deploy" > "New deployment"
 * 
 * 6. Under "Select type", click the gear icon (⚙️) and choose "Web app".
 * 
 * 7. Fill in the deployment details:
 *    - Description: "Portfolio Contact Form Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: must be Anyone so your website can send data)
 * 
 * 8. Click "Deploy".
 *    Google will ask you to "Authorize access" (Click Review permissions -> Advanced -> Go to Untitled project (unsafe) -> Allow).
 * 
 * 9. Copy the "Web app URL" (starts with https://script.google.com/macros/s/.../exec).
 * 
 * 10. Paste this URL into your portfolio's `.env` file:
 *     VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 *     (or inside src/config/contactConfig.js)
 * 
 * That's it! Every submission will now be:
 *  - Appended row-by-row in your Google Sheet (Excel file)
 *  - Instantly pushed to your mobile via Gmail notification!
 */

const NOTIFICATION_EMAIL = "amareshapplies@gmail.com";
const SHEET_NAME = "Messages";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it with styled headers
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        "ID",
        "Timestamp (IST)",
        "From (Sender Email)",
        "Subject",
        "Message",
        "Source URL"
      ];
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground("#1e293b");
      headerRange.setFontColor("#f8fafc");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Parse input data (supports JSON or Form encoded)
    let data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const id = "MSG-" + Utilities.getUuid().substring(0, 8).toUpperCase();
    const senderEmail = data.senderEmail || data.from || "Not provided";
    const subject = data.subject || "No Subject";
    const message = data.message || "No Message";
    const source = data.source || "Portfolio Contact Form";

    // 1. Append row to Excel / Google Sheet
    sheet.appendRow([id, timestamp, senderEmail, subject, message, source]);

    // Format new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 6).setVerticalAlignment("middle");

    // 2. Trigger Instant Mobile Notification via Email
    const emailSubject = `🚀 [Portfolio Lead] ${senderEmail}: "${subject}"`;
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border-radius: 16px; background-color: #0f172a; color: #f8fafc; border: 1px solid #334155;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #f97316; font-size: 20px;">✨ New Portfolio Contact Message</h2>
        </div>
        
        <p style="color: #94a3b8; font-size: 14px; margin-bottom: 20px;">
          Someone submitted a new message through your portfolio's <strong>Contact & Hire</strong> app. It has been automatically logged into your Excel spreadsheet.
        </p>

        <div style="background-color: #1e293b; padding: 18px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #475569;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #94a3b8; width: 100px;"><strong>Time (IST):</strong></td>
              <td style="padding: 6px 0; color: #ffffff;">${timestamp}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>From:</strong></td>
              <td style="padding: 6px 0; color: #38bdf8; font-weight: bold;">
                <a href="mailto:${senderEmail}" style="color: #38bdf8; text-decoration: none;">${senderEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #94a3b8;"><strong>Subject:</strong></td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${subject}</td>
            </tr>
          </table>
          
          <hr style="border: 0; border-top: 1px solid #334155; margin: 14px 0;" />
          
          <div>
            <span style="color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 6px;">Message Content:</span>
            <div style="background-color: #0f172a; padding: 14px; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; border: 1px solid #334155;">
${message}
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="mailto:${senderEmail}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 9999px; text-decoration: none; margin-right: 12px;">
            ✉️ Reply to ${senderEmail}
          </a>
          <a href="${ss.getUrl()}" style="display: inline-block; background-color: #334155; color: #cbd5e1; font-weight: bold; font-size: 14px; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">
            📊 Open in Google Sheets (Excel)
          </a>
        </div>

        <div style="text-align: center; margin-top: 30px; font-size: 11px; color: #64748b;">
          Reference ID: ${id} • Auto-generated by Amaresh Portfolio 2026 Webhook
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      replyTo: senderEmail,
      subject: emailSubject,
      htmlBody: htmlBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", id: id, timestamp: timestamp }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("✅ Amaresh Portfolio Contact Form Webhook is live and active! Send a POST request to append data.")
    .setMimeType(ContentService.MimeType.TEXT);
}
