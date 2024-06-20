import { Constructor } from "../types";

class InstanceCollector {
  instances = new Set();
  install = <Class extends Constructor>(
    value: Class,
    context: ClassDecoratorContext,
  ) => {
    const _this = this;
    return class extends value {
      constructor(...args: any[]) {
        console.log(
          "class constructor",
          context.name,
          context.metadata,
          context.kind,
        );
        super(...args);
        _this.instances.add(this);
      }
    };
  };
}

const collector = new InstanceCollector();

@collector.install
class MyClass {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const inst1 = new MyClass("1");
const inst2 = new MyClass("2");
const inst3 = new MyClass("3");

console.log("instances: ", collector.instances);
