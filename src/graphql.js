import gql from 'graphql-tag'

export const create_employee_mutation = gql`mutation CreateEmployeeMutation($name: String, $email: String, $phone: String,$address: String) {
        createEmployee(
            name: $name,
            email: $email,
            phone: $phone,
            address: $address,
        ) {
            id
            name
            email
            phone
            address
        }
    }`
export const delete_employee_mutation = gql`mutation DeleteEmployeeMutation($id: Int!) {
        deleteEmployee(
            id: $id
        ) {
            id
            name
            email
            phone
            address
        }
    }`
export const update_employee_mutation = gql`mutation UpdateEmployeeMutation($id: Int,$name: String, $email: String,$phone: String,$address: String) {
        updateEmployee(
            id: $id,
            name: $name,
            email: $email,
            phone: $phone,
            address: $address,
        ) {
            id
            name
            email
            phone
            address
        }
    }`
export const login_mutation = gql`mutation LoginMutation($username: String, $password: String) {
        signIn(
            username: $username,
            password: $password
        )
    }`




export const all_employees_query = gql`query AllEmployeesQuery($limit: Int!, $page: Int!) {
        employees(
            limit: $limit,
            page: $page
        ){ 
            data{
                id
                name
                email
                phone
                address
            }, total, per_page
        }
    }`

export const employee_query = gql`query EmployeeQuery($id: Int!) {
        employee(id: $id) {
            id
            name
            email
            phone
            address
        }
    }`
