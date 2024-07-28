// Importa funções e tipos do módulo '@casl/ability'
import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Importa o tipo 'User' do módulo local './models/user'
import type { User } from './models/user'
// Importa as permissões definidas no módulo './permissions'
import { permissions } from './permissions'
// Importa os sujeitos (subjects) dos módulos locais
import { billingSubject } from './subjects/billing'
import { inviteSubject } from './subjects/invite'
import { organizationSubject } from './subjects/organization'
import { projectSubject } from './subjects/project'
import { userSubject } from './subjects/user'

// Reexporta os modelos dos módulos especificados
export * from './models/organization'
export * from './models/project'
export * from './models/user'

// Define um schema para 'AppAbilities' usando 'zod', unindo vários sujeitos
const AppAbilitiesSchema = z.union([
  projectSubject, // Sujeito 'project'
  userSubject, // Sujeito 'user'
  organizationSubject, // Sujeito 'organization'
  inviteSubject, // Sujeito 'invite'
  billingSubject, // Sujeito 'billing'
  // Tupla representando a permissão 'manage' para 'all'
  z.tuple([z.literal('manage'), z.literal('all')]),
])

// Define o tipo 'AppAbilities' inferido a partir do schema 'AppAbilitiesSchema'
type AppAbilities = z.infer<typeof AppAbilitiesSchema>

// Define o tipo 'AppAbility' como 'MongoAbility' com 'AppAbilities'
export type AppAbility = MongoAbility<AppAbilities>
// Exporta 'createAppAbility' como 'createMongoAbility' tipado como 'CreateAbility<AppAbility>'
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

// Função para definir habilidades para um usuário específico
export function defineAbilityFor(user: User) {
  // Cria um construtor de habilidades usando 'AbilityBuilder'
  const builder = new AbilityBuilder(createAppAbility)

  // Verifica se existem permissões definidas para o role do usuário
  if (typeof permissions[user.role] !== 'function') {
    // Se não houver permissões, lança um erro
    throw new Error(`Permissions for role ${user.role} not found`)
  }

  // Aplica as permissões para o role do usuário usando o builder
  permissions[user.role](user, builder)

  // Constrói a habilidade configurada, definindo como detectar o tipo de sujeito
  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename // Retorna o tipo de sujeito baseado no campo '__typename'
    },
  })

  // Retorna a habilidade construída
  return ability
}
