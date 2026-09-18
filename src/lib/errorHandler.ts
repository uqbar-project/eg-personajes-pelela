import { HttpError } from './personajeService'

export function handleError(error: unknown, viewModel: { mensajeError: string }) {
  if (!(error instanceof HttpError) || !error.user) {
    console.error(error)
  }
  viewModel.mensajeError = (error as Error).message
  setTimeout(() => {
    viewModel.mensajeError = ''
  }, 5000)
}
