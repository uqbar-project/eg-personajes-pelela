import { HttpError } from './personajeService'

export function handleError(error: unknown, vm: { mensajeError: string }) {
  if (!(error instanceof HttpError) || !error.user) {
    console.error(error)
  }
  vm.mensajeError = (error as Error).message
  setTimeout(() => {
    vm.mensajeError = ''
  }, 5000)
}
