class PromiseFactory {
  createResolve(data) {
    return new Promise(function(resolve, reject) {
      resolve(data);
    });
  }

  createReject(data) {
    return new Promise(function(resolve, reject) {
      reject(data);
    });
  }
}

export default new PromiseFactory();