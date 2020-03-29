<template>
    <div class="show" style="text-align: center">
        <div class="view-card">
            <p class="item"> <b>Name:</b> {{employee[0].name}}</p>
            <p class="item"> <b>Email:</b>  {{employee[0].email}}</p>
            <p class="item"> <b>Phone Number:</b>  {{employee[0].phone}}</p>
            <p class="item"> <b>Address:</b>  {{employee[0].address}}</p>

            <form class="col-4 view-form" @submit.prevent="deleteEmployee">
                <router-link :to="{ name: 'Edit', params: {id: employee[0].id } }">
                    <button class="btn btn-info btn-sm">
                        Edit
                    </button>
                </router-link>
                <button style="margin-left: 10px" type="submit" class="btn btn-danger btn-sm">Delete</button>
            </form>
        </div>





    </div>
</template>

<script>

    import {delete_employee_mutation, employee_query,all_employees_query} from "../graphql";

    export default {
        name: 'Show',
        data(){
            return{
                employee: {},
                id: this.$route.params.id,
            }
        },
        methods: {
            deleteEmployee(){
                this.$apollo
                    .mutate({
                        mutation: delete_employee_mutation,
                        variables: {
                            id: this.id
                        },
                        update: (store, { data: { deleteEmployee } }) => {
                            const data = store.readQuery({
                                query: all_employees_query
                            });
                            data.employees.pop(deleteEmployee);
                            store.writeQuery({ query: all_employees_query, data })
                        },
                    })
                    .then(response => {
                        console.log(response);
                        this.$router.replace('/');
                        location.reload();
                    })
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
    .view-card{
        margin: 0 auto;
        text-align: left;
        border: 1px solid gray;
        border-radius: 5px;
        width: 45%;
        padding: 70px;
    }
    .item{
        margin: 30px;
    }
    .view-form{
        margin-top: 50px;
        margin-left: 15px;
    }
</style>
