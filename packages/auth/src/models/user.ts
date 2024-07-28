// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Importa o schema de role do módulo local '../roles'
import { roleSchema } from '../roles'

// Define um schema para o objeto 'User' usando z.object
export const userSchema = z.object({
  // Define a propriedade 'id' como uma string
  id: z.string(),
  // Define a propriedade 'role' usando o schema importado 'roleSchema'
  role: roleSchema,
})

// Define o tipo 'User' inferido a partir do schema 'userSchema'
export type User = z.infer<typeof userSchema>
