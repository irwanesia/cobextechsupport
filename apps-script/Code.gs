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
var BLOG_SHEET_NAME = 'articles';
var BLOG_HEADERS = ['ID', 'Published At', 'Title ID', 'Title EN', 'Slug', 'Category ID', 'Category EN', 'Excerpt ID', 'Excerpt EN', 'Content ID', 'Content EN', 'Status', 'Updated At'];
var BLOG_LEGACY_HEADERS = ['ID', 'Published At', 'Title', 'Slug', 'Category', 'Excerpt', 'Content', 'Status', 'Updated At'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'save_article') return saveArticle_(data);

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
  if (e && e.parameter && e.parameter.action === 'articles') {
    return jsonpResponse_(e, { result: 'success', articles: readArticles_(false) });
  }
  if (e && e.parameter && e.parameter.action === 'admin_articles') {
    if (!isValidAdminKey_(e.parameter.key)) {
      return jsonpResponse_(e, { result: 'error', message: 'Unauthorized' });
    }
    return jsonpResponse_(e, { result: 'success', articles: readArticles_(true) });
  }
  return jsonResponse_({ result: 'ok', service: 'CobexTech contact form' });
}

function saveArticle_(data) {
  if (!isValidAdminKey_(data.key)) {
    return jsonResponse_({ result: 'error', message: 'Unauthorized' });
  }

  var titleId = String(data.titleId || '').trim();
  var titleEn = String(data.titleEn || '').trim();
  var slug = String(data.slug || '').trim().toLowerCase();
  var categoryId = String(data.categoryId || '').trim();
  var categoryEn = String(data.categoryEn || '').trim();
  var excerptId = String(data.excerptId || '').trim();
  var excerptEn = String(data.excerptEn || '').trim();
  var contentId = String(data.contentId || '').trim();
  var contentEn = String(data.contentEn || '').trim();
  var status = data.status === 'published' ? 'published' : 'draft';
  if (!titleId || !slug || !categoryId || !excerptId || !contentId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return jsonResponse_({ result: 'error', message: 'Lengkapi kolom Indonesia dan periksa format slug.' });
  }

  var sheet = getBlogSheet_();
  var rows = sheet.getDataRange().getValues();
  var now = new Date();
  var id = Utilities.getUuid();
  var publishedAt = data.publishedAt ? new Date(data.publishedAt) : now;
  var row = [id, publishedAt, titleId, titleEn, slug, categoryId, categoryEn, excerptId, excerptEn, contentId, contentEn, status, now];
  var rowIndex = rows.findIndex(function(existing, index) {
    return index > 0 && String(existing[4]) === slug;
  });

  if (rowIndex >= 1) {
    row[0] = rows[rowIndex][0];
    row[1] = rows[rowIndex][1] || publishedAt;
    sheet.getRange(rowIndex + 1, 1, 1, BLOG_HEADERS.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
  return jsonResponse_({ result: 'success', slug: slug });
}

function getBlogSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(BLOG_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(BLOG_SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(BLOG_HEADERS);
  else {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (JSON.stringify(headers) === JSON.stringify(BLOG_LEGACY_HEADERS)) {
      var oldRows = sheet.getLastRow() > 1
        ? sheet.getRange(2, 1, sheet.getLastRow() - 1, BLOG_LEGACY_HEADERS.length).getValues()
        : [];
      var migratedRows = [BLOG_HEADERS].concat(oldRows.map(function(row) {
        return [row[0], row[1], row[2], '', row[3], row[4], '', row[5], '', row[6], '', row[7], row[8]];
      }));
      sheet.clearContents();
      sheet.getRange(1, 1, migratedRows.length, BLOG_HEADERS.length).setValues(migratedRows);
    } else if (JSON.stringify(headers) !== JSON.stringify(BLOG_HEADERS)) {
      throw new Error('Header tab articles tidak sesuai. Periksa struktur kolom sebelum melanjutkan.');
    }
  }
  return sheet;
}

function readArticles_(includeDrafts) {
  var sheet = getBlogSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, BLOG_HEADERS.length).getValues()
    .filter(function(row) { return includeDrafts || row[11] === 'published'; })
    .map(function(row) {
      return {
        id: String(row[0]),
        publishedAt: row[1] instanceof Date ? row[1].toISOString() : String(row[1]),
        titleId: String(row[2]),
        titleEn: String(row[3]),
        slug: String(row[4]),
        categoryId: String(row[5]),
        categoryEn: String(row[6]),
        excerptId: String(row[7]),
        excerptEn: String(row[8]),
        contentId: String(row[9]),
        contentEn: String(row[10]),
        status: String(row[11]),
        updatedAt: row[12] instanceof Date ? row[12].toISOString() : String(row[12])
      };
    })
    .sort(function(a, b) { return new Date(b.publishedAt) - new Date(a.publishedAt); });
}

function isValidAdminKey_(key) {
  var expected = PropertiesService.getScriptProperties().getProperty('BLOG_ADMIN_KEY');
  return Boolean(expected && key && String(key) === expected);
}

function jsonpResponse_(e, obj) {
  var callback = String(e.parameter.callback || '');
  if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(callback)) return jsonResponse_(obj);
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(obj) + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}