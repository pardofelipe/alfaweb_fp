<template>
  <v-app>
        <nav-bar></nav-bar>
    <v-main>
      <transition mode="out-in" enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
     'nav-bar': NavBar
  },
};
</script>
<style>
.v-icon{
        font-size: 13px;
        margin-top: -2px;
        margin-right: 4px;
    }
.theme--light.v-application{
  background-color: #F5F5F5;
}
</style>
