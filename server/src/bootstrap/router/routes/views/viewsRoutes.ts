import { getRoute } from '../utils/routeFactory';
import { sendView } from '../utils/routes-utils';

export default [
  getRoute('/', sendView('index.html')),
  getRoute('*', sendView('404.html')),
];
