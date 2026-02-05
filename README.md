## Como rodar o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador.

## Testes

O projeto utiliza [Vitest](https://vitest.dev/) com [Testing Library](https://testing-library.com/).

```bash
# Executar testes
npm run test

# Executar testes com interface visual
npm run test:ui

# Executar testes com cobertura
npm run test:coverage
```

## Funcionalidades Bônus

- **Listagem de Tutores** - Página `/tutores` com busca por nome e paginação
- **Desvincular Pet-Tutor** - DELETE /v1/tutores/{id}/pets/{petId}
- **Autenticação** - Login com refresh token automático
- **Validação com Zod** - Schemas de validação em formulários
- **Máscaras de Entrada** - Telefone e CPF formatados automaticamente
- **Navegação no Header** - Botões de acesso rápido para Pets e Tutores
- **Loading States** - Indicadores de carregamento em todas as operações
- **Toast Notifications** - Feedback visual de sucesso/erro
- **Responsive Design** - Layout adaptativo para diferentes tamanhos de tela

## Arquitetura

### Lazy Loading de Rotas

Este projeto utiliza **Next.js App Router** que implementa **code-splitting automático** por rota.

Cada arquivo `page.tsx` gera um chunk JavaScript separado que é carregado sob demanda:

- `/` → chunk da listagem de pets
- `/pets/[id]` → chunk dos detalhes do pet
- `/tutores` → chunk do módulo de tutores (quando implementado)

Isso significa que o usuário só baixa o código necessário para a página atual, melhorando a performance inicial.
