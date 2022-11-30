// Retrieve class instances with both own and inherited properties
/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation */
export const getChild = function (opts = {}) {
  class Parent {}
  Parent.prototype.inherited = 'inherited'

  class Child extends Parent {
    constructor() {
      super()

      if (!('own' in opts)) {
        this.own = 'own'
      } else if (opts.own !== undefined) {
        this.own = opts.own
      }

      if ('inherited' in opts) {
        this.inherited = opts.inherited
      }
    }
  }
  return new Child()
}
/* eslint-enable fp/no-class, fp/no-this, fp/no-mutation */
