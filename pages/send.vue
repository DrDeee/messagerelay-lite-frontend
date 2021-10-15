<template>
  <div>
    <div class="border rounded p-1 mb-1">
      <label class="ms-1">Ziel</label>
      <select class="form-select" v-model="target">
        <option value="wid">Wichtige Infos Deligierte</option>
        <option value="iaow">Immer an Ortsgruppe weiterleiten</option>
      </select>
    </div>
    <quill-editor :options="options" v-model="content"></quill-editor>
    <button
      class="btn btn-primary w-100 mt-2"
      @click="send()"
      v-bind:disabled="canSubmit"
    >
      Absenden
    </button>
    <div class="text-center mt-2">
      <b class="mouse-pointer" @click="$router.push('/')">⟸ Zurück zum Start</b>
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
      content: '',
      target: 'wid',
      options: {
        placeholder: 'Nachricht hier rein..',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic'],
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
      console.log(this.target)
      if (
        confirm(
          'Ganz sicher, dass du die Nachricht so wie sie ist absenden willst?' +
            ' Du kannst diese nachher nicht mehr bearbeiten, nur noch löschen!'
        )
      ) {
        try {
          const data = await this.$axios.$post('/messages/create', {
            content: this.content,
            target: this.target,
          })
          alert('Die Nachricht wurde erfolgreich gesendet!')
          this.$store.commit('clear')
          this.$store.dispatch('loadMessages')
          this.$router.push('/')
        } catch (e) {
          alert('Es ist ein Fehler aufgetreten!')
        }
      }
    },
  },
  computed: {
    canSubmit() {
      if (this.content.trim() == '') return true
      return false
    },
  },
}
</script>
