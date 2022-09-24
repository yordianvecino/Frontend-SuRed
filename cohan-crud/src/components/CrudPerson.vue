
<template>
    <div style="margin: 0 auto; width: 80%">
        <Toast/>
        <Panel header="LISTA DE USUARIOS">
            <Menubar :model="items">
                <template #start>
                    <img alt="logo" src="https://www.sured.com.co/wp-content/uploads/2020/07/Su-red-azul.png" height="40" class="mr-2">
                </template>
            </Menubar>
            <br>
            <DataTable :value="person" :paginator="true" :rows="10" selectionMode="single"
                :selection.sync="selectorPersona" dataKey="id_person">
                <Column field="id_person" header="ID"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="appeals" header="Appeals"></Column>
                <Column field="phone" header="Phone"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="city" header="City"></Column>
                <Column field="country" header="Country"></Column>
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
                <InputText id="appeals" type="text" v-model="persona.appeals" placeholder="Appeals" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText id="phone" type="text" v-model="persona.phone" placeholder="Phone" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText id="email" type="text" v-model="persona.email" placeholder="E-mail" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText id="city" type="text" v-model="persona.city" placeholder="City" style="width: 100%" />
            </div>
            <br>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText id="country" type="text" v-model="persona.country" placeholder="Country" style="width: 100%" />
            </div>
            <template #footer>
                <Button label="Guardar" icon="pi pi-user-plus" @click="save" class="p-button-raised p-button-rounded" />
                <Button label="Cancelar" icon="pi pi-times-circle" @click="closeModal" autofocus
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
import Toast from 'primevue/toast';

import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

export default{
    name: 'CrudPerson',
    data(){
        return{
            person : null, 
            persona : {
                id: null,
                name: null,
                phone: null,
                email: null
            },
            selectorPersona : {
                id: null,
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
                        this.showEditModal();
                    }
                },
                {
                    label : 'Eliminar',
                    icon : 'pi pi-fw pi-user-minus',
                    command : () => {
                        this.delete();
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
        showEditModal() {
            this.persona = this.selectorPersona;
            this.displayModal = true;
        },
        getAll() {
            this.personService.getAll().then(data => {
            this.person = data.data;
            console.log(this.person);
            });
        },
        delete() {
            this.personService.delete(this.selectorPersona.id).then(data =>{
                if(data.status === 200){
                this.$toast.add({severity:'success', summary: 'Atencion!!', detail:'Se Elimino', life: 3000});
                }
            });
        },
        save (){
            this.personService.save(this.person).then(data =>{
                if(data.status === 200){
                    this.displayModal = false;
                    this.persona = {
                        name: null,
                        phone: null,
                        email: null
                    }
                    this.getAll();
                }
            })
        },
        closeModal() {
            this.displayModal = false;
        }
    },
    components: {
		DataTable,
        Column,
        Panel,
        Menubar,
        Dialog,
        InputText,
        Button,
        Toast
	}
}
</script>

<style>
body {
    background: #000000;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fdfdfdfb, #000000);
    background: linear-gradient(to right, #fdfdfdfb, #000000);
}
</style>