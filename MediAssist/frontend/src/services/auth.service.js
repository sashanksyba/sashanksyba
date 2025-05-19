import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password, role = 'patient') {
    return axios.post(API_URL + 'signup', {
      username,
      email,
      password,
      role
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    
    // Check if token is expired
    if (user && user.accessToken) {
      const decodedToken = jwtDecode(user.accessToken);
      const currentTime = Date.now() / 1000;
      
      if (decodedToken.exp < currentTime) {
        this.logout();
        return null;
      }
    }
    
    return user;
  }

  isTokenValid() {
    const user = this.getCurrentUser();
    return !!user;
  }
}

export default new AuthService();
