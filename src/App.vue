<template>
  <v-app>
    <div id="app">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: null
  }),
  props: {
    source: String
  }
};
</script>
