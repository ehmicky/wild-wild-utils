// Retrieve class instances with both own and inherited properties
/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation */
export const getChild = function ({ own = 'own', inherited } = {}) {
  class Parent {}
  Parent.prototype.inherited = 'inherited'

  class Child extends Parent {
    constructor() {
      super()
      this.own = own

      if (inherited !== undefined) {
        this.inherited = inherited
      }
    }
  }
  return new Child()
}
/* eslint-enable fp/no-class, fp/no-this, fp/no-mutation */
