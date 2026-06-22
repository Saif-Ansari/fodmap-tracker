export const WEBHOOK_KEY = 'gut_sheets_webhook_url';

/*
  Google Apps Script code to deploy as a Web App:

  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log')
      || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const d = JSON.parse(e.postData.contents);
    sheet.appendRow([d.date, d.type, d.time, d.detail, d.urgency, d.notes, d.minutesAfterWaking]);
    return ContentService.createTextOutput('ok');
  }

  Deploy → New deployment → Web App → Execute as: Me → Who has access: Anyone
*/

// Env var (set once in Vercel) takes priority over per-device localStorage fallback.
const getWebhookUrl = () =>
  import.meta.env.VITE_SHEETS_WEBHOOK_URL || localStorage.getItem(WEBHOOK_KEY) || null;

export const appendToSheet = (row) => {
  const url = getWebhookUrl();
  if (!url) return;
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(row),
  }).catch(() => {});
};

export const isSheetConfigured = () => !!getWebhookUrl();
export const isSheetFromEnv = () => !!import.meta.env.VITE_SHEETS_WEBHOOK_URL;
