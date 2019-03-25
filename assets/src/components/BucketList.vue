<template>
  <div class="bucket-list">
    <div class="error" v-if="error">
        {{ error }}
    </div>

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
          I want to <input type="text" name="activity" v-model="activity" placeholder="insert activity here!"> 
          in <input type="text" name="location" v-model="location" placeholder="insert location here!">.

          <button type="submit" name="submit" v-on:click.prevent="postGoal">Add</button>
        </div>
      </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BucketList',
  props: {
    msg: String
  },
  data () {
    return {
      goals: [],
      activity: '',
      location: '',
      error: null
    }
  },
  created () {
    this.fetchGoals()
  },
  methods: {
    postGoal: function () {
      this.newGoal = { activity: this.activity, location: this.location }
      axios.post(`http://localhost:4000/api/goals`,
        { goal: this.newGoal },
        { headers: {
          'Content-type': 'application/json',
        }}
      )
      this.goals.push(this.newGoal)
      this.activity = this.location = ''
    },
    fetchGoals: function () {
      this.error = this.goals = null

      axios.get(`http://localhost:4000/api/goals`)
      .then(response => {
        this.goals = response.data.data
      })
      .catch(error => {
        this.error = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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