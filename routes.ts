import type { RouteDefinition } from 'pelelajs'
import { Home } from './src/home'
import { MainLayout } from './src/main-layout'
import { NotFound } from './src/not-found'
import { VerPersonaje } from './src/ver-personaje'

export const routes: RouteDefinition[] = [
  {
    path: '',
    layout: MainLayout,
    children: [
      { path: '/personajes', component: Home },
      { path: '/personaje/:identificador', component: VerPersonaje },
    ],
  },
  { path: '*', component: NotFound }
]
