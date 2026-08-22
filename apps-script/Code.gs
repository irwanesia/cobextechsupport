/**
 * CobexTech — Contact form → Google Sheets (Apps Script Web App)
 *
 * SETUP:
 * 1. Buat Google Sheet baru, beri header di baris 1: Timestamp | Nama | Email | Pesan
 * 2. Extension > Apps Script, tempel kode ini, ganti SHEET_ID dengan ID sheet Anda
 *    (ambil dari URL: docs.google.com/spreadsheets/d/<SHEET_ID>/edit)
 * 3. Deploy > New deployment > Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Salin URL web app (…/exec) lalu tempel di assets/contact.js
 *    pada konstanta GAS_URL.
 */

var SHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID';
var SHEET_NAME = 'contact';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.getSheets()[0];
    sheet.appendRow([
      new Date(),
      String(data.name || '').trim(),
      String(data.email || '').trim(),
      String(data.message || '').trim()
    ]);
    return jsonResponse_({ result: 'success' });
  } catch (err) {
    return jsonResponse_({ result: 'error', message: String(err) });
  }
}

function doGet(e) {
  return jsonResponse_({ result: 'ok', service: 'CobexTech contact form' });
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}