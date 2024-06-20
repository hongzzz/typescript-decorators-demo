function fieldD(val: any, context: ClassFieldDecoratorContext) {
  // console.log(val, context);
  return function (initVal: any) {
    console.log(initVal, context.name);
    return initVal + 1;
  };
}

class A {
  @fieldD
  name: string = "name";

  @fieldD
  age: number = 18;

  @fieldD
  static staticName: string = "staticName";
}

const a = new A();
console.log(a);
