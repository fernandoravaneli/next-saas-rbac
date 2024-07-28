// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Define um schema para o sujeito 'Billing' usando uma tupla
export const billingSubject = z.tuple([
  // A tupla consiste em duas partes:
  // Primeiro, uma união de literais que representam as ações permitidas: 'manage', 'get', 'export'
  z.union([z.literal('manage'), z.literal('get'), z.literal('export')]),
  // Segundo, o literal 'Billing' que representa o tipo do sujeito
  z.literal('Billing'),
])

// Define o tipo 'BillingSubject' inferido a partir do schema 'billingSubject'
export type BillingSubject = z.infer<typeof billingSubject>
