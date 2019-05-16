<template>
  <div class="achieved-home">
    <AchievedList :httpClient="getHttpClient" />
  </div>
</template>

<script>
// @ is an alias to /src
import AchievedList from '@/components/AchievedList.vue'
import axios from 'axios'

export default {
  name: 'achieved-home',
  components: {
    AchievedList
  },
  computed: {
    getHttpClient() {
      return axios
    }
  },
}
</script>