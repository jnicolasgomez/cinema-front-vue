<template>
    <form @submit.prevent="handleSubmit">
        <h1>{{type}} Pelicula</h1>
        <label>Titulo</label>
        <input v-model="title" type="text" required>
        <label>Descripción</label>
        <input  v-model="description" type="text" required>
        <label>Año</label>
        <input v-model="year" type="number" required>
        <label>puntaje</label>
        <input v-model="score" type="number" required>
        <button> {{type}} </button>
    </form>
</template>
<script lang="ts">
import router from '@/router'
import Movie from '@/types/Movie'
import { defineComponent } from 'vue'
import {createMovie, editMovie} from '../services/moviesService'

export default defineComponent({
    setup() {
        
    },
    props: {
        type: {
            required: true,
            type: String
        },
        movieId: {
            type: String
        }
    },
    data() {
        return {
            title: '',
            description: '',
            year: 2000,
            score: 0,
            brand: ''
        }
    },
    methods: {
        async handleSubmit() {
            const movie: Movie = {
                title: this.title,
                year: this.year,
                description: this.description,
                score: this.score
            }
            if (this.type === "Editar") {
                if (this.movieId) {
                    const response = await editMovie(this.movieId, movie);
                    console.log('Movie edited successfully');
                    console.log(response);
                } else (
                    console.log('Error editing Movie')
                )
                
            } else if (this.type === "Crear") {
                const response = await createMovie(movie);
                console.log('Movie created successfully');
                console.log(response);
            }
            router.push({ path: '/movies', replace: true });
        }
    }
})
</script>

<style scoped>
    form {
        max-width: 420px;
        background: white;
        margin: 30px auto;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 3px 3px 7px rgba(0,0,0,0.4);
    }
    label {
        color: gray;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        widows: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid gray;
        color: black;
    }

    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        margin-right: 10px;
        color: white;
        border-radius: 20px;
        cursor:pointer;
        box-shadow: 3px 3px 7px rgba(0,0,0,0.4);
    }
    button:hover {
        background: #150183;
    }
    submit {
        text-align: center;
    }
</style>
