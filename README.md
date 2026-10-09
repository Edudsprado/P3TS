# P3TS — Pet Store

Landing page demonstrativa de petshop para o portfólio da **Studio Criando Web**, seguindo a proposta do [Elite](https://github.com/Edudsprado/Elite): apresentar identidade visual, responsividade e interações de interface. Não representa uma loja em operação.

**Demonstração publicada:** [p3ts-studiocriandoweb.pages.dev](https://p3ts-studiocriandoweb.pages.dev/).

## Status

Publicação e substituição do template anterior de petshop autorizadas pelo responsável em 09/10/2026. A integração ao portfólio usa capturas da própria página e abre a demonstração em uma nova aba, como no Elite.

A [auditoria](AUDITORIA.md) registra o snapshot original, anterior às alterações posteriores no Google AI Studio. Seus achados não descrevem necessariamente o estado atual.

## Conteúdo e interações

- Hero responsiva com três pets e animações de entrada.
- Navegação por âncoras: início, quem somos, serviços, loja, depoimentos e FAQ.
- Catálogo de seis produtos ilustrativos com filtros por categoria.
- Carrinho em memória, controle de quantidade e subtotal.
- Formulário de agendamento e inscrição na newsletter demonstrativos.
- FAQ expansível, painéis de busca e favoritos.

### Limites da demonstração

| Recurso | Comportamento |
| --- | --- |
| Explorar Produtos | Rola até o catálogo na seção `#loja`. |
| Busca | Recebe texto e apresenta sugestões/avisos; não consulta um catálogo real. |
| Favoritos | Usa estado ilustrativo e um produto fixo. |
| Carrinho | Começa com um produto de exemplo e perde as alterações ao recarregar. |
| Compra, agendamento e newsletter | Exibem mensagens simuladas; não enviam pedidos, reservas ou e-mails. |
| Minha Conta | Exibe um aviso; não existe autenticação. |

Não há backend, pagamento, cálculo real de frete ou persistência. Preços, avaliações, depoimentos, contatos e números de clientes são ilustrativos. A interface ainda usa mensagens de sucesso semelhantes às de uma loja real; uma operação comercial exige integrações e revisão desse conteúdo.

## Tecnologias

React 19, TypeScript, Vite 8, Tailwind CSS 4 e Lucide React. O manifesto inclui Gemini SDK, Express, dotenv e Motion, sem uso pela landing atual.

## Executar localmente

Use Node.js `^20.19.0 || >=22.12.0`; a validação local foi feita com Node.js 24.15.0.

```bash
git clone https://github.com/Edudsprado/P3TS.git
cd P3TS
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

Abra `http://localhost:3000`. O repositório contém `bun.lock`, mas o fluxo com Bun não foi validado nesta publicação.

O parâmetro `--legacy-peer-deps` contorna um conflito existente: Vite 8.3.4 declara `esbuild ^0.27.0 || ^0.28.0` como peer opcional, enquanto o projeto declara `esbuild ^0.25.0`. O contorno permitiu compilar; alinhar essas dependências continua sendo uma melhoria pendente.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento na porta 3000, escutando em todas as interfaces. |
| `npm run build` | Gera os arquivos estáticos em `dist/`. |
| `npm run preview` | Pré-visualiza o build. |
| `npm run lint` | Verifica tipos com `tsc --noEmit`; não executa ESLint. |
| `npm run clean` | Remove `dist` e `server.js`; requer shell compatível com `rm`. |

## Cloudflare Pages

O projeto `p3ts-studiocriandoweb` está conectado a este repositório, com publicação automática a partir da branch `main`.

| Configuração | Valor |
| --- | --- |
| Comando de build | `npm install --legacy-peer-deps --no-audit --no-fund && npm run build` |
| Diretório de saída | `dist` |
| Diretório raiz | Raiz do repositório |
| Variável de build | `SKIP_DEPENDENCY_INSTALL=true` |

A variável faz o Cloudflare usar a instalação explícita do comando acima. Nenhuma chave Gemini ou outra credencial é necessária para a demonstração.

## Estrutura e assets

```text
src/App.tsx    # Seções, catálogo ilustrativo, estados e painéis
src/index.css  # Tailwind, fontes e animações
src/main.tsx   # Inicialização do React
index.html     # Documento HTML e metadados
vite.config.ts # Plugins e desenvolvimento
AUDITORIA.md   # Auditoria histórica do snapshot inicial
```

As imagens vêm de `figma.site` e Unsplash; as fontes Inter e DM Serif Display, do Google Fonts. A apresentação depende desses serviços externos. Os campos de `.env.example` não são consumidos pela aplicação atual.

## Validação e melhorias pendentes

Na publicação de 09/10/2026, build e verificação de tipos passaram. A navegação ao catálogo, filtros, FAQ, carregamento de imagens e layouts de desktop, tablet e celular foram conferidos. Não existe suíte de testes versionada.

Melhorias pendentes incluem estabilizar as dependências, explicitar as simulações dentro da interface, revisar acessibilidade dos painéis e hospedar os assets sob controle do projeto.

## Licença e créditos

`src/App.tsx` contém o cabeçalho SPDX `Apache-2.0`, mas não há arquivo `LICENSE` na raiz. Confirmar a licença do conjunto e as permissões de uso das imagens antes de redistribuir; o cabeçalho de um arquivo não estabelece a licença dos assets.
