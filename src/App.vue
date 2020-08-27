<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: "App",
    provide(){
      return{
        reload:this.reload
      }
    },
    data(){
      isRouterAlive:true
    },
    methods: {
      reload(){
        this.isRouterAlive=false
        this.$nextTick(function(){
          this.isRouterAlive=true
        })
      }
    },
};
</script>
<style> 
html,
body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    widows: 100%;
    height: 100%;
}
</style>
