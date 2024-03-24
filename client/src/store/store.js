import {createStore} from 'vuex';

export default createStore({
    state: {
        currentUser: null,
        senders: [],
        receivers: [],
        error: false,
        errorMessage: ''
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

        setError(state, errorMessage) {
            state.error = true;
            state.errorMessage = errorMessage;
        },
        clearError(state) {
            state.error = false;
            state.errorMessage = '';
        }
    },
    actions: {
        logout({commit}) {
            commit('clearCurrentUser');
        },

        showError({commit}, errorMessage) {
            commit('setError', errorMessage);
        },
        clearError({commit}) {
            commit('clearError');
        }
    },
    getters: {}
});