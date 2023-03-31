import store from "@/store";
import Movie from "@/types/Movie";
import { User } from 'firebase/auth'

const moviesUrl: string = process.env.VUE_APP_MOVIES_API_URL || 'localhost';
const port: string = process.env.VUE_APP_MOVIES_API_PORT || '3001';

async function getMovies(): Promise<Movie[]> {
    let response;
    const url = `${moviesUrl}:${port}/movies`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    try {
        response = await (await fetch(url, { headers })).json();
    } catch (error: any ) {
        console.log("file: moviesService.ts ~ getMovies ~ error", error)
        throw error;
    }
  
    return response;
}

async function createMovie(movie: Movie):Promise<Response | undefined> {
    let response: Response | undefined;
    const url = `${moviesUrl}:${port}/movies`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true),
        'Content-Type': 'application/json'
    };
    console.log(JSON.stringify(movie));
    const request:RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(movie)
    };
    try {
        response = await (await fetch(url, request)).json();
    } catch (error) {
        console.log("file: moviesService.ts ~ createMovie ~ error", error)
    }
    return response;
}

async function editMovie(id: string, movie: Movie) {
    let response;
    const url = `${moviesUrl}:${port}/movies/${id}`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    const request:RequestInit = {
        method: 'PUT',
        headers,
        body: JSON.stringify(user)
    };
    try {
        response = (await fetch(url, request)).json();
    } catch (error) {
        console.log("file: moviesService.ts ~ line 36 ~ editMovie ~ error", error)
    }
    return response.data;
}

async function deleteMovie(id: string) {
    let response;
    const url = `${moviesUrl}:${port}/movies/${id}`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    const request:RequestInit = {
        method: 'DELETE',
        headers,
        body: JSON.stringify(user)
    };
    try {
        response = (await fetch(url, request)).json();
    } catch (error) {
        console.log("file: moviesService.ts ~ line 47 ~ deleteMovie ~ error", error)
    }
    return response.data;
}

export {getMovies, createMovie, editMovie, deleteMovie};
