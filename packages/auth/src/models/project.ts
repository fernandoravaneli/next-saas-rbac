// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o objeto 'Project' usando z.object
export const projectSchema = z.object({
  // Define a propriedade '__typename' com o literal 'Project' e um valor padrão 'Project'
  __typename: z.literal('Project').default('Project'),
  // Define a propriedade 'id' como uma string
  id: z.string(),
  // Define a propriedade 'ownerId' como uma string
  ownerId: z.string(),
})

// Define o tipo 'Project' inferido a partir do schema 'projectSchema'
export type Project = z.infer<typeof projectSchema>
