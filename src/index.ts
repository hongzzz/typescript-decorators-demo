class Animal {
  name: string;
  constructor(aName: string) {
    this.name = aName;
  }
  makeSound() {
    console.log(this.name, "make a sound");
  }
}

const cat = new Animal("cat");
cat.makeSound();
