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
import axios from 'axios'

export default {
  name: 'AchievedGoals',
  props: {
    msg: String
  },
  data () {
    return {
      goals: [],
      error: null,
      uri: process.env.VUE_APP_API_URI
    }
  },
  created () {
    this.fetchAchievedGoals()
  },
  methods: {
    fetchAchievedGoals: async function () {
      let achievedIndexUrl = this.uri + "/achieved"
      this.goals = []

      let goalsData = await axios.get(achievedIndexUrl)
      this.goals = goalsData.data.data
      return this.goals
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