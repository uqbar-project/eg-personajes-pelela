import { router } from 'pelelajs'
import { handleError } from './lib/errorHandler'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class Home {
  personajes: Personaje[] = []
  personajeABuscar = ''
  mensajeError = ''

  async buscar(): Promise<void> {
    try {
      this.personajes = await personajeService.buscarPersonajes(this.personajeABuscar)
    } catch (error: unknown) {
      handleError(error, this)
    }
  }

  verPersonaje = ({ personaje }: { personaje: Personaje }) => {
    router.navigateTo(`/personaje/${personaje.id}`)
  }
}
