// app.js or index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './Routes/user.routes.js';
import mongodbIndex from './Database/index.DB.js';
import ProductRoute from './Routes/product.routes.js';

const app = express();
const PORT = 3000 || process.env.PORT;

/*---------------------
  CORS & Middleware
-----------------------*/
app.use(cors());
app.use(express.json());

/*---------------------
  Routes
-----------------------*/
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v2/product', ProductRoute);

/*---------------------
  Database
-----------------------*/
mongodbIndex();

/*---------------------
  Error Handling Middleware
-----------------------*/
app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
