<template>

  <client-only>
    <section>
      <div class="container mt-5 mb-5 p-3 bg-light app">
        <h2>MessageRelay Lite</h2>
        <p class="lead">
          Dies ist nicht das finale MessageRelay! Sobald es in der Messenger AG
          wieder mehr Kappazitäten gibt, bekommt ihr ein richtiges ;)
        </p>
        <div v-if="$auth.loggedIn" class="text-end"><b class="mouse-pointer" @click="logout()">Abmelden</b></div>
        <hr />
        <Nuxt />
      </div>
    </section>
  </client-only>
</template>

<style>
.mouse-pointer {
  cursor: pointer;
}

.app {
  min-height: 70vh;
}
</style>

<script>
export default {
  methods: {
    logout(){
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>