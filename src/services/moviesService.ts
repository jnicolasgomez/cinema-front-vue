import store from "@/store";
import Movie from "@/types/Movie";
import axios, { AxiosError } from "axios";
import { User } from 'firebase/auth'

const moviesUrl: string = process.env.VUE_APP_MOVIES_API || 'http://localhost:3001';

async function getMovies(): Promise<Movie[]> {
    let response;
    const url = `${moviesUrl}/movies`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    try {
        response = await axios.get(url, { headers });
    } catch (error: any | AxiosError) {
        console.log("file: moviesService.ts ~ getMovies ~ error", error)
        throw error;
    }
  
    return response.data;
}

async function createMovie(movie: Movie) {
    let response;
    const url = `${moviesUrl}/movies`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    try {
        response = await axios.post(url, movie, { headers });
    } catch (error) {
        console.log("file: moviesService.ts ~ createMovie ~ error", error)
    }
    return response.data;
}

async function editMovie(id: string, movie: Movie) {
    let response;
    const url = `${moviesUrl}/movies/${id}`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    try {
        response = await axios.put(url, movie, { headers });
    } catch (error) {
        console.log("file: moviesService.ts ~ line 36 ~ editMovie ~ error", error)
    }
    return response.data;
}

async function deleteMovie(id: string) {
    let response;
    const url = `${moviesUrl}/movies/${id}`;
    const user: User = store.getters.user;
    const headers = {
        Authorization: "Bearer " + await user.getIdToken(true)
    };
    try {
        response = await axios.delete(url, { headers });
    } catch (error) {
        console.log("file: moviesService.ts ~ line 47 ~ deleteMovie ~ error", error)
    }
    return response.data;
}

export {getMovies, createMovie, editMovie, deleteMovie};
