import axios from 'axios'

export default class Axios {
  get(uri) {
    axios.get(uri)
    .then(response => {
      return response
    })
  }

  post(uri, goal, headers) {
    axios.post(uri, goal, headers)
  }
}