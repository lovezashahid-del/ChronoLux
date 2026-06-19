const AUTH_KEY = 'chrono_auth';
const SESSION_KEY = 'chrono_session';

const Auth = {
  getUser() {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  login(email, password) {
    const users = this._getUsers();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return { success: false, message: 'Invalid email or password.' };

    const { password: _, ...safeUser } = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },

  register(name, email, password) {
    const users = this._getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const user = { id: Date.now().toString(), name, email, password };
    users.push(user);
    localStorage.setItem('chrono_users', JSON.stringify(users));

    const { password: _, ...safeUser } = user;
    localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  getSession() {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : { category: null };
  },

  setSession(category) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ category, timestamp: Date.now() }));
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  _getUsers() {
    const data = localStorage.getItem('chrono_users');
    if (data) return JSON.parse(data);
    const demo = [
      { id: 'demo', name: 'Demo User', email: 'demo@chrono.com', password: 'demo123' },
    ];
    localStorage.setItem('chrono_users', JSON.stringify(demo));
    return demo;
  },
};
