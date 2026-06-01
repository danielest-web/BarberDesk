# BarberDesk

MVP de agenda para barbearia feito com React, TypeScript, Vite e Tailwind CSS.
Os dados ficam no `localStorage`, entao o app funciona sem backend.

## Funcionalidades

- Agenda por dia com colunas por barbeiro
- Cadastro de clientes, barbeiros e servicos
- Criacao, edicao e exclusao de registros via modal
- Persistencia local no navegador
- Layout responsivo com Tailwind

## Estrutura atual

- `src/main.tsx`: ponto de entrada da aplicacao
- `src/App.tsx`: interface principal e regras do app
- `src/index.css`: estilos globais e import do Tailwind
- `src/vite-env.d.ts`: tipos do Vite para TypeScript

## Como rodar

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera a build de producao
- `npm run lint`: executa o ESLint

## Observacoes

- Os dados sao salvos separadamente nas chaves `clients`, `barbers`, `services` e `appointments`.
- O build de producao sai em `dist/`, mas essa pasta e ignorada pelo Git.
