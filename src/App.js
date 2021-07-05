import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import Home from './components/pages/Home';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(res.data);
    }
    setLoading(true);
    getUsers();
    setLoading(false);  
  }, []);

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&q=${text}`
    );
    setUsers(res.data.items);
    setLoading(false);  
  };

  const getUser = async (username) => {    
    const { login } = user;

    if (user && login === username) {
      return;
    }

    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&per_page=5&sort=created:asc`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, style) => {    
    setAlert({ msg, style });
    setTimeout(() => setAlert(null), 1500);
  };

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
                showAlert={showAlert}
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
                getUserRepos={getUserRepos}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
