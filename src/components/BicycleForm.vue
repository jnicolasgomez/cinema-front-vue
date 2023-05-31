<template>
    <form @submit.prevent="handleSubmit">
        <h1>{{type}} Concierto</h1>
        <label>Artista</label>
        <input v-model="title" type="text" required>
        <label>Nombre</label>
        <input  v-model="description" type="text" required>
        <label>Año</label>
        <input v-model="year" type="number" required>
        <label>Lugar</label>
        <input v-model="score" type="text" required>
        <label>Latitud</label>
        <input v-model="lat" type="number" step="0.0001" min="6.22" max="6.28" required>
        <label>Longitud</label>
        <input v-model="long" type="number" min="-75.6" max="-75.53" step="0.0001" required>
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
            score: '',
            brand: '',
            lat: 6.25,
            long: -75.56,
        }
    },
    methods: {
        async handleSubmit() {
            const movie: Movie = {
                Artista: this.title,
                Nombre: this.description,
                Año: this.year,
                Lugar: this.score,
                Latitud: this.lat,
                Longitud: this.long
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
