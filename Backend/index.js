import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import router from './Routes/user.routes.js';
import adminRouter from './Routes/admin.route.js'; // Ensure you have this file

const app = express();
const PORT = 3000;

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
app.use('/api/v1/user', router);
app.use('/api/v8/admin', adminRouter);

/*---------------------
  Database
-----------------------*/
import mongodbIndex from './Database/index.DB.js';
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
