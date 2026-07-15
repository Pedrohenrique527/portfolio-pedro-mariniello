# Portfólio — Pedro Mariniello

Portfólio profissional de Pedro Mariniello, Analista de Sistemas especializado em planejamento, processos, automação, Excel e transformação digital.

O site apresenta estudos de caso de sistemas financeiro, RH e cotação, além de uma área de recomendações profissionais com moderação administrativa.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Firebase Admin SDK
- Vercel

## Recomendações profissionais

Visitantes podem enviar recomendações pelo portfólio. Cada envio é gravado no Firestore com status `pendente` e não aparece publicamente até ser aprovado.

O painel `/admin/recommendations` permite que apenas a conta administrativa configurada aprove, rejeite, edite ou exclua os depoimentos.

## Desenvolvimento local

Requisitos: Node.js 20.9 ou superior e pnpm.

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3000`.

## Configuração

Copie `.env.example` para `.env.local` e preencha as credenciais administrativas. Nunca publique a chave privada do Firebase nem arquivos `firebase-adminsdk-*.json`.

As configurações públicas do aplicativo Firebase Web podem usar o prefixo `NEXT_PUBLIC_`. As credenciais do Firebase Admin devem existir somente no ambiente seguro do servidor ou nas variáveis da Vercel.

## Validação

```bash
pnpm build
```

## Publicação

O projeto está preparado para implantação na Vercel. Cadastre as variáveis de ambiente do Firebase no projeto da Vercel antes do primeiro deploy.
