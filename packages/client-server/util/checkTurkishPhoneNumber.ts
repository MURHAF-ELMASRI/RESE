const turkishPhoneRegExp = /(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})/;

export default function checkTurkishPhoneNumber(phone: string) {
  return phone.match(turkishPhoneRegExp);
}
