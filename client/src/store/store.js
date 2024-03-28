import {createStore} from 'vuex';

export default createStore({
    state: {
        currentUser: null,
        senders: [],
        receivers: [],
        error: false,
        errorMessage: '',
        interests: [
            'sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'fashion',
            'photography', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
            'religion', 'philosophy'
        ],
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
        }
    },
    actions: {
        logout({commit}) {
            commit('clearCurrentUser');
            localStorage.setItem('isAuth', false);
        },
    },
    getters: {}
});