<template>
  <div class="mainView-show-detail">
    <div class="card">
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
         <img class="show-cover link"
                :src="`${show.image ? show.image.medium: require('@/assets/no-image-placeholder.jpg')}`"
            alt="TV show image" />
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
          <div class="saison-number">Saison {{ season }}</div>
          <div class="list-episodes">
            <span
              class="episode-details"
              v-for="episode in episodes"
              :key="episode.id"
              @click="goToEpisode(show.id, episode.number, episode.season)"
            >
              <span class="episode-detail" v-if="episode.season === season">
                <div class="episode-number">
                  <div class="episode-item">
                    {{ episode.number }}
                  </div>
                </div>
                <div class="show-img-episode">
                  <img :src="`${episode.image ? episode.image.medium: require('@/assets/no-image-placeholder.jpg')}`" alt="">
                </div>
                <div class="episode-summary">
                  <div class="episode-title-duree">
                    <div class="episode-title">
                      {{ episode.name }}
                    </div>
                    <div class="episode-duree">{{ `${episode.runtime ? episode.runtime: 'no available'}` }} min</div>
                  </div>
                  <div class="episode-summary-details">
                      {{`${episode.summary ? episode.summary: 'no available'}`}}
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
      show: null,
      cast: null,
      season: null,
      episode: null,
      baseURLCast: `https://api.tvmaze.com/shows/${this.$route.params.id}`,
    };
  },
  computed: {

    genres() {
      return this.show.genres;
    },
    removeBalise() {
      let str = this.show.summary.substring(3, this.show.summary.length - 4);
      return str;
    },

    casts() {
      return this.cast;
    },

    episodes() {
      return this.episode;
    },
    cleanDate() {
      let cleanDate = this.show.premiered.substring(
        0,
        this.show.premiered.length - 6
      );
      return cleanDate;
    },
    seasonNumber() {
      let seasonNumber = this.season.length;
      return seasonNumber;
    },
  },
  methods: {
    goToEpisode(id, number, season) {
      console.log(number);
      this.$router.push(`/episodecard/${id}/${number}/${season}`);
    }
  },
  mounted() {
    axios
      .get(`${this.baseURLCast}`)
      .then((response) => (this.show = response.data));
      console.log("show", this.show);
    axios.get(`${this.baseURLCast}/seasons`).then((response) => {
      this.season = response.data;
      for (let i = 0; i < this.season.length; i++) {
        if (this.season[i].premiereDate === null) {
          this.season.pop();
        }
      }
    });
    axios.get(`${this.baseURLCast}/episodes`).then((response) => {
      this.episode = response.data;
    });

    axios.get(`${this.baseURLCast}/cast`).then((response) => {
      this.cast = response.data;
    });
  },
};
</script>
<style>
</style>