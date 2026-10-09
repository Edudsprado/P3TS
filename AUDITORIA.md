# Auditoria do P3TS

**Data:** 09/10/2026. **Base:** commit `0f7f8a574c6c16f95bc11f4e361011fe8e32a18a`, branch `main`.

## Contexto e conclusão

O P3TS é um MVP demonstrativo para o portfólio da Studio Criando Web, com a mesma finalidade do Elite. O objetivo desta revisão é avaliar apresentação, navegação, acessibilidade e manutenção, sem exigir uma operação real de comércio eletrônico.

A composição visual funciona nas telas comuns de desktop e celular em pé, e as imagens carregaram nos testes. Há falhas confirmadas nas interações, nos painéis e em algumas proporções de tela. **Recomenda-se ajustar esses pontos antes da integração ao portfólio.**

A futura substituição do template de petshop depende de aprovação explícita do responsável. Esta auditoria e o README não autorizam nem executam a troca. Nenhum arquivo da Studio Criando Web foi alterado.

## Prioridades

P1: corrigir antes de apresentar a demonstração como pronta. P2: corrigir antes da integração definitiva. P3: melhoria de manutenção ou apresentação.

### 1. P1 — O botão principal adiciona um produto sem indicar compra

**Local:** `src/App.tsx:305`, `src/App.tsx:415` e `src/App.tsx:461`.

“Explorar Produtos” executa `handleAddToCart()`. No teste, abrir a página, clicar nesse botão e abrir o carrinho alterou a quantidade inicial de 1 para 2, com subtotal de R$ 499,80. O visitante não pediu para comprar esse item.

**Ajuste sugerido:** abrir um catálogo demonstrativo ou um painel de produto. Reservar a alteração do carrinho a um botão explícito de adicionar produto.

### 2. P1 — Simulação de compra apresentada como operação real

**Local:** `src/App.tsx:655` e `src/App.tsx:672`.

“Finalizar Compra” apenas fecha o carrinho e mostra “Pedido finalizado com sucesso!”, sem envio, registro ou pagamento. A página também apresenta frete nacional grátis, 98K+ pets e avaliação 4.6 sem identificar o conteúdo como ilustrativo.

**Ajuste sugerido:** incluir uma identificação discreta e persistente de demonstração e trocar o desfecho por “Simulação concluída; nenhum pedido foi enviado”. Não é necessário criar backend ou checkout real para o portfólio.

### 3. P1 — Instalação padrão bloqueada por conflito de dependências

**Local:** `package.json:20` e `package.json:30`.

A instalação com npm, sem ignorar a validação de peers, falhou com `ERESOLVE`. Na resolução feita em 09/10/2026, Vite 8.3.4 declarou peer opcional de esbuild `^0.27.0 || ^0.28.0`, enquanto a dependência direta do projeto é `^0.25.0`, resolvida como 0.25.12.

Instalar com `--legacy-peer-deps` permitiu executar build e verificação de tipos, mas não resolve o conflito. O repositório possui `bun.lock`; Bun não estava disponível e a instalação congelada não foi validada.

**Ajuste sugerido:** verificar se a dependência direta de esbuild é necessária, removê-la ou alinhá-la e atualizar o lockfile escolhido. Repetir uma instalação limpa sem contorno.

### 4. P1 — Painéis sem comportamento acessível de diálogo

**Local:** `src/App.tsx:531`, `src/App.tsx:586` e `src/App.tsx:687`.

Os painéis são `div`s sem semântica de diálogo, nome associado, controle de Escape ou contenção de foco. No teste do carrinho, `Escape` não o fechou e o foco permaneceu no botão “Ver carrinho de compras”, atrás da sobreposição. Os botões de fechar só contêm um ícone, sem nome acessível. O campo de busca usa placeholder sem um rótulo associado. As notificações não têm região de anúncio para leitores de tela.

