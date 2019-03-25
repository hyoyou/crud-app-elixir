<template>
  <div class="bucket-list">
    <h1>{{ msg }}</h1>
    <h3>Current Goals</h3>
      <ul id="current-goals">
        <li v-for="(goal, index) in goals" :key="index">
          I want to {{ goal.activity }} in {{ goal.location }}.
        </li>
      </ul>
    <h3>Add to the Bucket!</h3>
    <form class="submit-goal">
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
      goals: [
        { 
          activity: 'swim with sharks', 
          location: 'the Bahamas' 
        },
        { 
          activity: 'ski', 
          location: 'the Alps' 
        },
        { 
          activity: 'hike', 
          location: 'Yellowstone National Park' 
        }
      ],
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
  create () {
    this.goals.push(
      {
        'activity': this.activity,
        'location': this.location
      }
    );
  },
  
  created () {
    axios.get(`http://localhost:4000/api/goals`)
      .then(response => {
        this.goals.push({
          activity: response.goals.activity,
          location: response.goals.location
        })
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