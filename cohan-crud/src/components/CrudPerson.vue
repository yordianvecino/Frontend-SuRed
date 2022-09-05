
<template>
    <div style="margin: 0 auto; width: 80%">
        <Panel header="CRUD PRESON">

            <Menubar :model="items">
                <template #start>
                    <img alt="logo" src="https://politecnicocohan.edu.co/wp-content/uploads/2021/08/logo-politecnico.png"
                        height="40" class="mr-2">
                </template>
            </Menubar>
            <br>
            <DataTable :value="person" :paginator="true" :rows="10">
                <Column field="id_person" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="phone" header="phone"></Column>
                <Column field="email" header="email"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear Persona" :visible.sync="displayModal" :modal="true">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <InputText id="name" type="text" v-model="persona.name" placeholder="Name" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-sort-numeric-down"></i>
                </span>
                <InputText id="name" type="text" v-model="persona.phone" placeholder="Phone" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText id="name" type="text" v-model="persona.email" placeholder="E-mail" style="width: 100%" />
            </div>
            <template #footer>
                <Button label="Guardar" icon="pi pi-user-plus" @click="closeBasic2"
                    class="p-button-raised p-button-rounded" />
                <Button label="Cancelar" icon="pi pi-times-circle" @click="closeBasic2" autofocus
                    class="p-button-raised p-button-rounded" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import PersonService from "../service/PersonService";
import Button from 'primevue/button';

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default{
    name: 'CrudPerson',
    data(){
        return{
            person : null, 
            persona : {
                name: null,
                phone: null,
                email: null
            },
            items: [
                {
                    label : 'nuevo',
                    icon : 'pi pi-fw pi-user-plus',
                    command : () => {
                        this.showSaveModal();
                    }
                },
                {
                    label : 'Editar',
                    icon : 'pi pi-fw pi-user-edit',
                    command : () => {
                        this.save();
                    }
                },
                {
                    label : 'Eliminar',
                    icon : 'pi pi-fw pi-user-minus',
                    command : () => {
                        this.save();
                    }
                },
                {
                    label : 'Refrescar',
                    icon : 'pi pi-fw pi-refresh',
                    command : () => {
                        this.getAll();
                    }
                }
            ],
            displayModal : false
        }
    },
    personService : null,
    created(){
        this.personService = new PersonService();
    },
    mounted(){
        this.getAll();
    },
    methods :{
        showSaveModal () {
            this.displayModal = true;
        },
        getAll() {
            this.personService.getAll().then(data => {
            this.person = data.data;
            console.log(this.person);
            });
        }
    },
    components: {
		DataTable,
        Column,
        Panel,
        Menubar,
        Dialog,
        InputText,
        Button
	}
}
</script>

<style>
body {
    background: #000000;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #96ffa4fb, #0a0046);
    background: linear-gradient(to right, #96ffa4fb, #0a0046);
}
</style>