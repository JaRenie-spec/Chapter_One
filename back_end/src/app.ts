import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import authorRoutes from './routes/author.routes';
import bookRoutes from './routes/book.routes';
import eventRoutes from './routes/event.routes';
import reviewRoutes from './routes/review.routes';

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://votre-domaine.com']
    : ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);

export default app;
