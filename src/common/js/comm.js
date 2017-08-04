function formatTimeBySec(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }
  let hour = parseInt(time / 3600);
  time = time % 3600;
  let minute = parseInt(time / 60);
  time = time % 60;
  let second = time;
  return ([hour, minute, second]).map(function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n
  }).join(':')
}
// 显示分秒
function formatSec(second) {
  let min = Math.floor(second / 60);
  let sec = Math.floor(second % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  let minString = min.toString();
  let secString = sec.toString();
  return minString + ':' + secString;
}
function formatSeconds(value) {
  let second = parseInt(value);// 秒
  let minute = 0;// 分
  let hour = 0;// 小时
  if (second > 60) {
    minute = parseInt(second / 60);
    second = parseInt(second % 60);
    if (minute > 60) {
      hour = parseInt(minute / 60);
      minute = parseInt(minute % 60);
    }
  }
  let result = "" + parseInt(second) + "秒";
  if (minute > 0) {
    result = "" + parseInt(minute) + "分" + result;
  }
  if (hour > 0) {
    result = "" + parseInt(hour) + "小时" + result;
  }
  return result;
}
/**
 * 时间格式化
 */
export function formatDate(time) {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  let second = date.getSeconds();
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

// export default {
//   formatTimeBySec:formatTimeBySec,
//   formatSeconds:formatSeconds,
//   formatSec:formatSec,
//   formatDate:formatDate
// }
