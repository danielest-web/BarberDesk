# BarberDesk — Agenda Geral (MVP)

## Resumo

Esta pasta contém a implementação da tela "Agenda Geral" para um sistema de
gestão de barbearias. É um MVP focado apenas na agenda (sem backend, sem
login). Os dados são mantidos em memória e persistidos no `localStorage`.

## Tecnologias

- React
- TypeScript (arquivos .tsx/.ts para componentes e tipos)
- Vite (configuração do projeto)
- Tailwind CSS para estilização (classes já aplicadas nos componentes)

## O que está implementado

- Visualização da agenda em grade: linhas = horários (30 min), colunas = barbeiros.
- Botão "Novo Agendamento" que abre modal para criar agendamentos.
- Serviços pré-definidos e criação de novos serviços no modal.
- Duração variável dos serviços (30/60/90 min etc.) que ocupam múltiplos blocos.
- Bloqueio de conflitos de horários por barbeiro.
- Persistência simples via `localStorage` (chave: `barberdesk-data-v1`).

## Arquivos principais

- `src/pages/Agenda/Agenda.tsx` — componente principal que gerencia estado,
  persiste em `localStorage` e verifica conflitos.
- `src/pages/Agenda/components/Header.tsx` — cabeçalho com título, data e botão.
- `src/pages/Agenda/components/ScheduleGrid.tsx` — grade de horários e renderização
  de blocos de agendamento.
- `src/pages/Agenda/components/NewAppointmentModal.tsx` — modal para criar
  agendamentos e criar serviços na hora.
- `src/pages/Agenda/data.ts` — dados iniciais (barbeiros, horários, serviços).
- `src/pages/Agenda/types.ts` — tipos TypeScript (`Barber`, `Service`, `Appointment`).

## Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. (Opcional) Instale Tailwind e inicialize o config se ainda não tiver:

```bash
npm install -D tailwindcss postcss autoprefixer typescript
npx tailwindcss init -p
```

3. Atualize `tailwind.config.cjs` para incluir o conteúdo do projeto:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

4. No início de `src/index.css`, insira as diretivas do Tailwind (se desejar):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Rode o projeto em modo desenvolvimento:

```bash
npm run dev
```

## Como os dados funcionam

- Os serviços e agendamentos são salvos no `localStorage` com a chave
  `barberdesk-data-v1` para persistência entre reloads.
- O formato de um `Appointment` é algo como:

```json
{
  "id": 1,
  "barberId": 1,
  "clientName": "Ana",
  "phone": "61999999999",
  "serviceName": "Corte + Barba",
  "startTime": "08:30",
  "duration": 60,
  "price": 55,
  "notes": "",
  "date": "2026-05-31"
}
```

## Próximos passos sugeridos

- Polir aparência e responsividade (ajustes Tailwind).
- Adicionar confirmação antes de salvar/excluir agendamentos.
- Implementar edição/exclusão de agendamentos.
- Adicionar testes unitários e E2E.
- Conectar a um backend para persistência real.

## Contato

Este repositório foi preparado como um MVP para a tela de Agenda Geral.
Se quiser, eu posso:

- Rodar a instalação das dependências e configurar Tailwind automaticamente.
- Adicionar edição/exclusão de agendamentos.
- Adicionar visual mais apurado e legendas de status.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
