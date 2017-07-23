import { expect } from 'chai';
import vinfo from '../../src/lib/index';

/** @test {vinfo} */
describe('vinfo', () => {
  it('exists', () => {
    expect(vinfo).to.exist;
  });

  it('returns true', () => {
    expect(vinfo()).to.be.true;
  });
});
