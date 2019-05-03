const fs = require('fs')

const mockGet = jest.fn((uri) => {
  setLastURI(uri);
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
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
  return goal.goal
})

const mockPatch = jest.fn((uri, goal, header) => {
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
  return [
    { 
      "id": 2,
      "activity": "feed flamingos",
      "is_achieved": false,
      "location": "Aruba"
    }
  ]
})

let lastURI;
const setLastURI = (uri) => lastURI = uri;
const getLastURI = () => { return lastURI };

let lastGoal;
const setLastGoal = (goal) => lastGoal = goal;
const getLastGoal = () => { return lastGoal };

let lastHeader;
const setLastHeader = (header) => lastHeader = header;
const getLastHeader = () => { return lastHeader };

module.exports = {
  get: mockGet,
  post: mockPost,
  patch: mockPatch,
  create: jest.fn(function() {
    return this
  }),
  getLastURI: getLastURI,
  getLastGoal: getLastGoal,
  getLastHeader: getLastHeader
}