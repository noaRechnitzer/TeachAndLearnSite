import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '@rehooks/local-storage';

const MyComponent = () => {
  const [user, setUser] = useState(null);
  const { authToken } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { getItem, setItem } = useLocalStorage('user');

  useEffect(() => {
    const storedUser = getItem();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (username, password) => {
    // ...

    // לאחר התחברות מוצלחת, עדכן את Redux ו-Local Storage
    dispatch({ type: 'LOGIN_SUCCESS', payload: { authToken, user } });
    setItem(user);
  };

  const handleLogout = () => {
    // ...

    // לאחר התנתקות, נקה את Redux ו-Local Storage
    dispatch({ type: 'LOGOUT' });
    setItem(null);
  };

  return (
    <div>
      {user && <p>המשתמש המחובר: {user.name}</p>}
      <button onClick={handleLogin}>התחבר</button>
      <button onClick={handleLogout}>התנתק</button>
    </div>
  );
};

export default MyComponent;