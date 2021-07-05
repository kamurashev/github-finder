import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Search from '../users/Search';
import Users from '../users/Users';

const Home = ({
  searchUsers,
  clearUsers,
  showAlert,
  users,
  loading,
}) => {
  return (
    <Fragment>
      <Search
        searchUsers={searchUsers}
        clearUsers={clearUsers}
        showClearBtn={users.length > 0}
        showAlert={showAlert}
      />
      <Users users={users} loading={loading} />
    </Fragment>
  );
};

Home.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Home;
