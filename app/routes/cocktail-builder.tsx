import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cocktail-builder')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cocktails/cocktail-builder"!</div>
}