**Ajuste sugerido:** usar um componente de diálogo acessível ou `<dialog>` com abertura modal, título associado, foco inicial, retorno de foco e fechamento por Escape. Nomear os controles e o campo, e anunciar notificações com `role="status"` ou `aria-live`.

### 5. P2 — Layout corta controles e encobre o título em telas baixas

**Local:** `src/App.tsx:104`, `src/App.tsx:114`, `src/App.tsx:225`, `src/App.tsx:252`, `src/App.tsx:354` e `index.html:16`.

Em **768 × 1024**, o avatar terminou na coordenada horizontal 778,5 px, ficando parcialmente fora da tela de 768 px. Menu e ações ocupam mais largura do que o cabeçalho comporta.

Em **844 × 390** e **1280 × 480**, a imagem central fica à frente do título, ocultando palavras. O layout usa altura de viewport, camadas absolutas e `overflow-hidden`, o que impede recuperar o conteúdo com rolagem. Em 390 × 844, há uma grande área vazia entre os textos e as imagens; trata-se de uma escolha visual a revisar, não de falha funcional.

**Ajuste sugerido:** antecipar a navegação compacta, permitir reorganização em alturas baixas e definir altura mínima de conteúdo com rolagem quando necessária. Verificar também zoom e áreas úteis de previews incorporadas ao portfólio.

### 6. P2 — Navegação e busca não levam a conteúdo

**Local:** `src/App.tsx:57`, `src/App.tsx:147`, `src/App.tsx:170` e `src/App.tsx:552`.

O menu altera o item ativo e mostra uma notificação; os `href`s definidos em `navLinks` não são usados e não existem seções com os IDs correspondentes. “Loja” manteve a URL e o conteúdo. Digitar “ração” e pressionar Enter não retornou resultados.

A navegação desaparece abaixo de 768 px sem menu alternativo; a busca desaparece abaixo de 640 px. Isso reduz o conteúdo e as interações demonstráveis no celular.

**Ajuste sugerido:** implementar destinos demonstrativos coerentes ou simplificar o menu ao que existe. Oferecer navegação e busca acessíveis no celular, caso esses recursos façam parte do escopo aprovado.

### 7. P2 — Favoritos e estado do carrinho não correspondem a uma lista real

**Local:** `src/App.tsx:39`, `src/App.tsx:47`, `src/App.tsx:95` e `src/App.tsx:710`.

Favoritos mostra 4 itens, mas renderiza um único produto. “Alternar Status da Lista” muda o contador para 5, mantendo a mesma lista. Carrinho e favoritos são reiniciados ao recarregar a página. O carrinho mantém um contador separado da soma das quantidades, criando duas fontes de estado a sincronizar.

**Ajuste sugerido:** derivar contadores das listas e oferecer ações de favoritar/remover claras. Se o estado inicial preenchido for mantido, identificá-lo como exemplo. Persistência é opcional para este MVP.

### 8. P2 — Preferência de movimento reduzido não é respeitada

**Local:** `src/index.css:122` até o final do arquivo.

Não existe regra para `prefers-reduced-motion`. Com a preferência em `reduce`, a animação do cabeçalho continuou como `fadeIn`.

**Ajuste sugerido:** desativar ou simplificar animações para essa preferência, garantindo que o conteúdo continue visível, inclusive os elementos que começam com `opacity: 0`.

### 9. P3 — Dependência externa de imagens e créditos indefinidos

**Local:** `src/App.tsx:21` e `index.html:12`.

As cinco imagens vêm de um domínio `figma.site`; fontes vêm do Google Fonts. Todos os assets solicitados carregaram durante o teste, mas sua disponibilidade futura não é controlada pelo repositório. Não há documentação de origem/licença das imagens nem arquivo `LICENSE`; há apenas um cabeçalho Apache-2.0 em `App.tsx`.

