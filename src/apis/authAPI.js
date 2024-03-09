export default {
  signup(email, password, nickname) {
    return fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  forgot(email) {
    return fetch('/api/auth/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete(email, password) {
    return fetch('/api/auth/delete', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  verifyResetToken(resetToken) {
    return fetch('/api/auth/verifyResetToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetToken }),
    });
  },
  reset(userEmail, userPassword) {
    return fetch('/api/auth/reset', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });
  },
};
