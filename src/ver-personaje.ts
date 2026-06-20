import { router } from 'pelelajs'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class VerPersonaje {
  personaje!: Personaje

  async initialize() {
    const identificador = Number(router.urlParameters().identificador)
    this.personaje = await personajeService.datosDePersonaje(identificador)
  }

  volver() {
    router.navigateTo('/personajes')
  }
}
