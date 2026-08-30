const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const lock = LockService.getScriptLock();
    lock.waitLock(30000);

    const props = PropertiesService.getScriptProperties();
    const sheetId = props.getProperty('SHEET_ID');
    if (!sheetId) return json({ok:false,message:'Backend is not configured with a Google Sheet.'}, 500);

    const ss = SpreadsheetApp.openById(sheetId);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    ensureHeader(sheet);

    const idNum = nextNumber('REG');
    const registrationId = `V26-${String(new Date().getFullYear()).slice(-2)}-${String(idNum).padStart(4,'0')}`;
    let teamId = '';
    const teamEvent = ['Paper Presentation','Glider Competition','Technical Quiz','Line Follower','Water Rocketry','Free Fire','Carrom','IPL Auction','Treasure Hunt'].includes(String(data.event||''));
    if (teamEvent) teamId = `V26-T-${String(idNum).padStart(4,'0')}`;

    const row = [
      new Date(), registrationId, teamId, data.event || '', data.name || '', data.mobile || '',
      data.collegeRegistrationNumber || '', data.collegeName || '', data.department || '', data.year || '',
      data.teamName || '', data.memberCount || '', data.topic || '', data.software || '',
      JSON.stringify(data.members || {})
    ];
    sheet.appendRow(row);

    lock.releaseLock();
    return json({ok:true,registrationId,teamId});
  } catch (err) {
    return json({ok:false,message:String(err && err.message ? err.message : err)}, 500);
  }
}

function doGet() { return json({ok:true,service:'Vaagai 2k26 registration backend'}); }

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow(['Timestamp','Participant ID','Team ID','Event','Primary Participant','Mobile','College Registration No.','College Name','Department','Year','Team Name','Member Count','Paper Topic','Software','Additional Members JSON']);
  sheet.setFrozenRows(1);
}

function nextNumber(prefix) {
  const props = PropertiesService.getScriptProperties();
  const key = `${prefix}_SEQ`;
  const n = Number(props.getProperty(key) || '0') + 1;
  props.setProperty(key, String(n));
  return n;
}

function json(obj, code) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* One-time setup in Apps Script:
 * 1) Create a Google Sheet and copy its ID into Script Properties as SHEET_ID.
 * 2) Deploy as a Web app: Execute as you, access Anyone.
 * 3) Copy the Web App URL into CONFIG.endpoint in registration-app.js.
 * The resulting Google Sheet can be opened in Excel or exported as .xlsx.
 */
