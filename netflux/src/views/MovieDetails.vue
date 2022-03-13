<template>
  <div class="mainView">
    <h1>Séries</h1>
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
    <div class="card" v-if="show">
      <div class="show-details">
        <div class="show-card">
          <div class="infos">
            <div class="infos-principal">
              <div class="show-name">
                <span class="show-name">
                  <strong>{{ show.name }}</strong>
                </span>
              </div>
              <div class="first-date">
                {{ cleanDate }}
              </div>
              <div class="number-season">
                <span v-if="this.season.length > 1">
                  {{ this.season.length }} Saisons
                </span>
                <span v-else> {{ this.season.length }} Saison </span>
              </div>
              <div class="show-rating">
                <span class="show-rating"
                  >Note <strong>{{ show.rating.average }}</strong></span
                >
              </div>
            </div>
            <div class="summary">
              <span class="show-summary"> {{ removeBalise }} </span>
            </div>
          </div>
          <div class="description">
            <div class="cast">
              <span>Distribution:</span>
              <span
                class="movie-detail__genre-text"
                v-for="cast in casts"
                :key="cast.id"
              >
                {{ cast.person.name }}
              </span>
            </div>
            <div class="show-genres">
              <span class="movie-detail__genre-title">Genres:</span>
              <span
                class="movie-detail__genre-text"
                v-for="genre in genres"
                :key="genre.id"
              >
                {{ genre }}
              </span>
            </div>
          </div>
        </div>
        <div class="show-img">
          <img v-bind:src="show.image.medium" />
        </div>
      </div>

      <div class="episodes">
        <div class="number-episodes">
          <span>Episodes:</span>
        </div>
        <span
            class="episode-details"
            v-for="season in seasonNumber"
            :key="season.id"
          >
            <div class='saison-number'>Saison {{ season }}</div>
            <div class="list-episodes">
              <span
                class="episode-details"
                v-for="episode in episodes"
                :key="episode.id"
              >
                <span class="episode-detail" v-if="episode.season === season">
                  <div class="episode-number">
                    <div class="episode-item">
                      {{ episode.number }}
                    </div>
                  </div>
                  <div class="show-img-episode">
                    <img v-bind:src="episode.image.medium" />
                  </div>
                  <div class="episode-summary">
                    <div class="episode-title-duree">
                      <div class="episode-title">
                        {{ episode.name }}
                      </div>
                      <div class="episode-duree">{{ episode.runtime }} min</div>
                    </div>
                    <div class="episode-summary-details">
                      {{ episode.summary }}
                    </div>
                  </div>
                </span>
              </span>
            </div>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      requete: "",
      show: null,
      id: null,
      cast: null,
      season: null,
      episode: null,
      baseURL: "https://api.tvmaze.com/search/shows",
      baseURLCast: "https://api.tvmaze.com/shows",
      summary: null,
    };
  },
  computed: {
    genres() {
      return this.show.genres;
    },
    casts() {
      return this.cast;
    },
    episodes() {
      return this.episode;
    },

    removeBalise() {
      //remove Balises
      let str = this.show.summary.substring(3, this.show.summary.length - 4);
      return str;
    },

    cleanDate() {
      let cleanDate = this.show.premiered.substring(0, this.show.premiered.length - 6);
      return cleanDate;
    },
    seasonNumber() {
      let seasonNumber = this.season.length;
      return seasonNumber;
    },
  },
  methods: {
    goShow(e) {
      if (e.key == "Enter") {
        // https://api.tvmaze.com/search/shows?q=girls/cast
        axios.get(`${this.baseURL}?q=${this.requete}`).then((response) => {
          this.show = response.data[0].show;
          this.id = response.data[0].show.id;
          axios.get(`${this.baseURLCast}/${this.id}/cast`).then((response) => {
            this.cast = response.data;
          });
          //number of season
          axios
            .get(`${this.baseURLCast}/${this.id}/seasons`)
            .then((response) => {
              this.season = response.data;
              for (let i = 0; i < this.season.length; i++) {
                if (this.season[i].premiereDate === null) {
                  this.season.pop();
                }
              }
            });
          axios
            .get(`${this.baseURLCast}/${this.id}/episodes`)
            .then((response) => {
              this.episode = response.data;
              console.log(this.episode);
            });
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