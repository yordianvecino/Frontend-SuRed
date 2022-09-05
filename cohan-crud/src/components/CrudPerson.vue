
<template>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

    <div>
        <h1>CRUD PRESON</h1>
        <DataTable :value="person" :paginator="true" :rows="10">
            <Column field="name" header="Name"></Column>
            <Column field="phone" header="phone"></Column>
            <Column field="email" header="email"></Column>
        </DataTable>
    </div>
</template>

<script>
import PersonService from "../service/PersonService";
export default{
    name: 'CrudPerson',
    data(){
        return{
            person : null
        }
    },
    personService : null,
    created(){
        this.personService = new PersonService();
    },
    mounted(){
        this.personService.getAll().then(data => {
            this.person = data.data;
            console.log(this.person);
        });
    }
}
</script>

<style>
</style>