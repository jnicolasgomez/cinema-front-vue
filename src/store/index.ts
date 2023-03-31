import { createStore } from 'vuex'
import router from '@/router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, User } from 'firebase/auth'
import Movie from '@/types/Movie'
import { getMovies } from '@/services/moviesService'

export default createStore({
  state: {
    user: null,
    movies: []
  },
  getters: {
    user (state): User | null {
      return state.user;
    },
    movies (state): Movie[] {
      return state.movies;
    }
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user;
    },
    CLEAR_USER (state) {
      state.user = null;
    },
    SET_MOVIES (state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    async login ({ commit }, details ) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error:any) {
        console.log(error)
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }
        return
      }
      
      commit('SET_USER', auth.currentUser)
      router.push('/')
    },
    async register ({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error:any) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email alreaady in use")
            break
          case 'auth/invalid-email':
            alert("Invalid Email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }
        return
      }
      
      commit('SET_USER', auth.currentUser)
      router.push('/')
    },
    async logout ({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login')
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)
          if (router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },
    async getMovies ({ commit } ) {
      let movies: Movie[] | null = [];
      try {
        movies = await getMovies();
        commit('SET_MOVIES', movies);
        localStorage.setItem('movies', JSON.stringify(movies));
      } catch (error: any ) {
        const localMovies = localStorage.getItem('movies');
        if (localMovies) {
          movies = JSON.parse(localMovies) as Movie[];
          commit('SET_MOVIES', movies);
        }
      }
    },
  },
  modules: {
  }
})
