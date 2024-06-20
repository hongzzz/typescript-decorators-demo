function log<This extends Object, Args extends any[], Return>(
  originalMethod: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<
    This,
    (this: This, ...args: Args) => Return
  >,
) {
  // console.log("log", context);
  const methodName = String(context.name);
  function replacementMethod(this: This, ...args: Args): Return {
    const className = String(this.constructor.name);
    console.log(`LOG: Entering method '${className}.${methodName}'.`);
    const result = originalMethod.call(this, ...args);
    console.log(`LOG: Exiting method '${className}.${methodName}'.`);
    return result;
  }
  return replacementMethod;
}

function catchErr(
  originalMethod: Function,
  context: ClassMethodDecoratorContext,
) {
  const methodName = String(context.name);
  return function (this: any, ...args: any[]) {
    const className = String(this.constructor.name);
    try {
      const result = originalMethod.call(this, ...args);
      return result;
    } catch (e) {
      console.error(`Catch A Error in method '${className}.${methodName}'.`, e);
      return null;
    }
  };
}

class BankService {
  @log
  callAPI() {
    console.log("call api");
  }

  // 组合装饰器
  @log
  @catchErr
  callAPIWithError() {
    throw new Error("error");
  }
}

const service = new BankService();
service.callAPI();
service.callAPIWithError();
console.log("----exit-----");
