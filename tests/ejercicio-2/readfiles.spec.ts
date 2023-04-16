import 'mocha';
import {expect} from 'chai';
import {ReadFile} from '../../src/ejercicio-2/readfiles.js'

describe('ReadFile tests', () => {
    const file1 = new ReadFile('./tests/ejercicio-2/helloworld.txt','lines')
    const file2 = new ReadFile('./tests/ejercicio-2/byeworld.txt','words')
    const file3 = new ReadFile('./tests/ejercicio-2/morning.txt','chars')
    it('ReadFile method test', () => {
        expect(file1.numOf).to.be.equal(1);
        expect(file2.numOf).to.be.equal(3);
        expect(file3.numOf).to.be.equal(20);
    });
});