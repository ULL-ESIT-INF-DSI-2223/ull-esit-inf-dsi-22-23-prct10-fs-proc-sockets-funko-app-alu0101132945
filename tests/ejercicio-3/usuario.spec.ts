import 'mocha';
import {expect} from 'chai';
import {Funko, FunkoGen, FunkoTipo} from '../../src//ejercicio-3/funko'
import {FunkoUserStorage} from '../../src/ejercicio-3/usuario.js'


describe('Funko methods tests', () => {
    const user1 = new FunkoUserStorage('user1')
    const user2 = new FunkoUserStorage('user2')
    const funko1 = new Funko(1,'Harry Potter','Harry Potter CoS 20th','p','pt','Harry Potter', 149,false,'',12)
    const funko2 = new Funko(2,'Snoop Dog','Snoop Dogg - (1 in 6 Chance of Receiving The Rare Chase Version','vg','m','Snoop Dog', 55,true,'rare chase version',12.89)
    const funko3 = new Funko(1,'Gwaihir with Gandalf','Funko pop','pr','pt','Lord of the Ring', 72,false,'mount pop',34.31)
    const funko4 = new Funko(2,'Spider man','Pop! Bobble: Marvel: Marvel Studios 10','vg','pt','Marvel: Marvel Studios', 440,true,'Iron Spider (Chrome)',39.54)
    
    user1.addFunko(funko1);
    user1.addFunko(funko2);
    user2.addFunko(funko1);
    user2.addFunko(funko2);
    it('addFunko test', () => {
        expect(user1.getFunko(1)).to.be.equal(funko1);
        expect(user1.getFunko(2)).to.be.equal(funko2);
        expect(user1.addFunko(funko1)).to.be.equal(console.error());
    });
    it('updateFunko test', () => {
        const funko5 = new Funko(5,'Spider man','Pop! Bobble: Marvel: Marvel Studios 10',FunkoTipo.vg,FunkoGen.pt,'Marvel: Marvel Studios', 440,true,'Iron Spider (Chrome)',39.54)
        user2.updateFunko(funko3)
        user2.updateFunko(funko4)

        expect(user2.getFunko(1)).to.be.equal(funko3);
        expect(user2.getFunko(2)).to.be.equal(funko4);
        expect(user1.updateFunko(funko5)).to.be.equal(console.error());
    });
    
    // it('removeFunko test', () => {
    //     user1.removeFunko(1)
    //     user2.removeFunko(1)
    //     expect(user1.getFunko(1)).to.be.equal(undefined);
    //     expect(user2.getFunko(1)).to.be.equal(undefined);
    // });    
});