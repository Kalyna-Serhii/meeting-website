import {createStore} from 'vuex';
import VueCookies from 'vue-cookies';

export default createStore({
    state: {
        currentUser: null,
        friendshipRequests: [],
        userFriendshipRequests: [],
        interests: [
            'sport', 'music', 'cinema', 'books', 'travel', 'games', 'cooking', 'art', 'theatre', 'religion',
            'fashion', 'cars', 'animals', 'nature', 'science', 'technology', 'politics', 'psychology', 'history',
            'photography', 'philosophy'
        ],
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setReceivedFriendRequests(state, senders) {
            state.friendshipRequests = senders;
        },
        setSentFriendRequests(state, receivers) {
            state.userFriendshipRequests = receivers;
        },
        clearCurrentUser(state) {
            state.currentUser = null;
            state.friendshipRequests = [];
            state.userFriendshipRequests = [];
            VueCookies.remove('accessToken', )
        }
    },
    actions: {
        logout({commit}) {
            commit('clearCurrentUser');
        },
        addFriend({commit, state}, receiverId) {
            commit('setSentFriendRequests',
                [...state.userFriendshipRequests, receiverId]);
        },
        cancelFriendRequest({commit, state}, receiverId) {
            commit('setSentFriendRequests',
                state.userFriendshipRequests.filter(id => id !== receiverId));
        },
        acceptFriendRequest({commit, state}, senderId) {
            commit('setReceivedFriendRequests',
                state.friendshipRequests.filter(id => id !== senderId));
            commit('setCurrentUser', {
                ...state.currentUser,
                friends: [...state.currentUser.friends, senderId]
            });
        },
        rejectFriendRequest({commit, state}, senderId) {
            commit('setReceivedFriendRequests',
                state.friendshipRequests.filter(id => id !== senderId));
        },
        deleteFromFriends({commit, state}, friendId) {
            commit('setCurrentUser', {
                ...state.currentUser,
                friends: state.currentUser.friends.filter(id => id !== friendId)
            });
        }
    },
    getters: {
        friendshipRequestsCount(state) {
            const count = state.friendshipRequests.length;
            return count > 9
                ? '9+'
                : count;
        }
    }
});