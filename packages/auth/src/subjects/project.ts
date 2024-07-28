// Importa a biblioteca 'zod' para validação e definição de schemas
import { z } from 'zod'

// Importa o schema do projeto do módulo local '../models/project'
import { projectSchema } from '../models/project'

// Define um schema para o sujeito 'Project' usando uma tupla
export const projectSubject = z.tuple([
  // A tupla consiste em duas partes:
  // Primeiro, uma união de literais que representam as ações permitidas:
  // 'manage', 'get', 'create', 'update', 'delete'
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  // Segundo, uma união que pode ser o literal 'Project' ou o schema do projeto
  z.union([z.literal('Project'), projectSchema]),
])

// Define o tipo 'ProjectSubject' inferido a partir do schema 'projectSubject'
export type ProjectSubject = z.infer<typeof projectSubject>
