import { router } from 'pelelajs'
import { personajeService } from './lib/personajeService'
import type { Personaje } from './lib/personaje'

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
