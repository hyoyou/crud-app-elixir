<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <h3>Add to the Bucket!</h3>
    <form>
      I want to <input type="text" name="activity"> in <input type="text" name="place">.
      <input type="submit" value="Add">

    </form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
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