// Authentication utilities
export const AUTH_USER = {
  username: 'admin',
  password: 'admin123'
};

export const login = (username, password) => {
  if (username === AUTH_USER.username && password === AUTH_USER.password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', username);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');
};