import { router } from 'pelelajs'
import { handleError } from './lib/errorHandler'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class VerPersonaje {
  personaje!: Personaje
  mensajeError = ''

  async initialize() {
    try {
      const identificador = Number(router.urlParameters().identificador)
      this.personaje = await personajeService.datosDePersonaje(identificador)
    } catch (error: unknown) {
      handleError(error, this)
    }
  }

  volver() {
    router.navigateTo('/')
  }
}
