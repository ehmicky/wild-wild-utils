// Retrieve class instances with both own and inherited properties
export const getChild = function () {
  return new Child()
}

/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation */
class Parent {}

Parent.prototype.inherited = 'inherited'

class Child extends Parent {
  constructor() {
    super()
    this.own = 'own'
  }
}
/* eslint-enable fp/no-class, fp/no-this, fp/no-mutation */
