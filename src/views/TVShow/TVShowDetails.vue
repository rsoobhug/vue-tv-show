<template>
  <!-- <h1>This is a details page</h1> -->
  <!-- to retrieve id from params (slug) -->
  <!-- <h2>The TVShow id is {{ id }}</h2> -->
  <div class="TVShowDetailContainer">
    <img class="TVSDImage" :src="show?.image?.original" />
  </div>
  <div class="TVSDSeasonContainer" v-for="season in seasons">
    <div class="col-12 col-xs-12 col-sm-12 col-md-3 col-lg-3">
      <img class="TVSDSeasonImage" :src="season.image.medium" />
    </div>
    <div class="col-12 col-xs-12 col-sm-12 col-md-9 col-lg-9">
      <p class="TVSDSeason">
        <span class="season">Season {{ season.number }} </span> -
        <span class="episode">Episodes: {{ season.episodeOrder }}</span>
        <!-- <span class="network">Network: {{ season.network.name }}</span> -->
      </p>
      <div v-if="season?.summary">
        <p class="TVSDSummary">{{ sanitisedHtml(season?.summary) }}</p>
      </div>
      <div v-else>
        <p class="TVSDSummaryElse">Summary not available</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useSanitiseHtml } from '../../composables/sanitiseHtml'
export default {
  props: ['id'],
  data() {
    return {
      show: [],
      episodes: [],
      seasons: []
    }
  },
  methods: {
    fetchEpisodes() {
      fetch(`https://api.tvmaze.com/shows/${this.id}/episodes`)
        .then((res) => res.json())
        .then((data) => {
          this.episodes = data
          console.log(this.episodes.length, 'seasons length is')
          console.log(data, 'data season is')
        })
        .catch((err) => console.log(err.message))
    },
    fetchDetails() {
      fetch(
        `https://api.tvmaze.com/shows/${this.id}?embed[]=episodes&embed[]=cast&embed[]=alternatelists`
      )
        .then((res) => res.json())
        .then((data) => {
          this.show = data
          console.log(this.show.length, 'length is')
          console.log(data, 'data is')
        })
        .catch((err) => console.log(err.message))
    },
    fetchSeasons() {
      fetch(`https://api.tvmaze.com/shows/${this.id}/seasons`)
        .then((res) => res.json())
        .then((data) => {
          this.seasons = data
          console.log(this.seasons.length, 'seasons length is')
          console.log(data, 'data season is')
        })
        .catch((err) => console.log(err.message))
    },
    sanitisedHtml(html) {
      return useSanitiseHtml(html)
    }
  },
  mounted() {
    this.fetchDetails(), this.fetchSeasons()
  }
  // data() {
  //     return {
  //         id: this.$route.params.id
  //     }
  // }
}
</script>

<style>
.TVShowDetailContainer {
  display: flex;
  justify-content: center;
  .TVSDImage {
    margin-top: 40px;
    width: 80dvh;
    display: flex;
    justify-content: center;
    height: 80dvh;
    object-fit: contain;
  }
}

.TVSDSeasonContainer {
  padding-top: 24px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .TVSDSeason {
    color: white;
    font-weight: bolder;
    font-size: 24px;
  }
}

@media screen and (max-width: 800px) {
  .TVSDSeasonContainer {
    display: block;

    .TVSDSeasonImage {
      width: -webkit-fill-available;
      padding-bottom: 12px;
    }
  }
}
</style>
