<template>
  <div class="bucket-list">
    <h1>{{ msg }}</h1>
    <h3>Current Goals</h3>
      <ul id="current-goals" v-for="(goal, index) in goals" :key="index">
          <li>I want to {{ goal.activity }} in {{ goal.location }}.</li>
      </ul>
    <h3>Add to the Bucket!</h3>
      <form>
        <div id="new-goal">
          I want to <input type="text" name="activity" v-model="activity" placeholder="insert activity here!"> 
          in <input type="text" name="location" v-model="location" placeholder="insert location here!">.

          <button type="submit" name="submit" v-on:click="postGoal">Add</button>
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
      errors: []
    }
  },
  methods: {
    postGoal: function () {
      axios.post(`http://localhost:4000/api/goals`,
        { goal: { activity: this.activity, location: this.location } },
        { headers: {
          'Content-type': 'application/json',
        }}
      )
    }
  },
  mounted () {
    axios.get(`http://localhost:4000/api/goals`)
    .then(response => {
      this.goals = response.data.data
    })
    .catch(error => {
      this.errors.push(error)
    })
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