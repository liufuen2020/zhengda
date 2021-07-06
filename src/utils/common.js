import moment from 'moment'
export function triggerWindowResizeEvent () {
  let event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}
export function changeDate (data) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    for (let key in data) {
      if (/^\d{0,4}[-]\d{0,2}[-]\d{0,2}/.test(data[key])) {
      // if (/^\d{0,4}[-]\d{0,2}/.test(data[key])) {
        console.log(data[key])
        // if (/^\d{0,4}[-]\d{0,2}[-]\d{0,2}[ ]\d{0,2}[:]\d{0,2}[:]\d{0,2}$/.test(data[key])) {
        data[key] = moment(data[key])
      }
    }
  }
}
export function DateToString (data, format = 'YYYY-MM-DD') {
  for (let key in data) {
    if (data[key] instanceof moment) {
      data[key] = moment(data[key]).format(format)
    }
  }
}

export function debounce (fn, time = 300) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      fn.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, time);
  };
  // let last = null
  // return function () {
  //   let ctx = this
  //   let args = arguments
  //   console.log(args)
  //   clearTimeout(last)
  //   last = setTimeout(function () {
  //     fn.apply(ctx, args)
  //   }, time)
  // }
}
