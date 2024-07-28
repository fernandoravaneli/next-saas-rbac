// Importação de tipos do módulo '@casl/ability'
import type { AbilityBuilder } from '@casl/ability'

// Importação de tipos locais
import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

// Definição de um tipo para a função que atribui permissões baseadas em roles (perfis)
type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

// Exportação de um objeto que define as permissões para cada role
export const permissions: Record<Role, PermissionsByRole> = {
  // Permissões para o role 'ADMIN'
  ADMIN(user, { can, cannot }) {
    // 'can' define ações que o usuário pode executar
    // 'manage' significa que o usuário pode fazer qualquer coisa ('all' recursos)
    can('manage', 'all')

    // 'cannot' define ações que o usuário não pode executar
    // Administradores não podem transferir propriedade ou atualizar organizações
    cannot(['transfer_ownership', 'update'], 'Organization')
    // Administradores podem transferir propriedade ou atualizar organizações apenas se forem os proprietários
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    })
  },
  // Permissões para o role 'MEMBER'
  MEMBER(user, { can }) {
    // Membros podem visualizar usuários
    can('get', 'User')
    // Membros podem criar e visualizar projetos
    can(['create', 'get'], 'Project')
    // Membros podem atualizar ou deletar projetos apenas se forem os proprietários
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  // Permissões para o role 'BILLING'
  BILLING(__, { can }) {
    // Usuários com role 'BILLING' podem gerenciar tudo relacionado a 'Billing'
    can('manage', 'Billing')
  },
}
