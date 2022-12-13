// Functions used as test helpers
export const returnFalse = () => false

export const returnTrue = () => true

export const isOne = (value) => value === 1

export const isNotOne = (value) => value !== 1

export const isObject = (value) => typeof value === 'object'

export const isNotObject = (value) => typeof value !== 'object'

export const isNamedTwo = ({ path }) => path[0] === 'two'

export const identity = (value) => value
