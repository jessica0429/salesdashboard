// ================================================
// Google Apps Script - Sales Dashboard API
// 구글 시트 → 대시보드 JSON API
// ================================================
// 사용법:
// 1. 구글 시트에서 확장 프로그램 > Apps Script 열기
// 2. 이 코드 전체를 붙여넣기
// 3. 저장 후 "배포" > "새 배포" > "웹 앱"으로 배포
// 4. 액세스: "모든 사용자" 로 설정
// 5. 배포 URL을 복사해서 Vercel 환경변수에 붙여넣기

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('미팅로그');
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0]; // 첫 번째 행 = 컬럼명

  const data = rows.slice(1).map((row, i) => {
    // points 컬럼은 줄바꿈(\n)으로 구분된 문자열로 입력
    const pointsRaw = getCellValue(headers, row, 'points');
    const points = pointsRaw
      ? pointsRaw.split('\n').map(p => p.trim()).filter(Boolean)
      : [];

    return {
      id: i + 1,
      company:    getCellValue(headers, row, 'company'),
      field:      getCellValue(headers, row, 'field'),
      date:       formatDate(getCellValue(headers, row, 'date')),
      stage:      getCellValue(headers, row, 'stage'),
      stageLabel: getCellValue(headers, row, 'stageLabel'),
      summary:    getCellValue(headers, row, 'summary'),
      overview:   getCellValue(headers, row, 'overview'),
      points:     points,
      nextAction: getCellValue(headers, row, 'nextAction'),
      contact:    getCellValue(headers, row, 'contact'),
    };
  }).filter(row => row.company); // 빈 행 제거

  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// 헤더 이름으로 셀 값 가져오기
function getCellValue(headers, row, key) {
  const idx = headers.indexOf(key);
  if (idx === -1) return '';
  const val = row[idx];
  return val !== undefined && val !== null ? String(val) : '';
}

// 날짜를 YYYY-MM-DD 형식으로 변환
function formatDate(value) {
  if (!value) return '';
  if (value instanceof Date) {
    return Utilities.formatDate(value, 'Asia/Seoul', 'yyyy-MM-dd');
  }
  return String(value);
}
