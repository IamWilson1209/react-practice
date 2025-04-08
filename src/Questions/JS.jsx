import React from 'react';

/* call() 綁定 */

function callname(prefix) {
  console.log(prefix + ' ' + this.brand);
}
let apple = {
  brand: 'apple',
};
let cat = {
  brand: 'cat',
};
callname.call(apple, 'This is a: ');

/* 物件導向 */

class Car {
  constructor(modal) {
    this.modal = modal;
  }
  drive() {
    console.log('Drive!!!');
  }
}

class Tesla extends Car {
  constructor(modal) {
    super(modal);
  }

  /* 重寫drive方法，繼承其他方法 */
  drive() {
    console.log('drive Tesla!!');
  }
}

const myCar = new Car('Tesla');
myCar.drive();

const JS = () => {
  return <div>JS</div>;
};

export default JS;
