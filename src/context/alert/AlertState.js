import { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import { SHOW_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initilState = null;

  const [state, dispatch] = useReducer(alertReducer, initilState);

  const showAlert = (msg, style) => {
    dispatch({ type: SHOW_ALERT, payload: { msg, style } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 1500);
  };

  return (
    <alertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
