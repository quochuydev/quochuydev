import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { Server as IOServer } from 'socket.io';
import { env } from './config/env';
import roomsRouter from './api/rooms';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(roomsRouter);

const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  // Placeholder signaling events will be implemented later
  socket.on('disconnect', () => {
    // no-op
  });
});

app.get('/health', (_req, res) => res.json({ ok: true }));

server.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`backend listening on ${env.PORT}`);
});
