<template>
  <div>
    <button class="btn btn-primary w-100 mb-1" @click="$router.push('/send')">
      Neue Nachricht senden
    </button>
    <hr />
    <div v-if="msgs.length == 0" class="text-center lead">
      Keine Nachrichten :(
    </div>
    <div v-else>
      <div v-for="msg in msgs" :key="msg.id" class="border m-2 rounded">
        <div v-html="msg.content" class="m-2" />
        <div class="border-top p-1 fs-6 row">
          <div class="col text-start">
            {{ new Date(msg.createdAt).toLocaleString() }}
          </div>
          <div @click="deleteMsg(msg.id)" class="col-sm text-end">
            <b class="mouse-pointer">Löschen</b>
          </div>
        </div>
      </div>
      <div class="text-center mouse-pointer" v-if="$store.state.nextPage" @click="$store.dispatch('loadMessages')">
        ⇩ Weitere Nachrichten laden
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.$store.dispatch('loadMessages')
    return {
      msgs: this.$store.state.messages,
      nextPage: this.$store.state.nextPage
    }
  },
  methods: {
    async deleteMsg(id) {
      if (
        confirm(
          'Sicher, dass du diese Nachricht löschen willst? Dies ist nicht umkehrbar!'
        )
      ) {
        try {
          await this.$axios.$delete('/messages/' + id)
          await this.$store.commit('deleteMessage', id)
          alert('Die Nachricht wurde gelöscht!')
        } catch (e) {
          alert('Beim Löschen ist ein Fehler aufgetreten!')
        }
      }
    },
  },
}
</script>