import { router } from 'pelelajs'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class Home {
  personajes: Personaje[] = []
  texto = ''

  async buscar(): Promise<void> {
    this.personajes = await personajeService.buscarPersonaje(this.texto)
  }

  verPersonaje({ personaje }: { personaje: Personaje }) {
    router.navigateTo(`/personaje/${personaje.id}`)
  }
}
