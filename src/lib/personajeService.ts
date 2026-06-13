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
    if (!response) {
      throw new Error(`No se encontró el personaje con identificador ${idPersonaje}`)
    }
    return toPersonaje(response)
  }

  private async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error al obtener datos de ${url}`)
    }
    return response.json() as Promise<T>
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
  id: number,
  name: string
  status: string
  species: string
  gender: string
  image: string
}): Personaje => new Personaje(id, name, image, status, species, gender)

export const personajeService = new PersonajeService()
