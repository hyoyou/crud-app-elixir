const fs = require('fs');

const mockGet = jest.fn((uri) => {
  setLastURI(uri);
});

const mockPost = jest.fn((uri, goal, header) => {
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
});

const mockPatch = jest.fn((uri, goal, header) => {
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
});

const mockDelete = jest.fn((uri, goal, header) => {
  setLastURI(uri);
  setLastGoal(goal);
  setLastHeader(header);
});

let lastURI;
const setLastURI = (uri) => lastURI = uri;
const getLastURI = () => { return lastURI; };

let lastGoal;
const setLastGoal = (goal) => lastGoal = goal;
const getLastGoal = () => { return lastGoal; };

let lastHeader;
const setLastHeader = (header) => lastHeader = header;
const getLastHeader = () => { return lastHeader; };

module.exports = {
  create: jest.fn(function() {
    return this;
  }),
  get: mockGet,
  post: mockPost,
  patch: mockPatch,
  delete: mockDelete,
  getLastURI: getLastURI,
  getLastGoal: getLastGoal,
  getLastHeader: getLastHeader
};