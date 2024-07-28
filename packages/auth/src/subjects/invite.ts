// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o sujeito 'Invite' usando uma tupla
export const inviteSubject = z.tuple([
  // A tupla consiste em duas partes:
  // Primeiro, uma união de literais que representam as ações permitidas: 'manage', 'get', 'create', 'delete'
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('delete'),
  ]),
  // Segundo, o literal 'Invite' que representa o tipo do sujeito
  z.literal('Invite'),
])

// Define o tipo 'InviteSubject' inferido a partir do schema 'inviteSubject'
export type InviteSubject = z.infer<typeof inviteSubject>
