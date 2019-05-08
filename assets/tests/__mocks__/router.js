const push = jest.fn();

const $router = {
  push: jest.fn(),
}

module.exports = {
  push,
  $router
}