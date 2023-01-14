import 'reflect-metadata';

function Inject(target: any, key: string) {
  target[key] = new (Reflect.getMetadata('design:type', target, key))();
}

class A {
  sayHello() {
    console.log('Hi! ');
  }
}

class B {
  @Inject // The line code equal to execute `@Reflect.metadata('design: type', A)` when after compiled
  a!: A;

  say() {
    this.a.sayHello(); // Don't need to instantiate the class A
  }
}

new B().say();
