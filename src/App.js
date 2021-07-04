import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import Home from './components/pages/Home';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&q=${text}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  getUser = async (username) => {
    const { user } = this.state;
    const { login } = user;

    if (user && login === username) {
      return;
    }

    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&per_page=5&sort=created:asc`
    );
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, style) => {
    this.setState({ alert: { msg, style } });
    setTimeout(() => this.setState({ alert: null }), 1500);
  };

  render() {
    const { users, loading, alert, user, repos } = this.state;
    const { searchUsers, clearUsers, setAlert, getUser } = this;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/'>
                <Home
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  setAlert={setAlert}
                  users={users}
                  loading={loading}
                />
              </Route>
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:username'>
                <User
                  user={user}
                  repos={repos}
                  loading={loading}
                  getUser={getUser}
                  getUserRepos={this.getUserRepos}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  gr;
}

export default App;
