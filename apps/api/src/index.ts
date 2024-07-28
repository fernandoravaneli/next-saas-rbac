// Importa a função 'defineAbilityFor' e o schema 'projectSchema' do módulo '@saas/auth'
import { defineAbilityFor, projectSchema } from '@saas/auth'

// Define as habilidades para um usuário específico com role 'MEMBER' e id 'user-id'
const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

// Valida e cria um objeto 'project' usando o 'projectSchema' com id 'project-id' e ownerId 'user-id'
const project = projectSchema.parse({ id: 'project-id', ownerId: 'user-id' })

// Verifica se o usuário tem a permissão de 'get' para 'Billing'
console.log(ability.can('get', 'Billing')) // false

// Verifica se o usuário tem a permissão de 'create' para 'Invite'
console.log(ability.can('create', 'Invite')) // false

// Verifica se o usuário tem a permissão de 'delete' para o objeto 'project'
console.log(ability.can('delete', project)) // true, pois o 'ownerId' do projeto corresponde ao 'id' do usuário
