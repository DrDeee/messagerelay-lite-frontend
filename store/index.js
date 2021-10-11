export const state = () => {
    return {
        messages: [],
        page: 1,
        nextPage: false
    }
}

export const mutations = {
    add(state, msg) {
        state.messages.push(msg)
    },
    clear(state) {
        state.messages.length = 0
    },
    nextPage(state) {
        state.page = state.page + 1
    },
    setNextPage(state, bool) {
        state.nextPage = bool
    },
    deleteMessage(state, id) {
        for (const index in state.messages) {
            if (state.messages[index].id == id)
                state.messages.splice(index, 1)
        }
    }

}

export const actions = {
    async loadMessages({ commit, state }) {
        try {
            const msgs = await this.$axios.$get('/messages?page=' + state.page)
            console.log(msgs.length == 25)
            commit('setNextPage', msgs.length == 25)
            commit('nextPage')
            for (const msg of msgs) {
                commit('add', msg)
            }
        } catch (e) {
            console.log(e)
        }
    }
}