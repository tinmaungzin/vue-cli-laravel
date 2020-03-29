<template>
    <div class="create">
        <div class="container">
            <form class="col-4 my-form" method="POST" @submit.prevent="create">
                <div class="form-group">
                    <input type="text" class="form-control" v-model="name" placeholder="Name" >
                    <span v-if="validationErrors.name" class="text-danger">{{validationErrors.name[0]}}</span>
                </div>
                <div class="form-group">
                    <input type="email" class="form-control" v-model="email" placeholder="Email" >
                    <span v-if="validationErrors.email" class="text-danger">{{validationErrors.email[0]}}</span>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="phone" placeholder="Phone Number" >
                    <span v-if="validationErrors.phone" class="text-danger">{{validationErrors.phone[0]}}</span>
                </div>
                <div class="form-group">
                    <textarea v-model="address" class="form-control" id="" cols="30" rows="5" placeholder="Address" ></textarea>
                    <span v-if="validationErrors.address" class="text-danger">{{validationErrors.address[0]}}</span>
                </div>


                <button type="submit" class="btn btn-success btn-block">Add Employee</button>
            </form>
        </div>

    </div>
</template>

<script>

    import { create_employee_mutation} from "../graphql";
    export default {
        name: 'Create',
        data(){
            return{
                name: '',
                email: '',
                phone: '',
                address: '',
                validationErrors: [],
                employees: [],

            }
        },
        methods: {

            create () {
                this.validationErrors = [];
                // const newEmployee = this.newEmployee;
                // this.newEmployee = '';
                this.$apollo
                    .mutate({
                        mutation: create_employee_mutation,
                        variables: {
                            name: this.name,
                            email: this.email,
                            phone: this.phone,
                            address: this.address,
                        },

                        // update: (store, { data: { createEmployee } }) => {
                        //     const data = store.readQuery({
                        //         query: all_employees_query,
                        //         variables(){
                        //             return{
                        //                 limit: 5,
                        //                 page: 1,
                        //             }
                        //         }
                        //     });
                        //     console.log(data);
                        //     // data.push(createEmployee);
                        //     // console.log('after pushing new item:',data);
                        //     // store.writeQuery({
                        //     //     query: all_employees_query,data })
                        // },
                        // optimisticResponse: {
                        //     __typename: 'Mutation',
                        //     createEmployee: {
                        //         __typename: 'Employee',
                        //         label: newEmployee,
                        //     },
                        // },
                    })
                    .then(response => {
                        // console.log(response);
                        if(response){
                            this.$router.replace('/');
                            location.reload();
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
        // apollo: {
        //     employees: {
        //         query: all_employees_query,
        //         variables() {
        //             return {
        //                 limit: this.limit,
        //                 page: this.page
        //             }
        //         }
        //     },
        // },


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
