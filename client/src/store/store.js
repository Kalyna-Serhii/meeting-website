import {createStore} from 'vuex';

export default createStore({
    state: {
        currentUser: null,
        senders: [],
        receivers: [],
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setReceivedFriendRequests(state, senders) {
            state.senders = senders;
        },
        setSentFriendRequests(state, receivers) {
            state.receivers = receivers;
        },
        clearCurrentUser(state) {
            state.currentUser = null;
            state.senders = [];
            state.receivers = [];
        },
    },
    actions: {
        logout({commit}) {
            commit('clearCurrentUser');
        }
    },
    getters: {}
});