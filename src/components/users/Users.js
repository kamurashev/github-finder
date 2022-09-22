import React, { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/githubContext';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = () => {
  const { getUsers, users, loading } = useContext(GithubContext);

  // eslint-disable-next-line
  useEffect(() => getUsers(), []);

  return loading ? (
    <Spinner />
  ) : (
    <div className = 'users'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
