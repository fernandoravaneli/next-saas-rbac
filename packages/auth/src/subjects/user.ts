// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o sujeito 'User' usando uma tupla
export const userSubject = z.tuple([
  // A tupla consiste em duas partes:
  // Primeiro, uma união de literais que representam as ações permitidas:
  // 'manage', 'get', 'update', 'delete'
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  // Segundo, o literal 'User' que representa o tipo do sujeito
  z.literal('User'),
])

// Define o tipo 'UserSubject' inferido a partir do schema 'userSubject'
export type UserSubject = z.infer<typeof userSubject>
