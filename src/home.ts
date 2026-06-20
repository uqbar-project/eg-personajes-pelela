import { router } from 'pelelajs'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class Home {
  personajes: Personaje[] = []
  personajeABuscar = ''
  mensajeError = ''

  async buscar(): Promise<void> {
    try {
      this.personajes = await personajeService.buscarPersonaje(this.personajeABuscar)
    } catch (error: unknown) {
      console.error(error)
      this.mensajeError = (error as Error).message
      setTimeout(() => {
        this.mensajeError = ''
      }, 5000)
    }
  }

  verPersonaje({ personaje }: { personaje: Personaje }) {
    router.navigateTo(`/personaje/${personaje.id}`)
  }
}
