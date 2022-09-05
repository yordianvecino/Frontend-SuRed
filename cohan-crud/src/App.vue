<template>
  <div id="app">
    <CrudPerson/>
  </div>
</template>

<script>
import CrudPerson from './components/CrudPerson.vue'

export default {
  name: 'App',
  components: {
    CrudPerson
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
