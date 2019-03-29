<template>
  <div class="bucket-list">
    <h1>{{ msg }}</h1>
    <h3>Current Goals</h3>
      <div class="list-of-goals">
        <ul id="current-goals" v-for="goal in goals" :key="goal.id">
          <li>I want to {{ goal.activity }} in {{ goal.location }}.</li>
        </ul>
      </div>
    <h3>Add to the Bucket!</h3>
      <form>
        <div id="new-goal">
          I want to <input type="text" name="activity" v-model="activity" data-activity placeholder="insert activity here!"> 
          in <input type="text" name="location" v-model="location" data-location placeholder="insert location here!">.

          <button type="submit" name="submit" v-on:click.prevent="postGoal">Add</button>
        </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BucketList',
  props: {
    msg: String
  },
  data () {
    return {
      goals: [],
      activity: "",
      location: "",
      error: null,
      uri: process.env.VUE_APP_API_URI
    }
  },
  created () {
    this.fetchGoals()
  },
  methods: {
    postGoal: async function () {
      this.newGoal = { activity: this.activity, location: this.location }

      const getPromise = await axios.post(this.uri,
        { goal: this.newGoal },
        { headers: {
          'Content-type': 'application/json',
        }}
      )

      this.goals.push(this.newGoal)
      this.activity = this.location = ""
      return getPromise
    },
    fetchGoals: async function () {
      this.goals = []

      let goalsData = await axios.get(this.uri)
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>