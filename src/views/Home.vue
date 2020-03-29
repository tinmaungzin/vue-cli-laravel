<template>
    <div class="home">

        <div class="container">
            <table class="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="employee of employees.data" :key="employee.id">
                    <th scope="row">{{employee.id}}</th>
                    <td>{{employee.name}}</td>
                    <td>{{employee.email}}</td>
                    <td>

                        <router-link :to="{ name: 'Show', params: {id: employee.id } }">
                            <button class="btn btn-success">
                                View
                            </button>
                        </router-link>
                    </td>
                </tr>
                </tbody>
            </table>
            <nav v-if="Math.ceil(employees.total/limit)>1" aria-label="Page navigation example">
                <ul class="pagination">
                    <li v-for="index in Math.ceil(employees.total/limit)" :key="index" v-bind:class="{'active':(page === index)}" class="page-item "><a @click="setPage(index)" class="page-link" href="#">{{index}}</a></li>
                </ul>
            </nav>
        </div>

    </div>
</template>

<script>
    import {all_employees_query} from "../graphql";

    export default {
        name: 'Home',
        data(){
            return{
                employees: [],
                limit: 5,
                page: 1,
                pageIndex: 1,
            }
        },
        methods: {
            setPage(page){
                this.page = page;
            },

        },

        apollo: {
            employees: {
                query: all_employees_query,
                variables() {
                    return {
                        limit: this.limit,
                        page: this.page
                    }
                }
            },
        },

    }
</script>
