const fs = require('fs')

const mockIndex = jest.fn((uri) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./tests/__mockData__${uri}.json`, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
})

const mockPost = jest.fn((uri, goal, header) => {
  return (goal.goal)
})

module.exports = {
  get: mockIndex,
  post: mockPost,
  create: jest.fn(function() {
    return this
  })
}