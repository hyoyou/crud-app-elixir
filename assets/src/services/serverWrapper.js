import HEADERS from '../constants/http';

export default class ServerWrapper {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAllGoals(path) {
    return this.httpClient.get(path);
  }

  createNewGoal(path, payload) {
    return this.httpClient.post(path, payload, HEADERS);
  }

  updateGoal(path, payload) {
    return this.httpClient.patch(path, payload, HEADERS);
  }

  deleteGoal(path, payload) {
    return this.httpClient.delete(path, payload, HEADERS);
  }
}