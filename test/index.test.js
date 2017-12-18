import checkTypes from '../src/index';
import { expect } from 'chai';

describe('checkTypes', () => {
  it('is function', () => {
    expect(checkTypes).is.a('function');
  });

  const values = ['hello wolrd', 10, true, ['string', 0], {}, () => {}, null, /.*/, new Error(), new Date(), Symbol('string')];

  describe('when type is string', () => {
    it('return true if type of value is string', () => {
      expect(checkTypes('string', 'hello wolrd')).to.be.true;
    });
    describe('return false if type of value is not string', () => {
      const samples = values.slice(1, values.length - 1)
      checkReturnFalse('string', samples);
    });
  });

  describe('when type is number', () => {
    it('return true if type of value is number', () => {
      expect(checkTypes('number', 10)).to.be.true;
    });
    describe('return false if type of value is not number', () => {
      const samples = [...values.slice(0, 1), ...values.slice(2, values.length - 1)];
      checkReturnFalse('number', samples);
    });
  });

  describe('when type is boolean', () => {
    it('return true if type of value is boolean', () => {
      expect(checkTypes('boolean', true)).to.be.true;
    });
    describe('return false if type of value is not boolean', () => {
      const samples = [...values.slice(0, 2), ...values.slice(3, values.length - 1)];
      checkReturnFalse('boolean', samples);
    });
  });

  describe('when type is array', () => {
    it('return true if type of value is array', () => {
      expect(checkTypes('array', [])).to.be.true;
    });
    describe('return false if type of value is not array', () => {
      const samples = [...values.slice(0, 3), ...values.slice(4, values.length - 1)];
      checkReturnFalse('array', samples);
    });
  });

  describe('when type is object', () => {
    it('return true if type of value is object', () => {
      expect(checkTypes('object', {})).to.be.true;
    });
    describe('return false if type of value is not object', () => {
      const samples = [...values.slice(0, 4), ...values.slice(5, values.length - 1)];
      checkReturnFalse('object', samples);
    });
  });

  describe('when type is function', () => {
    it('return true if type of value is function', () => {
      expect(checkTypes('function', () => {})).to.be.true;
    });
    describe('return false if type of value is not function', () => {
      const samples = [...values.slice(0, 5), ...values.slice(6, values.length - 1)];
      checkReturnFalse('function', samples);
    });
  });

  describe('when type is null', () => {
    it('return true if type of value is null', () => {
      expect(checkTypes('null', null)).to.be.true;
    });
    describe('return false if type of value is not null', () => {
      const samples = [...values.slice(0, 6), ...values.slice(7, values.length - 1)];
      checkReturnFalse('null', samples);
    });
  });

  describe('when type is regexp', () => {
    it('return true if type of value is regexp', () => {
      expect(checkTypes('regexp', /.*/)).to.be.true;
    });
    describe('return false if type of value is not regexp', () => {
      const samples = [...values.slice(0, 7), ...values.slice(8, values.length - 1)];
      checkReturnFalse('regexp', samples);
    });
  });

  describe('when type is error', () => {
    it('return true if type of value is error', () => {
      expect(checkTypes('error', new Error())).to.be.true;
    });
    describe('return false if type of value is not error', () => {
      const samples = [...values.slice(0, 8), ...values.slice(9, values.length - 1)];
      checkReturnFalse('error', samples);
    });
  });

  describe('when type is date', () => {
    it('return true if type of value is date', () => {
      expect(checkTypes('date', new Date())).to.be.true;
    });
    describe('return false if type of value is not date', () => {
      const samples = [...values.slice(0, 9), ...values.slice(10, values.length - 1)];
      checkReturnFalse('date', samples);
    });
  });

  describe('when type is symbol', () => {
    it('return true if type of value is symbol', () => {
      expect(checkTypes('symbol', Symbol('string'))).to.be.true;
    });
    describe('return false if type of value is not symbol', () => {
      const samples = [...values.slice(0, 10), ...values.slice(11, values.length - 1)];
      checkReturnFalse('symbol', samples);
    });
  });

  describe('when type is objectOf', () => {
    const shape = {
      name: {
        firstName: 'string',
        lastName: 'string'
      },
      age: 'number',
      married: 'boolean'
    }

    it('return true if type of value is objectOf', () => {
      expect(checkTypes('objectOf', {
        name: {
          firstName: 'kotaro',
          lastName: 'takahashi'
        },
        age: 23,
        married: false
      }, shape)).to.be.true;
    });

    describe('return false if type of value is not symbol', () => {
      checkReturnFalse('objectOf', values, shape)
    });

  });
  describe('when type is invalid', () => {
    it('throw error if given type is invalid', () => {
      const fn = () => checkTypes('invalid', '');
      expect(fn).to.throw('given type invalid is invalid');
    });

  });
});


function checkReturnFalse(type, values, shape) {
  values.forEach((value) => {
    const s = typeof value === 'symbol' ? value.toString() : value;
    it(`return false if value is ${s}`, () => {
      if (shape) {
        expect(checkTypes(type, value, shape)).to.be.false;
      } else {
        expect(checkTypes(type, value)).to.be.false;
      }
    });
  })
}