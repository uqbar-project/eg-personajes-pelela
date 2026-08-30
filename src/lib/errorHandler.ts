export function handleError(error: unknown, vm: { mensajeError: string }) {
  console.error(error)
  vm.mensajeError = (error as Error).message
  setTimeout(() => {
    vm.mensajeError = ''
  }, 5000)
}
