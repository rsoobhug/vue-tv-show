

<template>
  <div class="navContainer">
  <div id="nav">
    <router-link to="/">Home</router-link>
    <!-- <router-link to="/about">About</router-link> -->
     <!-- in the below way, no need to change the path/link in all folders 
     since it is already binded to the name 'About' in router/index.js -->
    <!-- <router-link :to="{name: 'About'}">About</router-link> -->
    <router-link :to="{name: 'TVShow'}">TVShow</router-link>

    <!-- back and forward implementation -->

    <!-- <button @click="redirect">Redirect</button>
    <button @click="back">back</button>
    <button @click="forward">forward</button> -->


  </div>
</div>
  <router-view/>
</template>

<script>

export default  {
  methods: {
//     redirect() {
//       this.$router.push({name: 'TVShow'})
//     },
//     back() {
//       this.$router.go(-1)

// },
// forward() {
//   this.$router.go(+1)

// }
  }
}

</script>

<style scoped>
.navContainer {
  display: flex;
  justify-content: center;
}
#nav {

    top: 0px;
    left:0px;
    justify-content: center;
    display: flex;
    position: absolute;
    width: 100%;
    margin:0 auto;
  background-color: #333;
  padding: 10px 200px;

  a {
    padding: 10px 40px;
  }
}


</style>