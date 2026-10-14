<script>
import axios from '@/services/api.js'
export default {
  components: {

  },
  data() {
    return {
      titre:'Catalogue des Films',
      films:[],
      genres:[],
      genresSelectionnes:[],
    }
  },
  methods: {
  },
  async mounted() {
    try {
      const response = await axios.get('/movies')
      const genreResponse = await axios.get('/genres')
      this.films = response.data.member
      this.genres = genreResponse.data.member
    } catch (error) {
      console.error('Erreur API :', error)
    }
  },
}
</script>
<template>
  <header>
    <nav>
      <router-link to="/movies">Listing Films</router-link>
      <router-link to="/log-in">Connexion</router-link>
      <router-link to="/movies/1">Détail Film</router-link>
    </nav>
  </header>
  <main>
    <h1>{{ titre }}</h1>
    <p>Parcourez notre collection de films et trouvez votre prochaine séance.</p>
    <div>
      <input type="text" placeholder="Rechercher un film...">
      <div v-for="genre in genres " :key="genre.id">
        <input v-model="genresSelectionnes" :value="genre.id" type="checkbox">
        {{ genre.label }}
      </div>
    </div>
  </main>
  <footer></footer>
</template>

<style scoped></style>
