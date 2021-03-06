import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}))
app.use(compression())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// serving static assets from react client
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`.yellow.bold));
