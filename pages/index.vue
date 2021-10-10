<template>
  <div>
    <button class="btn btn-primary w-100 mb-1" @click="$router.push('/send')">
      Neue Nachricht senden
    </button>
    <hr />
    <div v-for="msg in msgs" :key="msg.id" class="border m-2 rounded">
      <div v-html="msg.content" class="m-2"/>
      <div class="border-top p-1 fs-6">
        <div>{{ new Date(msg.createdAt).toLocaleString() }}</div>
        <div @click="deleteMsg(msg.id)"><b>Löschen</b></div>
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
    }
  },
  methods: {
    async deleteMsg(id){
      if(confirm('Sicher, dass du diese Nachricht löschen willst? Dies ist nicht umkehrbar!')){
        try {
          await this.$axios.$delete('/messages/' + id)
          await this.$store.dispatch('loadMessages')
        } catch(e){}
      }
    }
  }
}
</script>