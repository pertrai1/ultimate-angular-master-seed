angular
  .module('components.auth', [
    'ui.router',
    'firebase'
  ])
  .config(function($firebaseRefProvider) {
    var config = {
    apiKey: "AIzaSyAWfNCpqkAUO2Z8w-P2uf16CVgPENx5M5w",
    authDomain: "contacts-a7c78.firebaseapp.com",
    databaseURL: "https://contacts-a7c78.firebaseio.com",
    storageBucket: "contacts-a7c78.appspot.com",
    messagingSenderId: "809151718460"
  };
  $firebaseRefProvider
    .registerUrl({
        default: config.databaseURL,
        contacts: config.databaseURL + '/contacts'
    });
  firebase.initializeApp(config);
  })
  .run(function($transitions, $state, AuthService) {
      $transitions.onStart({
        to: function(state) {
          return !!(state.data && state.data.requiredAuth);
        }
      }, function() {
        return AuthService
          .requireAuthentication()
          .catch(function() {
            return $state.target('auth.login');
          })
      });
      $transitions.onStart({
        to: 'auth.*'
      }, function() {
        if (AuthService.isAuthenticated()) {
          return $state.target('app');
        }
      });
  });
