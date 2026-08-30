import { Personaje } from './personaje'

// Cambia tu fetch actual por la nueva dirección estática:
const PUBLIC_API_BASE_URL = 'https://rickandmortyapi.com/api'
const PUBLIC_API_VERSION = ''

type CharactersJSON = {
  results: CharacterJSON[]
}

type CharacterJSON = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: {
    name: string
    url: string
  }
  location: {
    name: string
    url: string
  }
  image: string
  episode: string[]
  url: string
  created: string
}

class PersonajeService {
  async buscarPersonaje(personajeBusqueda: string): Promise<Personaje[]> {
    const response = await this.get<CharactersJSON>(
      `${PUBLIC_API_BASE_URL}/${PUBLIC_API_VERSION}/character/?name=${personajeBusqueda}`,
    )
    return response.results.map(toPersonaje)
  }

  async datosDePersonaje(idPersonaje: number): Promise<Personaje> {
    const response = await this.get<CharacterJSON>(
      `${PUBLIC_API_BASE_URL}/${PUBLIC_API_VERSION}/character/${idPersonaje}`,
    )
    return toPersonaje(response)
  }

  private async get<T>(url: string): Promise<T> {
    let response: Response
    try {
      response = await fetch(url)
    } catch (err) {
      throw new Error('No pudimos conectar con el servidor. Probá de nuevo en unos minutos.', {
        cause: err,
      })
    }
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw this.buildHttpError(response, body)
    }
    return response.json() as Promise<T>
  }

  private buildHttpError(response: Response, body: string): Error {
    const detail = this.detailFrom(body)
    const message =
      response.status >= 500
        ? 'Ocurrió un error en el servidor. Probá de nuevo en unos minutos.'
        : (detail ?? `No se encontró lo que buscás (error ${response.status}).`)
    return new Error(message, {
      cause: new Error(`HTTP ${response.status}${detail ? `: ${detail}` : ''}`),
    })
  }

  private detailFrom(body: string): string | undefined {
    if (!body) {
      return undefined
    }
    try {
      const { error } = JSON.parse(body) as { error?: string }
      return error || body
    } catch {
      return body
    }
  }
}

const toPersonaje = ({
  id,
  name,
  status,
  species,
  gender,
  image,
}: {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
}): Personaje => new Personaje(id, name, image, status, species, gender)

export const personajeService = new PersonajeService()
