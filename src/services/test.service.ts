const API_URL = 'http://localhost:5000/api';

export class TestService {
  static async saveTestResult(testData: any) {
    const response = await fetch(`${API_URL}/test-results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    if (!response.ok) throw new Error('Failed to save test result');
    return response.json();
  }

  static async getTestHistory(studentId: string) {
    const response = await fetch(`${API_URL}/test-results/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch test history');
    return response.json();
  }

  static async getAnalytics(studentId: string) {
    const response = await fetch(`${API_URL}/analytics/${studentId}`);
    if (!response.ok) throw new Error('Failed to fetch analytics');
    return response.json();
  }
} 