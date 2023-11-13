import 'dotenv/config';
import * as express from 'express';
import * as morgan from 'morgan';
import * as fs from 'fs';
import * as path from 'path';
import * as cors from 'cors';
// import routes from './routes';
// import './models/index';

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// routes(app);

app.use((_req, res) => {
  res.status(404).send('404 - Página não encontrada');
});

app.listen(3333, () => {
  console.log(`Servidor rodando na porta 3333!`);
});
