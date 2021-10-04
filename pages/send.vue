<template>
  <div>
    <div class="border rounded p-1 mb-1">
      <label class="ms-1">Ziel</label>
      <select class="form-select">
        <option>Wichtige Infos Deligierte</option>
        <option>Immer an Ortsgruppe weiterleiten</option>
      </select>
    </div>
    <quill-editor :options="options" v-model="content"></quill-editor>
    <button class="btn btn-primary w-100 mt-2" @click="send()">Absenden</button>
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
      options: {
        placeholder: 'Nachricht hier rein..',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
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
    send() {
      if (
        confirm(
          'Ganz sicher, dass du die Nachricht so wie sie ist absenden willst?' +
            ' Du kannst diese nachher nicht mehr bearbeiten, nur noch löschen!'
        )
      ) {
      }
    },
  },
}
</script>
