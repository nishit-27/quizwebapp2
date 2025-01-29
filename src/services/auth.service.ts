const API_URL = 'http://localhost:5000/api';

interface UserData {
  fullName: string;
  email: string;
  password: string;
}

export class AuthService {
  static async registerStudent(data: UserData) {
    try {
      const response = await fetch(`${API_URL}/register/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to register user');
      }

      return responseData;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          throw new Error('Unable to connect to server. Please try again later.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static async loginStudent(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/login/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          throw new Error('Unable to connect to server. Please try again later.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static async loginAdmin(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/login/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          throw new Error('Unable to connect to server. Please try again later.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  static logout(): void {
    localStorage.removeItem('user');
  }
} 