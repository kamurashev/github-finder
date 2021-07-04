import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

const User = ({
  user: {
    login,
    name,
    hireable,
    avatar_url,
    location,
    bio,
    html_url,
    company,
    blog,
    followers,
    following,
    public_repos,
    public_gists,
  },
  repos,
  loading,
  getUser,
  getUserRepos,
}) => {
  
  //load user into App state
  const { username } = useParams();
  useEffect(() => {
    getUser(username);
    getUserRepos(username);
  }, [getUser, getUserRepos, username]);
  
  return (
  loading ? 
    <Spinner /> : 
    <Fragment>
      <Link to='/' className='btn btn-light'>Back</Link>
      Hireable:{' '}
      {hireable ? 
        <i className='fas fa-check text-success' /> : 
        <i className='fas fa-times-circle text-danger' />}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt={login}
            className='round-img'
            style={{ width: '150px' }} />
          <h1>{name}</h1>
          <p>Location: {location}</p>          
        </div>
        <div>
          {bio && 
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          }
          <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
          <ul>
            <li><strong>Username:</strong> { login }</li>
            <li>{company &&
              <Fragment><strong>Company:</strong> {company}</Fragment>}</li>
            <li>{blog &&
              <Fragment><strong>Website:</strong> {blog}</Fragment>}</li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />  
    </Fragment>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
};

export default User;