**Ajuste sugerido:** confirmar direitos e créditos e hospedar os assets permitidos em infraestrutura controlada pelo projeto. Corrigir textos alternativos: a imagem central é um cachorro, mas no desktop tem descrição de gatinho; a imagem à direita é um gato, mas tem descrição de cachorro.

### 10. P3 — Resíduos de template, manutenção e metadados

**Local:** `metadata.json`, `.env.example`, `package.json`, `src/App.tsx` e `index.html`.

O nome interno ainda é `react-example` e o metadata usa CozyPaws e declara capacidade Gemini de servidor. O código atual não usa Gemini, Express, dotenv ou Motion; não há backend implementado. O componente reúne os três layouts e todos os painéis em aproximadamente 747 linhas. Não há testes ou CI no snapshot de origem; `lint` só verifica tipos.

O título “Tudo o que Seus P3TS Amam” merece revisão editorial. A página não tem landmark `<main>`; os metadados de compartilhamento não têm `og:image` ou URL canônica. Avisos de toast consecutivos também podem ser apagados por temporizadores de mensagens anteriores.

**Ajuste sugerido:** remover configuração não utilizada após verificar o ambiente de origem, separar componentes, revisar os textos e acrescentar os metadados necessários quando a URL da demo for definida. Evitar indexação da demo como loja real ao integrá-la ao site principal.

## Verificações realizadas

| Verificação | Resultado |
| --- | --- |
| Leitura de todos os arquivos rastreados | Concluída; não há README, LICENSE, testes ou CI no snapshot de origem. |
| Instalação com validação de peers | Falhou com `ERESOLVE`. |
| Instalação de diagnóstico | Passou com `--legacy-peer-deps --ignore-scripts --package-lock=false --no-audit --no-fund`; manifesto e `bun.lock` preservados. |
| Build de produção | Passou com `node node_modules/vite/bin/vite.js build`, após o contorno. |
| TypeScript | Passou com `node node_modules/typescript/bin/tsc --noEmit`. |
| Dependências conhecidas pelo npm audit | 0 vulnerabilidades reportadas na resolução npm isolada gerada em 09/10/2026; não é uma validação exata de `bun.lock` nem garantia de ausência de vulnerabilidades. |
| Renderização do build no Chrome | Verificada em nove dimensões. |
| Assets externos | Imagens e fontes solicitadas carregaram; sem requisições falhas na sessão. |
| Exceções JavaScript | Nenhuma capturada durante os fluxos testados. |
| Navegação, CTA, carrinho, favoritos, busca e recarga | Testados; limitações descritas acima. |
| Escape, semântica e foco do carrinho | Falhas confirmadas. |
| Preferência de movimento reduzido | Não respeitada. |

Dimensões usadas: 1440 × 900, 1366 × 768, 1024 × 768, 768 × 1024, 390 × 844, 375 × 667, 320 × 568, 844 × 390 e 1280 × 480. As capturas foram feitas após o término das animações de entrada.

O build gerou aproximadamente 247,65 kB de JavaScript (75,18 kB gzip) e 29,77 kB de CSS (6,39 kB gzip), sem incluir imagens e fontes externas. Esses números não equivalem a uma medição de Core Web Vitals.

## Limites e sequência de aprovação

Esta revisão cobre o código e os fluxos citados em um navegador desktop com tamanhos de viewport simulados. Não foi feita validação em dispositivos físicos, Safari, Firefox, leitor de tela, teste de carga, auditoria jurídica de assets ou pentest. Não foram calculadas notas Lighthouse ou certificada conformidade WCAG.

1. Definir os ajustes visuais e de conteúdo desejados.
2. Corrigir os achados prioritários e repetir os fluxos afetados.
3. Apresentar a demonstração revisada e obter aprovação explícita.
4. Somente então substituir o template de petshop no portfólio, seguindo o padrão do Elite.

O escopo entregue nesta etapa é exclusivamente documentação. Layout, funcionalidades e portfólio permanecem na versão auditada.
