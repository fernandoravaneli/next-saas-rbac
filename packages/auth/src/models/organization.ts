// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o objeto 'Organization' usando z.object
export const organizationSchema = z.object({
  // Define a propriedade '__typename' com o literal 'Organization' e um valor padrão 'Organization'
  __typename: z.literal('Organization').default('Organization'),
  // Define a propriedade 'id' como uma string
  id: z.string(),
  // Define a propriedade 'ownerId' como uma string
  ownerId: z.string(),
})

// Define o tipo 'Organization' inferido a partir do schema 'organizationSchema'
export type Organization = z.infer<typeof organizationSchema>
