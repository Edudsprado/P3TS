# P3TS — Pet Store

MVP demonstrativo de uma landing page para petshop, criado para apresentar identidade visual, responsividade e interações de interface no portfólio da **Studio Criando Web**.

A proposta é a mesma do [Elite](https://github.com/Edudsprado/Elite): uma peça de demonstração de design e desenvolvimento. O P3TS não representa uma loja em operação e não processa compras, pagamentos ou pedidos reais.

## Status e aprovação

**Em revisão. A integração ao portfólio ainda não está aprovada.**

O destino previsto é substituir o template atual de petshop na aba portfólio da Studio Criando Web, **somente após aprovação explícita do responsável**, depois dos ajustes desejados. A inclusão deste README e da auditoria não autoriza essa substituição, publicação ou alteração no site da agência.

## O que existe hoje

- Hero com identidade P3TS, imagens de pets e animações de entrada.
- Composições separadas para desktop, tablet e celular.
- Cabeçalho com navegação visual, busca, favoritos, carrinho e avatar.
- Carrinho em memória com um produto de exemplo, ajuste de quantidade e subtotal.
- Painéis de busca e favoritos e notificações de ações.
- Metadados básicos de título, descrição e compartilhamento.

### Limites da demonstração

| Recurso | Comportamento atual |
| --- | --- |
| Menu principal | Altera o item ativo e exibe um aviso; não abre páginas ou seções. |
| Explorar Produtos | Adiciona a casinha de gatos ao carrinho; ainda não explora um catálogo. |
| Busca | Recebe texto e oferece sugestões; não retorna resultados. |
| Favoritos | Mostra um produto fixo e um contador ilustrativo de 4 ou 5 itens. |
| Carrinho | Começa com uma unidade de exemplo; alterações são perdidas ao recarregar. |
| Finalizar Compra | Exibe uma mensagem de sucesso; nenhum pedido é enviado. |
| Minha Conta | Exibe um aviso; não existe autenticação. |

Não há backend de vendas, cadastro, pagamento, cálculo real de frete ou persistência. Os números de clientes, avaliações, preço e frete são conteúdo demonstrativo. Antes da integração, a interface deve informar claramente que é uma demonstração.

## Tecnologias

- React 19 e TypeScript.
- Vite 8.
- Tailwind CSS 4, via plugin do Vite.
- Lucide React para ícones.
- CSS para as animações.

O manifesto também inclui Gemini SDK, Express, dotenv e Motion, mas esses pacotes não são usados pelo código atual da landing.

## Executar localmente

O Vite instalado na auditoria exige Node.js `^20.19.0 || >=22.12.0`. O ambiente usado nos testes foi Node.js 24.15.0.

```bash
git clone https://github.com/Edudsprado/P3TS.git
cd P3TS
```

### Com o lockfile do projeto

O repositório versiona `bun.lock`. Com Bun instalado:

```bash
bun install --frozen-lockfile
bun run dev
```

O fluxo com Bun não foi executado na auditoria, pois Bun não estava disponível no ambiente. A aplicação de desenvolvimento usa a porta **3000**; abra `http://localhost:3000`.

### Limitação conhecida com npm

Na auditoria de 09/10/2026, `npm install --ignore-scripts --package-lock=false --no-audit --no-fund` falhou com `ERESOLVE`: o Vite 8.3.4 declara `esbuild ^0.27.0 || ^0.28.0` como peer opcional, enquanto o projeto declara `esbuild ^0.25.0`.

Para reproduzir apenas o diagnóstico realizado, foi possível instalar sem alterar o manifesto ou o lockfile:

```bash
npm install --legacy-peer-deps --ignore-scripts --package-lock=false --no-audit --no-fund
npm run dev
```

Esse contorno ignora a validação de peers e não resolve a incompatibilidade. Alinhar ou remover a dependência direta de esbuild, conforme necessário, e validar novamente a instalação normal antes de considerar o ambiente pronto.

### Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o Vite na porta 3000. O script escuta em todas as interfaces. |
| `npm run build` | Gera os arquivos estáticos em `dist/`. |
| `npm run preview` | Serve localmente o build já gerado. |
| `npm run lint` | Executa `tsc --noEmit`; verifica tipos, sem ESLint. |
| `npm run clean` | Remove `dist` e `server.js` com `rm`; no Windows, requer shell compatível, como Git Bash. |

Não há suíte automatizada de testes ou configuração de integração contínua no snapshot auditado.

## Configuração e imagens

Nenhuma variável de ambiente é consumida pela aplicação atual. Os campos `GEMINI_API_KEY` e `APP_URL` de `.env.example` vieram do ambiente de origem e não são necessários para abrir a landing. Não configure uma chave Gemini para esta demonstração.

As imagens estão referenciadas em `ASSETS`, no início de `src/App.tsx`, e são servidas por um domínio externo `figma.site`. As fontes Inter e DM Serif Display vêm do Google Fonts. A apresentação depende da disponibilidade desses serviços; confirmar direitos de uso e preparar assets sob controle do projeto antes da integração definitiva.

## Estrutura

```text
src/
  App.tsx       # Layouts, dados ilustrativos, estados e painéis
  index.css     # Tailwind, tipografia e animações
  main.tsx      # Inicialização do React
index.html      # Documento HTML e metadados
vite.config.ts  # Plugins e configuração de desenvolvimento
tsconfig.json   # Configuração do TypeScript
metadata.json   # Metadados do ambiente de origem
.env.example    # Exemplos de variáveis não utilizadas atualmente
bun.lock        # Lockfile versionado
AUDITORIA.md    # Achados, evidências e verificações
```

## Próximos passos

Consultar a [auditoria técnica e de experiência](AUDITORIA.md) antes de ajustar a interface. Prioridades: corrigir o destino do botão principal, tornar as simulações claras, melhorar navegação e acessibilidade dos painéis, revisar o cabeçalho no tablet e estabilizar a instalação.

Depois dos ajustes e da aprovação explícita, planejar a integração ao portfólio com card, captura da página e demonstração navegável, seguindo o padrão adotado no Elite. A integração permanece pendente.

## Licença e créditos

`src/App.tsx` contém um cabeçalho SPDX `Apache-2.0`, mas não existe arquivo `LICENSE` na raiz do snapshot auditado. Confirmar a licença do conjunto do projeto e as permissões das imagens antes de redistribuí-lo; o cabeçalho de um arquivo não estabelece a licença de todos os assets.
