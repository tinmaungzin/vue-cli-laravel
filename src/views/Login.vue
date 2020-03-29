<template>
    <div class="login">
        <div class="container">
            <form class="col-3 my-form" method="POST" @submit.prevent="login">
                <div class="form-group">
                    <input type="email" class="form-control" v-model="username" placeholder="Username or Email" >
                    <span v-if="validationErrors.username" class="text-danger">{{validationErrors.username[0]}}</span>

                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="Password" >
                    <span v-if="validationErrors.password" class="text-danger">{{validationErrors.password[0]}}</span>
                    <span v-if="validationErrors === err_msg " class="text-danger">{{validationErrors}}</span>

                </div>
                <button type="submit" class="btn btn-success btn-block">Login</button>
            </form>

        </div>

    </div>
</template>
<script>
    import { login_mutation } from '@/graphql'
    import { onLogin } from "../vue-apollo";

    export default {


        name: 'Login',
        data(){
            return {
                username: '',
                password: '',
                validationErrors: [],
                err_msg: 'Username or password Invalid!',
            }
        },
        methods:{
            login () {
                this.validationErrors = [];
                this.$apollo
                    .mutate({
                        mutation: login_mutation,
                        client: 'a',
                        variables: {
                            username: this.username,
                            password: this.password,
                        }
                    })
                    .then(response => {
                        console.log(response)
                        if(response){
                            onLogin(this.$apollo.provider.defaultClient,response.data.signIn[2]);
                            this.$router.replace('/');
                            location.reload();
                        }
                    })
                    .catch(error => {
                        let { graphQLErrors } = error;
                        if (graphQLErrors[0].extensions.category === "validation") {
                            this.validationErrors = graphQLErrors[0].extensions.validation;
                        }
                        if(graphQLErrors[0].extensions.category === "internal"){
                            this.validationErrors = this.err_msg
                        }
                    });
            }
        },


    }
</script>
<style>
    .container{
        text-align: center;
    }
    .my-form{
        display: inline-block;
        border: 1px solid gray;
        padding-top: 70px;
        padding-bottom: 70px;
        border-radius: 5px;
    }
    .text-danger{
        font-size: 12px;
    }
</style>
