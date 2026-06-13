import { router } from 'pelelajs'
import type { Personaje } from './lib/personaje'
import { personajeService } from './lib/personajeService'

export class VerPersonaje {
  personaje!: Personaje

  initialize() {
    const identificador = Number(router.urlParameters().identificador)
    personajeService.datosDePersonaje(identificador).then((_personaje) => {
      this.personaje = _personaje
      console.info('Datos del personaje:', this.personaje)
    })
  }

  volver() {
    router.navigateTo('/personajes')
  }
}
