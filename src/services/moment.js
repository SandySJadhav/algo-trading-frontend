const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata');

const getISTTime = () => moment();

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC'
];

const getMomentPayload = (str) => {
  const expDate = str.substring(0, 2); // expDate = 31
  const month = str.substring(2, 5); // month = JAN
  const year = str.substring(5); // month = JAN
  const payload = {
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999
  };
  if (!isNaN(Number(expDate))) {
    payload.date = Number(expDate);
  }
  if (MONTHS.indexOf(month) !== -1) {
    payload.month = MONTHS.indexOf(month);
  }
  if (!isNaN(Number(year))) {
    payload.year = Number(year);
  }
  return payload;
};


module.exports = {
  MONTHS,
  getMomentPayload,
  getISTTime
}