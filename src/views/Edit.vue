<template>

    <div class="edit">
        <div class="container">
            <form class="col-4 my-form" method="POST" @submit.prevent="update()">
                <div class="form-group">
                    <input type="text" name="name" class="form-control" v-model="employee[0].name" placeholder="Name" ref="name">
                    <span v-if="validationErrors.name" class="text-danger">{{validationErrors.name[0]}}</span>
                </div>
                <div class="form-group">
                    <input type="email" name="email" class="form-control" v-model="employee[0].email" placeholder="Email" ref="email" >
                    <span v-if="validationErrors.email" class="text-danger">{{validationErrors.email[0]}}</span>
                </div>
                <div class="form-group">
                    <input type="text" name="phone" class="form-control" v-model="employee[0].phone" placeholder="Phone Number" ref="phone" >
                    <span v-if="validationErrors.phone" class="text-danger">{{validationErrors.phone[0]}}</span>
                </div>
                <div class="form-group">
                    <textarea v-model="employee[0].address" name="address" class="form-control" id="" cols="30" rows="5" placeholder="Address" ref="address" ></textarea>
                    <span v-if="validationErrors.address" class="text-danger">{{validationErrors.address[0]}}</span>
                </div>

                <button type="submit" class="btn btn-success btn-block">Update Employee</button>
            </form>
        </div>

</div>
</template>

<script>

    import {employee_query, update_employee_mutation} from "../graphql";

    export default {
        name: 'Edit',
        data(){
            return{
                employee: {},
                id: this.$route.params.id,
                name: '',
                email: '',
                phone: '',
                address: '',
                validationErrors: []
            }
        },

        methods: {
            update () {
                this.$apollo
                    .mutate({
                        mutation: update_employee_mutation,
                        variables: {
                            id: this.id,
                            name: this.$refs.name.value,
                            email: this.$refs.email.value,
                            phone: this.$refs.phone.value,
                            address: this.$refs.address.value,
                        },
                    })
                    .then(response => {
                        console.log(response);
                        if(response){
                            this.$router.replace('/');
                        }
                    })
                    .catch(error => {
                        let { graphQLErrors } = error;
                        if (graphQLErrors[0].extensions.category === "validation") {
                            this.validationErrors = graphQLErrors[0].extensions.validation;
                        }
                    });
            }
        },

        apollo: {
            employee: {
                query: employee_query,
                variables() {
                    return {
                        id: this.id
                    }
                }
            },
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



