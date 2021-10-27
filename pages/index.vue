<template>
  <div>
    <Alert
      v-if="deleteData.showInfo"
      v-bind:info="deleteData.info"
      @click="deleteData.showInfo = false"
    />
    <Confirm
      v-if="deleteData.id"
      question="Möchtest du diese Nachricht wirklich löschen? Dies lässt sich nicht rückgängig machen!"
      @yes="deleteMsg()"
      @no="deleteData.id = false"
    />
    <button class="btn w-100 mb-1" @click="$router.push('/send')">
      Neue Nachricht senden
    </button>
    <hr />
    <div v-if="msgs.length == 0" class="text-center lead">
      Keine Nachrichten :(
    </div>
    <div v-else>
      <div v-for="msg in msgs" :key="msg.id" class="border m-2 rounded">
        <div v-html="msg.content" class="p-2 msg" />
        <div class="border-top p-1 fs-6">
          <div class="row">
            <div class="col text-start">
              {{ msg.target.toUpperCase() }}
            </div>
            <!--
            <div class="col text-start">
              <b>{{ msg.author }}</b>
            </div> -->
            <div class="col text-center">
              {{ new Date(msg.createdAt).toLocaleString() }}
            </div>
            <div class="col-sm text-end mb-1">
              <svg
                @click="$router.push('/details/' + msg.id)"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-info-circle-fill text-success mouse-pointer me-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                ></path></svg
              ><svg
                @click="initDelete(msg.id)"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-trash-fill text-danger mouse-pointer"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        class="text-center mouse-pointer"
        v-if="$store.state.nextPage"
        @click="$store.dispatch('loadMessages')"
      >
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
      nextPage: this.$store.state.nextPage,
      deleteData: {
        id: null,
        inProgress: false,
        info: '',
        showInfo: false,
      },
    }
  },
  methods: {
    initDelete(id) {
      this.deleteData.id = id
    },
    async deleteMsg() {
      const id = this.deleteData.id
      this.deleteData.id = false
      try {
        await this.$axios.$delete('/messages/' + id)
        await this.$store.commit('deleteMessage', id)
        this.deleteData.info = 'Die Nachricht wurde gelöscht!'
      } catch (e) {
        this.deleteData.info =
          'Beim Löschen ist ein Fehler aufgetreten: ' + e.message
      }
      setTimeout(() => {
        this.deleteData.showInfo = true
      }, 1)
    },
  },
}
</script>
