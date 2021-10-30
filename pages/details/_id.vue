<template>
  <div>
    <Alert v-if="showInfo" v-bind:info="infoMsg" @click="handleOkay()" />
    <Confirm
      v-if="deleteMsg"
      question="Möchtest du diese Nachricht wirklich löschen? Dies lässt sich nicht rückgängig machen!"
      @yes="deleteMessage()"
      @no="deleteMsg = isDeleting = false"
    />
    <h3 class="text-center mb-3">Nachrichten-Details</h3>
    <div v-if="msg">
      <div class="row">
        <div class="col-6 mx-auto border p-2">
          <table class="msg-details mx-auto">
            <tbody>
              <tr>
                <td class="pr-1">Nachricht</td>
                <td>
                  <div
                    v-html="msg.content"
                    class="rounded bg-secondary text-light p-1 msg"
                  ></div>
                </td>
              </tr>
              <tr>
                <td class="pr-1">Sender</td>
                <td>
                  {{ msg.author }} <code>{{ msg.uid }}</code>
                </td>
              </tr>
              <tr>
                <td class="pr-1">Zeit</td>
                <td>{{ new Date(msg.createdAt).toLocaleString() }}</td>
              </tr>
              <tr>
                <td class="pr-1">Ziel</td>
                <td>{{ msg.target.toUpperCase() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <button
          class="col-3 mx-auto mt-2 btn danger"
          @click="deleteMsg = isDeleting = true"
          v-bind:disabled="isDeleting"
        >
          Löschen
        </button>
      </div>
    </div>
    <div v-else class="text-center">
      <div>Es exsistiert keine Nachricht mit der ID {{ id }} :(</div>
    </div>
    <div class="mt-2 text-center">
      <b class="mouse-pointer" @click="$router.push('/')"
        >⟸ Zurück zur Übersicht</b
      >
    </div>
  </div>
</template>

<style scoped>
.msg-details tbody tr td:first-child {
  padding-right: 1rem;
  font-weight: bold;
}
</style>

<script>
export default {
  data() {
    return {
      deleteMsg: false,
      showInfo: false,
      infoMsg: '',
      deleteSuccess: false,
      isDeleting: false,
    }
  },
  async asyncData(ctx) {
    const { $axios, params } = ctx
    const id = params.id
    try {
      const msg = await $axios.$get('/messages/' + id)
      return { msg, id }
    } catch (e) {
      return {
        id,
        msg: false,
      }
    }
  },
  methods: {
    async deleteMessage() {
      this.deleteMsg = false
      try {
        await this.$axios.$delete('/messages/' + this.id)
        await this.$store.commit('deleteMessage', this.id)
        this.infoMsg = 'Die Nachricht wurde erfolgreich gelöscht!'
        this.deleteSuccess = true
      } catch (e) {
        this.infoMsg = 'Beim Löschen ist ein Fehler aufgetreten: ' + e.message
      }
      setTimeout(() => {
        this.showInfo = true
      }, 1)
    },
    handleOkay() {
      if (this.deleteSuccess) this.$router.push('/')
      else this.showInfo = false
      this.isDeleting = false
    },
  },
}
</script>
