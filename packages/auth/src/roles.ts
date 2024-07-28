// Importa o módulo 'z' da biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o tipo 'Role' usando uma união de literais
export const roleSchema = z.union([
  z.literal('ADMIN'), // Literal 'ADMIN'
  z.literal('MEMBER'), // Literal 'MEMBER'
  z.literal('BILLING'), // Literal 'BILLING'
])

// Define o tipo 'Role' inferido a partir do schema 'roleSchema'
export type Role = z.infer<typeof roleSchema>
