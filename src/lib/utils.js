export function charsToInt(chars) {
  const int = 36;
  const inc = 10;

  return parseInt(chars.split('').map((char) => {
    const val = parseInt(char, int) - inc;

    return ((val < 0) ? (val + int) : val).toString(int);
  }).join(''), int);
}

export function valByKeyBtw(obj, val) {
  return Object.keys(obj).reduce((sum, key) => {
    const [min, max] = key.split('-').map(chars => charsToInt(chars));

    return (val >= min && val <= max) ? `${obj[key]}` : sum;
  }, undefined);
}

export function valByKeyStr(obj, key) {
  return (key in obj) && obj[key];
}

export default { charsToInt, valByKeyBtw, valByKeyStr };
