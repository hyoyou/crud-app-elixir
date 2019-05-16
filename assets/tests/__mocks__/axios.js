const fs = require('fs');

class MockAxios {
  constructor() {
    this.lastURI = '';
    this.lastGoal = '';
    this.lastHeader = '';
  }

  setLastURI(uri) { this.lastURI = uri; }
  getLastURI() { return this.lastURI; }

  setLastGoal(goal) { this.lastGoal = goal; }
  getLastGoal() { return this.lastGoal; }

  setLastHeader(header) { this.lastHeader = header; }
  getLastHeader() { return this.lastHeader; }

  get(uri) {
    this.setLastURI(uri);
    if (uri === '/api/goals/achieved') {
      return new Promise((resolve, reject) => {
        fs.readFile(`./tests/__mockData__${uri}.json`, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.parse(data));
        });
      });
    }

    return new Promise((resolve, reject) => {
      fs.readFile(`./tests/__mockData__${uri}.json`, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(JSON.parse(data));
      });
    });
  }

  post(uri, goal, header) {
    this.setLastURI(uri);
    this.setLastGoal(goal);
    this.setLastHeader(header);

    return new Promise((resolve, reject) => {
      resolve({ data: { data: { activity: `${goal.goal.activity}`, location: `${goal.goal.location}` }}})
    });
  }

  patch(uri, goal, header) {
    this.setLastURI(uri);
    this.setLastGoal(goal);
    this.setLastHeader(header);
    return new Promise((resolve, reject) => {
      resolve([
        { 
          id: 1,
          activity: 'swim with sharks',
          is_achieved: true,
          location: 'the Bahamas' 
        }
      ]);
    });
  }

  delete(uri, goal, header) {
    this.setLastURI(uri);
    this.setLastGoal(goal);
    this.setLastHeader(header);
    return new Promise((resolve, reject) => {
      resolve(
        { 
          data: {
            data: {
              id: 2,
              activity: 'feed flamingos',
              is_achieved: false,
              location: 'Aruba'
            }
          }
        }
      );
    });
  }
}

export default new MockAxios();