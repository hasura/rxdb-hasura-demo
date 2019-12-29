import React from 'react';
import auth0 from 'auth0-js';

import history from '../utils/history';
import { AUTH_CONFIG } from './auth0-variables';
import App from './App';
import Login from './Login';

export default class AppWrapper extends React.Component {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isExpired = this.isExpired.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);

    this.state = {
      idToken: null,
      userId: localStorage.getItem("userId"),
    };
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.error(err);
        alert(`Error: ${err.error} - ${err.errorDescription}`);
      }
    });
  };

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the access token will expire at
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;
    this.userId = authResult.idTokenPayload.sub;

    localStorage.setItem('userId', this.userId);

    // navigate to the home route
    history.replace('/');
    this.setState({
      idToken: authResult.idToken,
      userId: this.userId,
    });
  }

  renewSession() {
    const interval = setInterval(() => {
      const shouldRenewSession = this.isLoggedIn && (!this.idToken || this.isExpired());

      if (window.navigator.onLine && shouldRenewSession) {
        this.auth0.checkSession({}, (err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
          } else if (err) {
            this.logout();
            console.log(err);
            alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
          }
        });
      }
    }, 5000);
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    this.auth0.logout({
      return_to: window.location.origin
    });

    // navigate to the home route
    history.replace('/');
    this.setState({
      idToken: null
    });
  }

  isExpired() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() > expiresAt;
  }

  componentDidMount() {
    // If this is a callback URL then do the right things
    const location = this.props.location;
    if (location && location.pathname.startsWith('/callback') && /access_token|id_token|error/.test(location.hash)) {
      this.handleAuthentication();
      return;
    }

    if (this.isLoggedIn()) {
      this.renewSession();
      return;
    }
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true'
  }

  render() {
    const location = this.props.location;
    const isCallbackPage = location && location.pathname.startsWith('/callback');

    if (!this.isLoggedIn() && !isCallbackPage) {
      return (<Login loginHandler={this.login} />);
    }

    return (<App
      auth={{ userId: this.userId }}
      logoutHandler={this.logout}
    />);
  }
}
