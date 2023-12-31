import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';

const router = express.Router();
console.log('router');
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
