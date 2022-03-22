export default function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}:${minutes} ${ampm}`;
  const match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);
  return `${match[0]} ${time}`;
}
