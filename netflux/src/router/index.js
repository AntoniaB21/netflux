import Vue from "vue";
import VueRouter from "vue-router";
import ShowDetails from "../views/ShowDetails.vue";
import MovieDetails from "../views/MovieDetails.vue";
import EpisodeCard from "../views/EpisodeCard.vue";
import Home from "../views/Home.vue";
import SearchShow from "../views/SearchShow.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    }, {
        path: "/show/:id",
        name: "show",
        component: ShowDetails,
    },
    {
        path: "/showdetails",
        name: "showdtails",
        component: MovieDetails,
    },
    {
        path: "/searchshow",
        name: "searchshow",
        component: SearchShow,
    },
    {
        path: "/episodecard/:id/:number/:season",
        name: "episodecard",
        component: EpisodeCard,
    }
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;