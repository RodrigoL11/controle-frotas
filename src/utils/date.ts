function concat(value: number){
  return value < 10 ? '0'+value : value;
}

export function toDateTime(secs: number) {
  var date = new Date(secs * 1000);

  return `${concat(date.getDate())}/${concat(date.getMonth()+1)}/${date.getFullYear()} ${concat(date.getHours())}:${concat(date.getMinutes())}`
}