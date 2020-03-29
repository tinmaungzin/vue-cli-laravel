<template>
  <div id="app">
    <div id="nav">

        <router-link class="nav-item"  v-if="token" to="/create">
            <button class="btn btn-primary" >
                Add Employee
            </button>
        </router-link>


        <router-link class="nav-item" v-if="token" to="/">
            <button class="btn btn-primary">
                Home
            </button>
        </router-link>



        <a v-if="token" class="nav-item" href="#" @click.prevent="logout">
            <button class="btn btn-danger" >
                Logout
            </button>
        </a>

    </div>
      <router-view></router-view>
  </div>
</template>

<style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }

    #nav {
      padding: 30px;
        text-align: center;
    }

    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }

    #nav a.router-link-exact-active button {
      /*color: green;*/
    }
    .nav-item{
        padding: 85px;
    }
</style>

<script>

    import {onLogout} from "./vue-apollo";

    export default {
        data(){
            return{
                token: localStorage.getItem('apollo-token')
            }
        },
        methods: {
            logout(){
                onLogout(this.$apollo.provider.defaultClient);
                this.$router.push('/')
                location.reload();

            }
        }
    }

</script>


