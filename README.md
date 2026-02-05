# Pet Manager

Sistema de gerenciamento de pets e tutores desenvolvido para o Processo Seletivo Nº 001/2026/SEPLAG.

## Dados do Candidato

| Campo | Valor |
|-------|-------|
| **Candidato** | Giuseppe Damin Soldatelli |
| **Email** | zeppexsol@gmail.com |
| **Nº Inscrição** | 16511 |
| **Processo Seletivo** | Nº 001/2026/SEPLAG e demais Órgãos |
| **Cargo** | Analista de Tecnologia da Informação |
| **Perfil** | Engenheiro da Computação - Sênior |
| **Local** | Secretaria de Estado de Planejamento e Gestão - Cuiabá/MT |

---

## Como Executar

### Requisitos

- Node.js 20+
- npm ou yarn

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador.

### Credenciais de Acesso

| Campo | Valor |
|-------|-------|
| **Usuário** | `admin` |
| **Senha** | `admin` |

---

## Deploy com Docker

### Build da Imagem

```bash
docker build -t pet-manager .
```

### Executar Container

```bash
docker run -p 3000:3000 pet-manager
```

### Usando Docker Compose

```bash
docker-compose up
```

Para executar em background:

```bash
docker-compose up -d
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `NEXT_PUBLIC_API_URL` | URL da API backend | `https://pet-manager-api.geia.vip` |

---

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

---

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa linter |
| `npm run test` | Executa testes |
| `npm run test:ui` | Testes com interface visual |
| `npm run test:coverage` | Testes com relatório de cobertura |

---

## Arquitetura

### Stack Tecnológica

- **Framework**: Next.js 16 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Componentes UI**: Radix UI + shadcn/ui
- **Formulários**: React Hook Form + Zod
- **Testes**: Vitest + Testing Library

### Estrutura de Diretórios

```
src/
├── app/                    # Rotas do Next.js App Router
│   ├── page.tsx           # Listagem de pets (/)
│   ├── pets/[id]/         # Detalhes do pet
│   └── tutores/           # Módulo de tutores
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Button, Input, etc)
│   └── ...               # Componentes de domínio
└── lib/                   # Utilitários e configurações
    └── api/              # Cliente HTTP para API
```

### Lazy Loading de Rotas

O Next.js App Router implementa **code-splitting automático** por rota. Cada `page.tsx` gera um chunk JavaScript separado carregado sob demanda:

- `/` → chunk da listagem de pets
- `/pets/[id]` → chunk dos detalhes do pet
- `/tutores` → chunk do módulo de tutores

### Gerenciamento de Estado

O edital menciona "BehaviorSubject" que é específico de **Angular/RxJS**. Como o projeto usa **React/Next.js**, o equivalente implementado é:

- **React Context + useState** = Gerenciamento de estado reativo
- **useCallback** = Otimização de callbacks
- **Provider pattern** = Propagação de estado

Isso é o padrão idiomático para React, equivalente ao BehaviorSubject em Angular.

**Arquivos relevantes:**

| Arquivo | Descrição |
|---------|-----------|
| `src/lib/auth/context.tsx` | AuthProvider com estado de autenticação |
| `src/lib/auth/login-popover-context.tsx` | Estado do modal de login |

### Padrão Facade

A camada de API segue o padrão Facade, encapsulando a complexidade das chamadas HTTP:

| Arquivo | Responsabilidade |
|---------|------------------|
| `src/lib/api/client.ts` | Cliente HTTP base com interceptors |
| `src/lib/api/pets.ts` | Operações CRUD de pets |
| `src/lib/api/tutores.ts` | Operações CRUD de tutores |
| `src/lib/api/auth.ts` | Autenticação e refresh token |

---

## Funcionalidades

### Requisitos Obrigatórios

- Listagem de pets com paginação
- Cadastro de novos pets
- Edição de pets existentes
- Exclusão de pets
- Associação pet-tutor

### Funcionalidades Bônus

- **Listagem de Tutores** - Página `/tutores` com busca por nome e paginação
- **Desvincular Pet-Tutor** - DELETE /v1/tutores/{id}/pets/{petId}
- **Autenticação** - Login com refresh token automático
- **Validação com Zod** - Schemas de validação em formulários
- **Máscaras de Entrada** - Telefone e CPF formatados automaticamente
- **Navegação no Header** - Botões de acesso rápido para Pets e Tutores
- **Loading States** - Indicadores de carregamento em todas as operações
- **Toast Notifications** - Feedback visual de sucesso/erro
- **Responsive Design** - Layout adaptativo para diferentes tamanhos de tela
- **Health Check** - Monitoramento de disponibilidade da API com indicador visual

---

## Health Check

O sistema possui monitoramento de saúde da API externa com endpoint dedicado e indicador visual no header.

### Endpoint

```
GET /api/health
```

**Resposta de exemplo:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "checks": {
    "api": {
      "healthy": true,
      "latencyMs": 150
    }
  }
}
```

| Status HTTP | Significado |
|-------------|-------------|
| 200 | API externa acessível |
| 503 | API externa indisponível |

### Indicador Visual

Um ícone circular no header exibe o status em tempo real:

| Cor | Status |
|-----|--------|
| Verde | API Online |
| Vermelho | API Offline |
| Cinza | Verificando... |

O status é atualizado automaticamente a cada **30 segundos**.
