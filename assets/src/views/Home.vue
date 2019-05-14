<template>
  <div class="home">
    <BucketList msg="Travel Bucket List" />
  </div>
</template>

<script>
// @ is an alias to /src
import BucketList from '@/components/BucketList.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    BucketList
  }
}
</script>