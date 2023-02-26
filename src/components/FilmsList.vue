<template>
    <div class="bicycle-list">
        <ul>
            <li v-for="bicycle in bicycles" :key="bicycle._id" >
                <img :src="bicycle.img"/>
                <h2>{{ bicycle.title }}</h2>
                <!--div class="location">
                    <p> {{ bicycle.description}} </p>
                </div-->
                <!--button @click="editBicycle(bicycle._id)" class="edit-button">Editar</button>
                <button @click="deleteBicycle(bicycle._id)" class="delete-button">Eliminar</button-->
            </li>
        </ul>
        <button @click="addBicycle()" class="add-button"> + Crear Pelicula</button>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { deleteBicycle } from '@/services/bicyclesService';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        editBicycle(id: string) {
            router.push({ path: `/edit/${id}`, name:"edit", params: { id}});
        },
        addBicycle() {
            router.push({ path: `/create`, name:"create"});
        },
        async deleteBicycle( id: string) {
            const response = await deleteBicycle(id);
            if (response.deletedCount > 0) {
                const toRemove = this.bicycles.findIndex((obj) => obj._id === id);
                // eslint-disable-next-line vue/no-mutating-props
                this.bicycles.splice(toRemove, 1);
            }
            console.log(response);
        }
    },
    computed: {
        bicycles () {
            return store.getters.bicycles;
        }
    }
})
</script>

<style scoped>
    .bicycle-list {
        max-width: 100%;
        margin: 20px 20px auto;
    }
    .bicycle-list ul {
        max-width: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        overflow: hidden;
        flex-wrap: wrap;
    }
    .bicycle-list li {
        list-style-type: none;
        background: rgba(18, 13, 49, 0.719);
        margin: 8px 15px;
        width: 140px;
        height: 160px;
        border-radius: 4px;
        box-shadow: 3px 3px 7px rgba(0,0,0,0.4);
        display: inline-block;
    }
    .bicycle-list img {
        width: 100%;
        height: 80%;
    }
    .bicycle-list h2 {
        margin: 0 10px 10px;
        font-size: 14px;
        text-transform: capitalize;
        color: white;
    }
    .color {
        display: flex;
    }
    .color p {
        font-weight: bold;
        margin: 10px 4px;
    }

    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 10px;
        margin-left: 15px;
        color: rgb(0, 0, 0);
        border-radius: 5px;
        cursor:pointer;
        margin-right: 10px;
        font-family: "Franklin Gothic Medium", "Courier New", monospace;
        bottom: 0;
    }
    .delete-button {
        background: red;
    }
    .delete-button:hover {
        background: #494949;
    }
    .add-button {
        background: rgb(255, 255, 255);
    }
    .add-button:hover {
        background: #444444;
        color: rgb(255, 255, 255);
    }
    .edit-button:hover {
        background: #150183;
    }
</style>