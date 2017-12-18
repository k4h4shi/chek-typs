# chek-typs [![Build Status](https://travis-ci.org/k4h4shi/chek-typs.svg?branch=master)](https://travis-ci.org/k4h4shi/chek-typs)
Simple type checkTypeser for plain JavaScript.

inspired by [How to better checkTypes data types in javascript - Webbjocke](https://www.webbjocke.com/javascript-check-data-types/).
## Usage
```javascript
const checkTypes = require('chek-typs');

checkTypes('string', 'hello world'); // => true
checkTypes('number', 10); // => true
checkTypes('boolean', true); // => true
checkTypes('array', [1, 2, 3]); // => true
checkTypes('object', {a: 'a'}); // => true
checkTypes('function', () => {}); // => true
checkTypes('null', null); // => true
checkTypes('regexp', /.*/); // => true
checkTypes('date', new Date); // => true
checkTypes('symbol', Symbol('string')) // => true

const shape = {
  name: {
    firstName: 'string',
    lastName: 'string'
  },
  age: 'number',
  married: 'boolean'
}

checkTypes('objectOf', {
  name: {
    firstName: 'kotaro',
    lastName: 'takahashi'
  },
  age: 23,
  married: false
}, shape) // => true;

checkTypes('objectOf', {}, shape) // => false;
```

## API
```
checkTypes(type, value, [shape])
```

### type
type name string:

- string
- number
- boolean
- array
- object
- function
- null
- regexp
- date
- symbol
- objectOf

### value
value to checkTypes:

### shape
when type is `objectOf` the parameter is required.
an object that has key as propName, value as propType.

#### exapmle
```
{
  name: {
    firstName: 'string',
    lastName: 'string'
  },
  age: 'number',
  married: 'boolean'
}
```

## License
MIT

## Author
[Kotaro Takahashi@k4h4shi](https://twitter.com/k4h4shi)