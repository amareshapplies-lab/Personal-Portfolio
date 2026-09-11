# 📊 Auto-Save Messages to Excel & Receive Mobile Push Notifications

Your portfolio's **Contact & Hire** app is now set up to automatically:
1. Append all received contact form submissions row-by-row into an **Excel Spreadsheet (Google Sheets)**.
2. Send an **instant push notification to your mobile phone** with full message details and one-tap reply!

---

## 🚀 2-Minute Quick Setup Guide

### Step 1: Create your Spreadsheet
1. Open [Google Sheets](https://sheets.google.com) and create a **Blank spreadsheet**.
2. Name it: `Amaresh Portfolio - Contact Messages`.

### Step 2: Open Apps Script
1. In the top menu bar of your Google Sheet, click **Extensions** > **Apps Script**.
2. Erase any default code in the editor (`Code.gs`).
3. Open the file [`google-apps-script-setup.js`](./google-apps-script-setup.js) in this project, copy its entire contents, and paste it into the editor.

### Step 3: Deploy as a Web App
1. In the top right corner of the Apps Script page, click the blue **Deploy** button > **New deployment**.
2. Next to *Select type*, click the ⚙️ gear icon and select **Web app**.
3. Set the fields:
   - **Description**: `Portfolio Webhook`
   - **Execute as**: `Me (your Google email)`
   - **Who has access**: `Anyone` *(IMPORTANT: must be set to "Anyone" so visitors on your website can send the submission)*
4. Click **Deploy**.
5. Google will ask for authorization permissions:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced** (small link)
   - Click **Go to Untitled project (unsafe)**
   - Click **Allow**
6. Copy the **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 4: Add the URL to your project
Open [`.env`](./.env) in this project and paste your URL:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
*(Or paste it inside [`src/config/contactConfig.js`](./src/config/contactConfig.js))*.

---

## 📱 How the Mobile Notification Works
- The moment anyone sends a message on your website, Google Apps Script sends a direct priority email alert to `amareshapplies@gmail.com`.
- Your phone's Gmail / Mail app will chime and push an immediate mobile banner notification with the sender's email, subject, and the message content.
- Inside the notification, you can tap **Reply to Sender** to reply directly, or tap **Open in Google Sheets (Excel)** to view all leads in your spreadsheet!

## 📥 How to export or open in Microsoft Excel
- Open your Google Sheet anytime.
- Click **File > Download > Microsoft Excel (.xlsx)**.
- Or install the free **Google Sheets** app on your phone to view and manage your leads live on the go!
