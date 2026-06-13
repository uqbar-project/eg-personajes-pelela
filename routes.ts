import type { RouteDefinition } from 'pelelajs'
import { Home } from './src/home'
import { VerPersonaje } from './src/ver-personaje'

export const routes: RouteDefinition[] = [
  { path: '/personaje/:identificador', component: VerPersonaje },
  { path: '/', component: Home },
  { path: '*', component: Home },
]
