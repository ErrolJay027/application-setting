import { getFirebaseBackend } from "../../helpers/firebase/authUtils";
import { API } from "../../helpers/axios";

export const state = {
  currentUser: sessionStorage.getItem("authUser"),
};

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue;
    saveState("auth.currentUser", newValue);
  },
};

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser;
  },

  currentUser(state) {
    return state.currentUser;
  },
};

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  // eslint-disable-next-line no-unused-vars
  init({ state, dispatch }) {
    dispatch("validate");
  },

  // Logs in the current user.
  logIn({ commit, getters }, { email, password } = {}) {
    if (getters.loggedIn) return getters.currentUser;

    return new Promise((resolve, reject) => {
    //   commit("auth_request");
      API.post("/admin-login", {
        username: email,
        password: password,
      })
        .then((response) => {
          const res = response.data;
          console.log(res);

          if (!res.status) {
            reject(res.message);
            return;
          }

          commit("SET_CURRENT_USER", res.data);
          resolve(res.data);
          //   resolve(res);
          // } else {
          //   commit("auth_error");
          //   reject(res.message);
          // }
        })
        .catch((error) => {
            console.log(error)
        //   commit("auth_error");
          reject(error.response.data.message);
        });
    });

    // return getFirebaseBackend().loginUser(email, password).then((response) => {
    //     const user = response
    //     commit('SET_CURRENT_USER', user)
    //     return user
    // });
  },

  // Logs out the current user.
  logOut({ commit }) {
    // eslint-disable-next-line no-unused-vars
    commit("SET_CURRENT_USER", null);
    return true
    // return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      // getFirebaseBackend()
        // .logout()
        // .then(() => {
          // resolve(true);
        // })
        // .catch((error) => {
        //   reject(this._handleError(error));
        // });
    // });
  },

  // register the user
  register({ commit, dispatch, getters }, { username, email, password } = {}) {
    if (getters.loggedIn) return dispatch("validate");

    return getFirebaseBackend()
      .registerUser(username, email, password)
      .then((response) => {
        const user = response;
        commit("SET_CURRENT_USER", user);
        return user;
      });
  },

  // register the user
  // eslint-disable-next-line no-unused-vars
  resetPassword({ commit, dispatch, getters }, { email } = {}) {
    if (getters.loggedIn) return dispatch("validate");

    return getFirebaseBackend()
      .forgetPassword(email)
      .then((response) => {
        const message = response.data;
        return message;
      });
  },

  // Validates the current user's token and refreshes it
  // with new data from the API.
  // eslint-disable-next-line no-unused-vars
  validate({ commit, state }) {
    if (!state.currentUser) return Promise.resolve(null);
    const user = getFirebaseBackend().getAuthenticatedUser();
    commit("SET_CURRENT_USER", user);
    return user;
  },
};

// ===
// Private helpers
// ===

function saveState(key, state) {
  window.sessionStorage.setItem(key, JSON.stringify(state));
}
