import Vue from 'vue'
import Quill from 'quill'

import * as Emoji from 'quill-emoji'
Quill.register('modules/emoji', Emoji)

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)