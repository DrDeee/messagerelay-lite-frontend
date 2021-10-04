import Vue from 'vue'
import Quill from 'quill'

import * as Emoji from 'quill-emoji'
Quill.register('modules/emoji', Emoji)

const Embed = Quill.import('blots/embed');

class EmojiBlot extends Embed {
    static create(value) {
        let node = super.create();
        console.log(JSON.stringify(node))
        if (typeof value === 'object') {
            node.innerText = String.fromCodePoint(...EmojiBlot.parseUnicode(value.unicode));
        } else if (typeof value === "string") {
            const valueObj = emojiMap[value];

            if (valueObj) {
                node.innerText = String.fromCodePoint(...EmojiBlot.parseUnicode(valueObj));
            }
        }

        return node;
    }

    static value(node) {
        return node.dataset.name;
    }

    static parseUnicode(string) {
        return string.split('-').map(str => parseInt(str, 16));
    }
}

EmojiBlot.blotName = 'emoji';
EmojiBlot.tagName = 'span';
EmojiBlot.nodeName = 'span';

Quill.register({
    'formats/emoji': EmojiBlot
}, true);

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)