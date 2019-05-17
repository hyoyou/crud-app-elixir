<template>
  <div class="index">
    <h1>Achieved Goals</h1>
    <div class="list-of-achieved-goals">
      <ul id="achieved-goals">
        <li v-for="goal in goals" :key="goal.id" :id="'goal-' + goal.id">
          <i class="fas fa-check-circle"></i> {{ goal.activity }} in {{ goal.location }}.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HttpClient from '../services/httpClient'

export default {
  name: 'achieved-list',
  props: {
    httpClient: Object
  },
  data () {
    return {
      goals: [],
      error: [],
      uri: process.env.VUE_APP_API_URI
    }
  },
  created () {
    this.fetchAchievedGoals()
  },
  methods: {
    fetchAchievedGoals: async function () {
      let achievedIndexUrl = this.uri + "/achieved"

      const httpClient = new HttpClient(this.$props.httpClient)
      await httpClient.getAllGoals(achievedIndexUrl)
      .then(response => {
        this.goals = response.data.data
      })
      .catch(error => {
        this.errors.push(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
</style>