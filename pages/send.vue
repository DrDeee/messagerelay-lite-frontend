<template>
  <div>
    <Alert v-if="showInfo" v-bind:info="info" @click="handleOkay()" />
    <Confirm
      v-if="sendingMsg"
      question="Ganz sicher, dass du die Nachricht so wie sie ist absenden willst? Du kannst
    diese nachher nicht mehr bearbeiten, nur noch löschen!"
      @yes="send()"
      @no="sendingMsg = false"
    />
    <Confirm
      v-if="goBack"
      question="Achtung! Du bist dabei, deine jetzige Nachricht zu Löschen! 
    Sicher, dass du fortfahren möchtest?"
      @yes="$router.push('/')"
      @no="goBack = false"
    />

    <div class="border rounded p-1 mb-1">
      <label class="ms-1">Ziel</label>
      <select class="form-select" v-model="target">
        <option value="wid">Wichtige Infos Deligierte</option>
        <option value="iaow">Immer an Ortsgruppe weiterleiten</option>
      </select>
    </div>
    <quill-editor :options="options" v-model="content"></quill-editor>
    <button
      class="btn w-100 mt-2"
      @click="sendingMsg = true"
      v-bind:disabled="canSubmit"
    >
      Absenden
    </button>
    <div class="text-center mt-2">
      <b v-bind:class="canGoBack" @click="back()">⟸ Zurück zur Übersicht</b>
    </div>
  </div>
</template>

<style>
.ql-editor {
  min-height: 25vh;
}
</style>

<script>
export default {
  data: () => {
    return {
      goBack: false,
      msgSent: false,
      sendingMsg: false,
      info: '',
      showInfo: false,
      content: '',
      target: 'wid',
      options: {
        placeholder: 'Nachricht hier rein..',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'strike'],
              [{ list: 'bullet' }, { list: 'ordered' }],
              ['emoji'],
            ],
            handlers: { emoji: function () {} },
          },
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true,
        },
      },
    }
  },
  methods: {
    async send() {
      this.sendingMsg = false
      this.showInfo = true

      try {
        const data = await this.$axios.$post('/messages/create', {
          content: this.content,
          target: this.target,
        })
        this.id = data.id
        this.info = 'Die Nachricht wurde erfolgreich gesendet!'
        this.$store.commit('clear')
        this.$store.dispatch('loadMessages')
      } catch (e) {
        console.error(
          'Error while sending message',
          JSON.parse(JSON.stringify(e))
        )
        this.info = 'Es ist ein Fehler aufgetreten: ' + e.message
      }
    },
    back() {
      if (this.content.trim() == '') this.$router.push('/')
      if (this.sendingMsg || this.showInfo) return
      this.goBack = true
    },
    handleOkay() {
      if (this.id) this.$router.push('/details/' + this.id)
      else this.showInfo = false
    },
  },
  computed: {
    canSubmit() {
      if (this.sendingMsg || this.showInfo) return true
      if (this.content.trim() == '') return true
      return false
    },
    canGoBack() {
      if (this.sendingMsg || this.showInfo) return ''
      else return 'mouse-pointer'
    },
  },
}
</script>
