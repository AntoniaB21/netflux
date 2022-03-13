// import dependency to handle HTTP request to our back end
import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
    episodes: [],
    shows: [],
    baseURLSearch: "https://api.tvmaze.com/search/shows",
    baseURL: "https://api.tvmaze.com/shows",
}

//to handle state
const getters = {}

//to handle actions
const actions = {

    getShows({ commit }) {
        axios.get(`${this.state.baseURL}`).then((response) => {
            this.shows = response.data;
            console.log(this.shows);
            commit('SET_SHOWS', this.shows)
        });
    },

    getSearchShows({ commit }) {
        axios.get(`${this.state.baseURLSearch}`).then((response) => {
            this.shows = response.data;
            console.log(this.shows);
            commit('SET_SHOWS', this.shows)
        });
    }

}

//to handle mutations
const mutations = {
    SET_SHOWS(state, shows) {
        state.shows = shows
    }
}

//export store module
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})