<template>
    <div class="bicycle-list">
        <ul>
            <li v-for="bicycle in movies" :key="bicycle._id" >
                <img src="https://media.istockphoto.com/id/1244034031/vector/cinema-poster-with-cola-film-strip-and-clapper-vector.jpg?s=612x612&w=0&k=20&c=JN4E5qJgcq3qm89rSc2BIJT6AZ80MvRJie__r3OENY8="/>
                <h2>{{ bicycle.title }}</h2>
                <!--div class="location">
                    <p> {{ bicycle.description}} </p>
                </div-->
                <!--button @click="editMovie(bicycle._id)" class="edit-button">Editar</button>
                <button @click="deleteMovie(bicycle._id)" class="delete-button">Eliminar</button-->
            </li>
        </ul>
        <button @click="addMovie()" class="add-button"> + Crear Pelicula</button>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { deleteMovie } from '@/services/moviesService';
import store from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        editMovie(id: string) {
            router.push({ path: `/edit/${id}`, name:"edit", params: { id}});
        },
        addMovie() {
            router.push({ path: `/create`, name:"create"});
        },
        async deleteMovie( id: string) {
            const response = await deleteMovie(id);
            if (response.deletedCount > 0) {
                const toRemove = this.movies.findIndex((obj) => obj._id === id);
                // eslint-disable-next-line vue/no-mutating-props
                this.movies.splice(toRemove, 1);
            }
            console.log(response);
        }
    },
    computed: {
        movies () {
            return store.getters.movies;
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