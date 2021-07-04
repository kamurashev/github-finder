import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

const Users = ({ users, loading }) =>
  loading ? <Spinner /> : 
    <div style={usersStyle}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  ;

const usersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

Users.defaultProps = {
  users: {},
};

export default Users;
