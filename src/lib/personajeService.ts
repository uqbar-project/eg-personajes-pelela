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

export class HttpError extends Error {
  readonly user: boolean

  constructor(mensaje: string, options: { cause?: unknown; user: boolean }) {
    super(mensaje, { cause: options.cause })
    this.user = options.user
  }
}

class PersonajeService {
  async buscarPersonajes(personajeBusqueda: string): Promise<Personaje[]> {
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
    try {
      const response = await fetch(url)

      if (!response.ok) {
        const errorBody = await response.text().catch(() => '')
        throw this.buildHttpError(response, errorBody)
      }

      return (await response.json()) as T
    } catch (error) {
      if (error instanceof HttpError) {
        throw error
      }

      throw new Error('No pudimos conectar con el servidor. Probá de nuevo en unos minutos.', {
        cause: error,
      })
    }
  }

  private buildHttpError(response: Response, body: string): HttpError {
    const detail = this.detailFrom(body)
    const user = response.status < 500
    const message = user
      ? (detail ?? `No se encontró lo que buscás (error ${response.status}).`)
      : 'Ocurrió un error en el servidor. Probá de nuevo en unos minutos.'
    return new HttpError(message, {
      cause: new Error(`HTTP ${response.status}${detail ? `: ${detail}` : ''}`),
      user,
    })
  }

  private detailFrom(body: string): string | undefined {
    if (!body) {
      return undefined
    }
    try {
      const { error, message } = JSON.parse(body) as { error?: string, message?: string }
      return message || error || body
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
