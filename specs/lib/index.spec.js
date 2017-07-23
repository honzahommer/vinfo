import { expect } from 'chai';
import vinfo from '../../src/lib/index';

const vin = vinfo('WVWUK63B92P546818');
const res = vin.decode().result;
const eql = {
  continent: 'Europe',
  country: 'West Germany',
  make: 'Volkswagen',
  year: 2002,
};

/** @test {vinfo} */
describe('vinfo', () => {
  it('returns {}', () => {
    expect(vin).to.be.object;
  });

  describe('validate', () => {
    it('returns true', () => {
      expect(vin.validate()).to.be.true;
    });

    it('returns false', () => {
      expect(vin.validate('WVWUK63B82P546818')).to.be.false;
    });
  });

  describe('decode', () => {
    it('returns {}', () => {
      expect(res).to.be.object;
    });

    Object.keys(eql).forEach((key) => {
      it(`${key} is ${eql[key]}`, () => {
        expect(res[key]).to.be.equal(eql[key]);
      });
    });
  });
});
