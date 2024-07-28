// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Importa o schema de organização do módulo local '../models/organization'
import { organizationSchema } from '../models/organization'

// Define um schema para o sujeito 'Organization' usando uma tupla
export const organizationSubject = z.tuple([
  // A tupla consiste em duas partes:
  // Primeiro, uma união de literais que representam as ações permitidas:
  // 'manage', 'create', 'update', 'delete', 'transfer_ownership'
  z.union([
    z.literal('manage'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  // Segundo, uma união que pode ser o literal 'Organization' ou o schema de organização
  z.union([z.literal('Organization'), organizationSchema]),
])

// Define o tipo 'OrganizationSubject' inferido a partir do schema 'organizationSubject'
export type OrganizationSubject = z.infer<typeof organizationSubject>
