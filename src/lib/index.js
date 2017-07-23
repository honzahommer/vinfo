import isVIN from 'validator/lib/isVIN';

import { CONTINENTS, COUNTRIES, MAKES, YEARS } from './const';
import { charsToInt, valByKeyBtw, valByKeyStr } from './utils';

class VINFO {
  constructor(vin) {
    if (!vin) {
      return new Error('`vin` is required');
    }

    this.vin = vin.toString();
  }

  validate(vin = this.vin) {
    return isVIN(vin);
  }

  continent() {
    return valByKeyBtw(CONTINENTS, charsToInt(this.vin.substring(0, 1)));
  }

  country() {
    return valByKeyBtw(COUNTRIES, charsToInt(this.vin.substring(0, 2)));
  }

  make() {
    const max = this.vin.substring(0, 4);
    const min = max.substring(0, max.substring(2, 3) === 9 ? 2 : 3);

    return valByKeyStr(MAKES, min) || valByKeyStr(MAKES, max);
  }

  year() {
    const val = valByKeyStr(YEARS, this.vin.substring(9, 10));
    const inc = '0123456789'.indexOf(this.vin.substring(6, 7)) !== -1 ? 0 : 30;

    return val + inc;
  }

  decode() {
    return !this.validate(this.vin)
      ? {
        success: false,
        errors: [{
          code: 400,
          message: '`vin` is invalid',
        }],
        result: {},
      } : {
        success: true,
        errors: [],
        result: {
          continent: this.continent(),
          country: this.country(),
          make: this.make(),
          year: this.year(),
        },
      };
  }
}

export default function (vin) {
  return new VINFO(vin);
}
