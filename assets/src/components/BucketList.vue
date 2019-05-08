<template>
  <div class="bucket-list">
    <h1>{{ msg }}</h1>
    <h3>Current Goals</h3>
      <div class="list-of-goals">
        <ul id="current-goals">
          <li v-for="goal in goals" :key="goal.id" :id="'goal-' + goal.id">
            I want to {{ goal.activity }} in {{ goal.location }}.
            <button :id="'achieved-btn-' + goal.id" name="achieved-btn" v-on:click.prevent="updateGoal(goal.id)"><i class="fas fa-check-circle"></i></button>
          </li>
        </ul>
      </div>
    <h3>Add to the Bucket!</h3>
      <form id="new-goal">

        <p id="errors" v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </p>

        <p>
          I want to 
          <input 
            type="text" 
            name="activity" 
            v-model="activity" 
            data-activity placeholder="insert activity here!"
          > 
          in 
          <input 
            type="text" 
            name="location" 
            v-model="location" 
            data-location placeholder="insert location here!"
          >
          .

          <button id="submit-btn" type="submit" name="submit" v-on:click.prevent="checkForm">Add</button>
        </p>
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
      errors: [],
      uri: process.env.VUE_APP_API_URI
    }
  },
  created () {
    this.fetchGoals()
  },
  methods: {
    fetchGoals: async function () {
      this.goals = []

      let goalsData = await axios.get(this.uri)
      this.goals = goalsData.data.data
      return this.goals
    },
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
    updateGoal: async function (goalId) {
      let patchUrl = this.uri + "/" + goalId

      await axios.patch(patchUrl,
        { goal: { id: goalId, is_achieved: true } },
        { headers: {
          'Content-type': 'application/json',
        }}
      )

      this.$router.push("achieved")
    },
    checkForm: function () {
      if (this.activity !== "" && this.location !== "") {
        this.postGoal();
      }

      this.errors = [];

      if (this.activity === "") {
        this.errors.push('Activity is required.');
      }

      if (this.location === "") {
        this.errors.push('Location is required.');
      }
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
  button[name="achieved-btn"] {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  #errors {
    color: red;
    font-size: 0.9em;
  }
</style>