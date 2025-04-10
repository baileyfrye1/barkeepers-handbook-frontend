import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/cocktail-creator')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/cocktail-creator"!</div>
}
