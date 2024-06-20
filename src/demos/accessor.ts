function readonly<This, Return = number>(
  target: ClassAccessorDecoratorTarget<This, Return>,
  context: ClassAccessorDecoratorContext<This, Return>,
) {
  const result: ClassAccessorDecoratorResult<This, Return> = {
    get(this: This) {
      return target.get.call(this);
    },
    set(value: Return) {
      throw new Error(
        `Cannot assign to read-only property '${String(context.name)}'.`,
      );
    },
    init(this: This, value: Return) {
      console.log("init value", value);
      return value;
    },
  };

  return result;
}

class C {
  @readonly
  accessor x: number = 1;
}

const c = new C();

console.log(c.x);
c.x = 10;
console.log(c.x);
