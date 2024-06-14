function log(originalMethod: Function, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  function replacementMethod(this: any, ...args: any[]) {
    const className = String(this.constructor.name);
    console.log(`LOG: Entering method '${className}.${methodName}'.`);
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: Exiting method '${className}.${methodName}'.`);
    return result;
  }
  return replacementMethod;
}

class Animal {
  name: string;
  constructor(aName: string) {
    this.name = aName;
  }
  @log
  makeSound() {
    console.log(this.name, "make a sound");
  }
}

const cat = new Animal("cat");
cat.makeSound();
