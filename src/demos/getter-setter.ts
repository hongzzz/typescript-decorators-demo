function doubleGetter(value: any, context: ClassGetterDecoratorContext) {
  // console.log(value, context);
  return function (this: any) {
    const result = value.call(this) * 2;
    console.log(
      "[doubleGetter]",
      "originalValue:",
      value.call(this),
      "doubleValue:",
      result,
    );
    return result;
  };
}

function doubleSetter(value: any, context: ClassSetterDecoratorContext) {
  // console.log(value, context);
  return function (this: any, val: number) {
    const doubleValue = val * 2;
    console.log(
      "[doubleSetter]",
      "originalValue:",
      val,
      "doubleValue:",
      doubleValue,
    );
    return value.call(this, doubleValue);
  };
}

class Counter {
  _num: number;
  constructor() {
    this._num = 0;
  }
  @doubleGetter
  get num() {
    return this._num;
  }

  @doubleSetter
  set num(val: number) {
    this._num = val;
  }
}

const counter = new Counter();

counter.num = 1;
console.log(counter.num);
