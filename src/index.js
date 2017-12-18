/**
 * check type of given value is string.
 * @param {String} type
 * @param {*} value
 * @param {*} shape
 * @return is given type is expected or not.
 */
export default function checkType(type, value, shape) {
  switch(type) {
    case 'string': return isString(value);
    case 'number': return isNumber(value);
    case 'boolean': return isBoolean(value);
    case 'array': return isArray(value);
    case 'function': return isFunction(value);
    case 'object': return isObject(value);
    case 'null': return isNull(value);
    case 'regexp': return isRegExp(value);
    case 'error': return isError(value);
    case 'date': return isDate(value);
    case 'symbol': return isSymbol(value);
    case 'objectOf': return isObjectOf(value, shape);
    default: throw new Error(`given type ${type} is invalid`);
  }
}

/**
 * check type of given value is string.
 * @param {*} value
 * @return given value is string or not.
 */
function isString (value) {
  return typeof value === 'string' || value instanceof String;
};

/**
 * check type of given value is number.
 * @param {*} value
 * @return given value is number or not.
 */
function isNumber (value) {
  return typeof value === 'number' && isFinite(value);
};

/**
 * check type of given value is boolean.
 * @param {*} value
 * @return given value is boolean or not.
 */
function isBoolean (value) {
  return typeof value === 'boolean';
};

/**
 * check type of given value is array.
 * @param {*} value
 * @return given value is array or not.
 */
function isArray (value) {
  return Array.isArray(value);
};

/**
 * check type of given value is function.
 * @param {*} value
 * @return given value is function or not.
 */
function isFunction (value) {
  return typeof value === 'function';
};

/**
 * check type of given value is object.
 * @param {*} value
 * @return given value is object or not.
 */
function isObject (value) {
  return !isNull(value) && value && typeof value === 'object' && value.constructor === Object;
};

/**
 * check type of given value is null.
 * @param {*} value
 * @return given value is null or not.
 */
function isNull (value) {
  return value === null;
}

/**
 * check type of given value is regexp.
 * @param {*} value
 * @return given value is regexp or not.
 */
function isRegExp (value) {
  return !isNull(value) && value && typeof value === 'object' && value.constructor === RegExp;
};

/**
 * check type of given value is error.
 * @param {*} value
 * @return given value is error or not.
 */
function isError (value) {
  return value instanceof Error && typeof value.message !== 'undefined';
};

/**
 * check type of given value is date.
 * @param {*} value
 * @return given value is date or not.
 */
function isDate (value) {
  return value instanceof Date;
};

/**
 * check type of given value is symbol.
 * @param {*} value
 * @return given value is symbol or not.
 */
function isSymbol (value) {
  return typeof value === 'symbol';
};

/**
 * check value has required shape.
 * @param {*} value
 * @param {*} shape
 * @return value has required shape or not.
 */
function isObjectOf(value, shape) {
  if (!isObject(value) || !isObject(shape)) {
    return false;
  }
  const props = Object.keys(shape);
  return props.every((prop) => {
    const actual = value[prop];
    const expected = shape[prop];
    if (isObject(actual)) {
      return isObjectOf(actual, expected)
    } else {
      try {
        return checkType(expected, actual);
      } catch (e) {
        return false;
      }
    }
  })
}