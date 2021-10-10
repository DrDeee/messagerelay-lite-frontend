export const state = () => {
    return {
        messages: [],
        page: 1
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
        state.page++
    },
    pageBack(state) {
        state.page--
    }

}

export const actions = {
    async loadMessages({ commit, state }) {
        commit('clear')
        try {
            const msgs = await this.$axios.$get('/messages?page=' + state)
            for (const msg of msgs) {
                commit('add', msg)
            }
        } catch (e) {
            console.log(e)
        }
    }
}