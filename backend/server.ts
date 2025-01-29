import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Register student endpoint
app.post('/api/register/student', async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...studentWithoutPassword } = student;
    res.json(studentWithoutPassword);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

// Login student endpoint
app.post('/api/login/student', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...studentWithoutPassword } = student;
    res.json(studentWithoutPassword);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Invalid credentials' });
  }
});

// Login admin endpoint
app.post('/api/login/admin', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { password: _, ...adminWithoutPassword } = admin;
    res.json(adminWithoutPassword);
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Invalid credentials' });
  }
});

// Save test result
app.post('/api/test-results', async (req: Request, res: Response) => {
  try {
    const { studentId, ...testData } = req.body;
    const result = await prisma.testResult.create({
      data: {
        studentId,
        ...testData,
        questionTimes: JSON.stringify(testData.questionTimes),
        answers: testData.answers ? JSON.stringify(testData.answers) : null,
        correctAnswers: testData.correctAnswers ? JSON.stringify(testData.correctAnswers) : null,
      },
    });
    res.json(result);
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ error: 'Failed to save test result' });
  }
});

// Get test history for a student
app.get('/api/test-results/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const results = await prisma.testResult.findMany({
      where: { studentId },
      orderBy: { testDate: 'desc' },
    });
    
    // Parse JSON fields back to objects
    const formattedResults = results.map(result => ({
      ...result,
      questionTimes: JSON.parse(result.questionTimes as string),
      answers: result.answers ? JSON.parse(result.answers as string) : undefined,
      correctAnswers: result.correctAnswers ? JSON.parse(result.correctAnswers as string) : undefined,
    }));
    
    res.json(formattedResults);
  } catch (error) {
    console.error('Error fetching test results:', error);
    res.status(500).json({ error: 'Failed to fetch test results' });
  }
});

// Get analytics for a student
app.get('/api/analytics/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const results = await prisma.testResult.findMany({
      where: { studentId },
    });
    
    const analytics = {
      totalTests: results.length,
      averageScore: results.reduce((acc, curr) => acc + curr.score, 0) / results.length || 0,
      totalCorrect: results.reduce((acc, curr) => acc + curr.correct, 0),
      totalAttempted: results.reduce((acc, curr) => acc + curr.attempted, 0),
      testHistory: results.map(r => ({
        date: r.testDate,
        score: r.score,
        testTitle: r.testTitle,
      })),
    };
    
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 