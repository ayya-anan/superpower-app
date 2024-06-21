let currentUser = null;

module.exports = {
  setCurrentUser: (user) => {
    currentUser = user;
  },
  getCurrentUser: () => currentUser,
};
