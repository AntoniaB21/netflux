<template>
  <div class="mainView">
    <div>
      <div class="search-container">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          class="search-input"
          v-model="requete"
          v-on:keypress="goShow"
        />
      </div>
    </div>
    <div class="search-show" v-if="show">
        <span
            class="showSearch"
            v-for="show in shows"
            :key="show.id" @click="goToShow(show.show.id)"
        >
            <div class="showSearch-img">
                <img v-bind:src="show.show.image.medium" />
            </div>
        </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchShow",
  data() {
    return {
      requete: "",
      show: null,
      baseURL: "https://api.tvmaze.com/search/shows"
    };
  },
  computed: {
    shows() {
      return this.show;
    }
  },
  methods: {
    goToShow(id) {
      this.$router.push(`/show/${id}`);
    },
    goShow(e) {
      if (e.key == "Enter") {
        axios.get(`${this.baseURL}?q=${this.requete}`).then((response) => {
          this.show = response.data;
          console.log('show', this.show);
        });
        this.requete = "";
      }
    },
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}

h1 {
  position: relative;
  padding-top: 6.5%;
  width: 20%;
  color: #fff;
  font-family: "Gotham Light", sans-serif;
  font-size: 38px;
  line-height: 38px;
  font-weight: 700;
  margin-right: 15px;
}
.mainView {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  color: rgba(0, 0, 0, 0.9);
  margin-top: -85px;
  min-height: 1000px;
}

.episode-number {
  width: 10%;
  align-self: center;
  text-align: center;
}

.episode-title-duree {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card {
  position: relative;
  margin-top: 5%;
  color: #fff;
  font-weight: 500;
  text-align: left;
  align-items: center;
  width: 80%;
  top: 40px;
  left: 10%;
  transform-origin: center top;
  transform: translateX(0px) translateY(calc(-40px + 2em)) scaleX(1) scaleY(1)
    translateZ(0px);
  z-index: 2;
  opacity: 1;
  box-shadow: rgb(0 0 0 / 75%) 0px 3px 10px;
  margin-bottom: 2em;
  min-width: 850px;
}

.number-episodes span {
  font-weight: 700;
  font-size: 24px;
  margin-top: 48px;
  margin-bottom: 20px;
  margin-left: 50px;
}
.summary {
  margin-top: 2%;
  width: 80%;
}
.show-name {
  font-size: 1.8rem;
  margin-right: 0.5em;
}

.number-season {
  margin-right: 0.5em;
}
.show-details {
  display: flex;
  flex-direction: column;
}
.saison-number {
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 50px;
}
.episode-summary-details {
  margin-top: 30px;
}
.show-img {
  position: relative;
  width: 100%;
  padding-top: 56%;
}

.show-img::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: -webkit-linear-gradient(bottom, #181818, rgba(255, 255, 255, 0));
  background: linear-gradient(to top, #181818, transparent 50%);
}

.first-date {
  margin-right: 0.5em;
}
.show-img img {
  position: absolute;
  top: 0;
  width: 100%;
  object-position: bottom;
}

img {
  height: 100%;
  object-fit: cover;
}

.show-card {
  display: flex;
  flex-direction: row;
  padding: 5% 50px 0;
  align-self: self-start;
  font-family: "Gotham", sans-serif;
  font-size: 18px;
  line-height: 27px;
  font-weight: 300;
  order: 2;
}
.infos {
  position: relative;
  width: 100%;
  margin-top: 0;
  left: 0;
  width: 60%;
  display: flex;
  flex-direction: column;
}

.infos-principal {
  display: flex;
  flex-direction: row;
}

.description {
  position: relative;
  width: 100%;
  margin-top: 0;
  left: 0;
  width: 40%;
}

.cast span:first-child {
  color: #777;
}

.show-genres span:first-child {
  color: #777;
}
.episodes {
  display: flex;
  flex-direction: column;
  margin-top: 10%;
}

.show-img-episode img {
  height: auto;
}
.episode-detail {
  display: flex;
  flex-direction: row;
}

.episode-detail {
  width: 90%;
  margin-left: 5%;
  position: relative;
  padding-top: 1%;
  padding-bottom: 1%;
  border-top: 1px solid #404040;
}
.list-episodes {
  margin-top: 5%;
}

.episode-summary {
  display: flex;
  flex-direction: column;
  margin: 0 50px;
  width: 80%;
}

.show-img-episode {
  width: 30%;
}

.search-container {
  background: #fff;
  height: 30px;
  width: 40%;
  margin-left: 30%;
  border-radius: 30px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}

.search-container:hover > .search-input {
  width: 400px;
}

input[type="text"],
textarea,
[contenteditable] {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}

.search-container .search-input {
  background: transparent;
  border: none;
  outline: none;
  width: 0px;
  font-weight: 500;
  font-size: 16px;
}
</style>