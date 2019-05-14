const fs = require('fs')

const mockGet = jest.fn((uri) => {
  setLastURI(uri);
  if (uri === "/api/goals/achieved") {
    return new Promise((resolve, reject) => {
      fs.readFile(`./tests/__mockData__${uri}.json`, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(JSON.parse(data))
      })
    })
  }

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

  return new Promise((resolve, reject) => {
    resolve({ data: { data: { activity: `${goal.goal.activity}`, location: `${goal.goal.location}` }}})
  })
})

const mockPatch = jest.fn((uri, goal, header) => {
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
  return new Promise((resolve, reject) => {
    resolve([
      { 
        id: 1,
        activity: 'swim with sharks',
        is_achieved: true,
        location: 'the Bahamas' 
      }
    ])
  })
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