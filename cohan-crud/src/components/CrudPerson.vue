
<template>
    <div style="margin: 0 auto; width: 80%">
        <Panel header="CRUD PRESON">
            <DataTable :value="person" :paginator="true" :rows="10">
                <Column field="id_person" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="phone" header="phone"></Column>
                <Column field="email" header="email"></Column>
            </DataTable>
        </Panel>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import PersonService from "../service/PersonService";

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

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
    },
    components: {
		DataTable,
        Column,
        Panel
	}
}
</script>

<style>
</style>