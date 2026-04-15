import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages';

export const Routes = () => (
  <main>
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  </main>
);