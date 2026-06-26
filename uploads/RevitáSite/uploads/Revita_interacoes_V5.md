**REVITÁ ODONTOLOGIA INTEGRADA**  
 **Interações, Animações e Efeitos** 

**1\. Filosofia de Animação:** O objetivo é criar uma experiência imersiva onde o scroll revela o conteúdo de forma cinematográfica — referência direta ao estilo Apple. Cada elemento entra com propósito, não apenas aparece. A animação comunica qualidade antes de qualquer texto ser lido. 

**PRINCÍPIOS QUE DEVEM GUIAR TODAS AS ANIMAÇÕES** 

— Timing preciso: respostas imediatas ao usuário usam transições rápidas (em torno de 0.3s). Revelações dramáticas de seções usam transições mais lentas (0.8s a 1.2s).   
— Easing natural: nunca usar curvas lineares ou padrão. Sempre curvas cúbicas que imitam física real   
— elementos aceleram ao sair e desaceleram ao chegar.   
— Hierarquia de movimento: elementos mais importantes entram primeiro ou com mais destaque visual. Elementos secundários seguem com pequeno delay escalonado.   
— Performance primeiro: usar apenas transform e opacity nas animações  
 — essas propriedades são aceleradas pela GPU e não causam recálculo de layout no browser.   
— Acessibilidade: respeitar a preferência do sistema operacional prefers-reduced-motion   
— quando ativa, todas as animações devem ser instantâneas ou desativadas 

**2\. Cursor Customizado**

**Aplicação:** somente desktop. No mobile não existe cursor, então esse efeito não deve ser implementado em telas touch.   
   
**O QUE É**   
Um ponto pequeno que substitui o cursor padrão do sistema operacional e segue o mouse com um leve delay natural — como se tivesse inércia. É um detalhe característico de sites premium de alto padrão. 

**COMPORTAMENTO DETALHADO**   
— O cursor nativo do sistema é escondido em toda a página.   
— Um elemento HTML pequeno e circular (aproximadamente 8x8px) é posicionado na tela e segue o mouse continuamente usando requestAnimationFrame.   
— O movimento não é instantâneo — o ponto persegue o mouse com um fator de suavização (cerca de 12% da distância por frame), criando um delay orgânico e elegante.   
— Ao passar sobre qualquer elemento clicável   
— links, botões, cards — o ponto expande para aproximadamente 40x40px, fica transparente e mostra apenas a borda. Esse estado comunica ao usuário que o elemento é interativo.   
— A transição entre o estado pequeno e o estado expandido é suave, usando transition de 0.3s.   
— Ao clicar, o ponto pode fazer uma leve compressão (scale para 0.8) e voltar instantaneamente — feedback visual de clique   
**3\. Nav — Comportamento ao Scroll** 

A navegação é fixa no topo da página e muda de aparência conforme o usuário rola. 

**TRÊS ESTADOS DA NAV**   
— **Estado 1:** Topo da página (antes de 60px de scroll): · Fundo completamente transparente.   
· Sem borda inferior.   
· Sem blur.   
· A nav flutua sobre o Hero — o conteúdo do Hero aparece por baixo dela. 

— **Estado 2:** Após 60px de scroll:   
· Fundo sólido semitransparente com blur do conteúdo por baixo (backdrop-filter blur).   
· Borda inferior sutil aparece.   
· Transição suave entre os dois estados — não deve ser abrupta. 

— **Estado 3:** Rolando para baixo vs rolando para cima (opcional, estilo Apple):   
\-  Ao rolar para baixo além de 200px: a nav some deslizando para cima, liberando espaço de leitura.  
\- Ao rolar para cima: a nav reaparece deslizando de volta, sempre acessível quando o usuário procura.   
\- Transição de entrada e saída é suave — não pisca. 

**HOVER NOS LINKS DA NAV**   
— Cor do texto muda para a cor de destaque do projeto.   
— Um underline cresce da esquerda para a direita por baixo do texto  
 — começa com largura zero e vai até 100% em aproximadamente 0.3s 

**4\. Hero — Parallax e Marquee** 

**4.1 Parallax na foto ou vídeo de fundo** 

O conteúdo de fundo do Hero — foto ou vídeo — se move mais devagar do que o scroll da página, criando uma sensação de profundidade e imersão. 

COMO FUNCIONA   
— O elemento de fundo começa levemente maior do que a área visível (escala de 1.15) para garantir que não apareçam bordas durante o movimento.   
— Conforme o usuário rola para baixo, o fundo se move para cima em uma velocidade menor   
— cerca de 30% da velocidade do scroll.   
— O conteúdo sobreposto — título, subtítulo, botão — não sofre parallax, fica estático em relação ao scroll.   
— No mobile esse efeito deve ser desativado completamente — substituir por imagem estática com leve escala, sem movimento. 

**4.2 Marquee sobreposta na parte inferior do Hero** 

Uma faixa de texto animado posicionada sobre o Hero, na sua borda inferior. Fica visível enquanto o Hero está na tela. 

**POSICIONAMENTO**   
— A marquee é posicionada de forma absoluta no fundo do Hero — não empurra o conteúdo abaixo.   
— Tem fundo completamente transparente — o Hero aparece por baixo.   
— Uma linha fina de separação na parte superior da faixa — sutilmente visível sobre o fundo do Hero. 

**CONTEÚDO DO TEXTO**   
— Texto: Cuidado · Atenção · Escuta · Atendimento humanizado \[repete continuamente\]   
— Cor do texto: branco com opacidade reduzida (aproximadamente 60%) — leve e elegante sobre o fundo escuro do Hero.   
— Letra com espaçamento generoso entre caracteres (letter-spacing largo). 

**ANIMAÇÃO**   
— O texto rola da direita para a esquerda de forma contínua e infinita — sem pausa, sem corte visível.   
— O conteúdo é duplicado no HTML para que o loop seja perfeito — quando o primeiro bloco termina, o segundo começa exatamente onde o primeiro estava, sem salto.   
— Velocidade lenta e suave — o usuário consegue ler cada palavra enquanto passa.  
 — Ao passar o mouse sobre a faixa: a animação pausa. Detalhe premium.   
— No mobile: a velocidade pode ser ainda mais lenta pois a tela é menor. 

**5\. Scroll-Driven Animations** 

— **Entrada de Elementos**   
Todos os elementos de conteúdo entram animados quando o usuário chega até eles ao rolar a página. Nada aparece estático de imediato — cada elemento se revela com movimento. 

**MECANISMO**   
— Usar IntersectionObserver para detectar quando cada elemento entra no campo de visão do usuário.   
— Antes de entrar: o elemento está invisível e deslocado.   
— Ao entrar: o elemento transiciona para sua posição e opacidade finais.  
 — Uma vez que entrou, a animação não se repete — o elemento permanece visível.   
— Quando múltiplos elementos entram ao mesmo tempo (como cards lado a lado), cada um recebe um pequeno delay escalonado — o primeiro entra, depois o segundo, depois o terceiro — criando um efeito cascata elegante. 

**TIPOS DE ENTRADA POR TIPO DE ELEMENTO**   
— Fade up — textos, subtítulos, botões, parágrafos: · Começa deslocado para baixo (aproximadamente 32px) e com opacidade zero.   
· Anima para a posição original com opacidade total.   
— Fade left — títulos principais de seção: · Começa deslocado para a direita (aproximadamente 48px) e invisível. · Desliza para a posição correta enquanto aparece. · Transmite movimento direcional — como se o título chegasse de fora da tela.   
— Fade right — fotos, imagens e elementos visuais: · Começa deslocado para a esquerda e invisível. · Desliza para a posição correta enquanto aparece. · Cria assimetria de movimento com o título — título vem da direita, foto vem da esquerda.   
— Scale up — cards e elementos de destaque: · Começa levemente menor do que o tamanho final (escala 0.92) e invisível. · Cresce até o tamanho normal enquanto aparece. · Transmite sensação de surgir do nada — mais impactante do que simples fade. 

**APLICAÇÃO POR SEÇÃO**   
— Hero — título: fade left · subtítulo: fade left com delay de 200ms · botão: fade up com delay de 400ms   
— Tratamentos (home) — eyebrow: fade up · título: fade left · cards: scale up com delay escalonado de 0ms, 120ms e 240ms   
— Sobre — foto: fade right · bloco de texto: fade left · cada credencial: fade up escalonado. Cards “o que nos guia”: cada card: fade up com delay escalonado  
— Tratamentos (página) — foto e texto alternam direção: par foto-direita/texto-esquerda, ímpar foto-esquerda/texto-direita   
— A clínica — foto: fade right · bloco de texto: fade left · cada credencial: fade up escalonado.   
— Footer — elementos: fade up geral suave 

6\. Cards de Tratamento — Hover com Overlay   
Nos cards que contêm foto, ao passar o mouse acontece um efeito em duas camadas simultâneas. 

**O QUE ACONTECE NA FOTO**   
— A foto faz um zoom in suave — escala de 1.0 vai para aproximadamente 1.08.   
— O zoom acontece apenas na foto, não no card inteiro — o card não muda de tamanho.   
— Para isso funcionar, a foto precisa estar dentro de um container com overflow hidden — o zoom fica contido dentro dos limites do card.   
— A transição do zoom é lenta e suave (aproximadamente 0.7s) para não parecer brusca. 

**O QUE ACONTECE COM O OVERLAY**   
— Um overlay semitransparente escuro aparece sobre a foto com fade in suave.   
— Junto com o overlay, um texto curto de descrição do tratamento sobe de baixo para cima — começa deslocado 16px abaixo e invisível, anima para a posição final.   
— Esse texto aparece com um pequeno delay em relação ao overlay — o overlay chega primeiro, o texto segue logo depois. 

**O QUE ACONTECE NO CORPO DO CARD (ABAIXO DA FOTO)**   
— O fundo do corpo do card muda para a cor escura principal do projeto.   
— Todos os textos — eyebrow, título, link 'Saiba mais' — mudam para branco.  
— O card inteiro sobe levemente (translateY de \-6px) e a sombra aumenta de intensidade — dá sensação de elevação.   
— Todas essas mudanças acontecem simultaneamente com o efeito na foto.   
Mobile: no mobile não existe hover. O tap no card navega diretamente para a página do tratamento 

**7\. Hover Effects**   
— Todos os Elementos Todos os hovers usam transição suave — nenhuma mudança deve ser abrupta. Velocidade padrão de 0.35s com curva de easing natural. 

**Nav — Links da nav:**   
· Cor do texto muda para a cor de destaque do projeto.   
· Um underline cresce da esquerda para a direita por baixo do link. 

**— Botão Agendar Consulta na nav:**   
· Escala leve para cima (scale 1.04).   
· Cor de fundo muda para a cor de destaque.   
· Sobe levemente (translateY \-1px). 

**Botões**   
**— Botão primário preenchido:**   
· Escala leve (scale 1.04).   
· Sobe levemente (translateY \-2px).   
· Cor de fundo muda para um tom mais escuro ou para a cor de destaque.   
· Sombra aumenta de intensidade — reforça a sensação de elevação. 

**— Botão ghost (apenas borda, sem preenchimento):**   
· Fundo levemente visível aparece — fundo branco ou escuro com baixa opacidade (10%).   
· A borda aumenta de opacidade — fica mais visível.   
· Leve escala (scale 1.02). Links e textos — Link 'Saiba mais fi':   
· Cor muda para a cor de destaque ou escurece.   
· A seta se move para a direita (translateX 6px).   
· Um underline aparece por baixo do texto. 

**— Links do footer:**   
· Cor do texto muda para um tom mais claro e visível.   
· Leve deslocamento para a direita (translateX 3px). Inputs do formulário (focus) 

**— Ao receber foco (click ou tab):**   
· Borda muda para a cor de destaque.   
· Sombra suave aparece ao redor do campo.   
· O label interno sobe — floating label: sai de dentro do campo e fica pequeno acima dele.   
· Sem outline padrão do browser — substituído pelo estilo acima. 

**Quiz** — respostas   
**Hover sobre uma opção de resposta:**   
· Fundo muda para a cor escura principal.   
· Texto muda para branco. · Borda muda para a cor de destaque.   
· Leve escala (scale 1.02). 

**— Opção selecionada (após clicar):**   
· Mesmo visual do hover, mas persiste — o estado fica ativo até o usuário voltar.   
· Leve efeito de bounce no clique (scale vai para 0.98 e volta para 1.02). 

**Calendário**   
— Hover sobre um dia disponível:   
· Fundo suave aparece — tom claro da paleta.   
· O dia fica circular (border-radius 50%).   
· Leve escala (scale 1.1). 

**— Dia selecionado:**   
· Fundo na cor de destaque do projeto.   
· Texto branco.   
· Circular (border-radius 50%).   
· Estado permanece visível enquanto está selecionado. 

**Ícone hambúrguer (mobile)**   
— Ao tocar no ícone:   
· As 3 linhas animam para formar um X — a linha do meio desaparece, as outras duas rotacionam.   
· O menu overlay desce de cima para baixo com fade in.   
· Ao tocar no X: animação inversa — X volta para 3 linhas, menu sobe e some 

**8\. Marquee — Animação Contínua**   
A marquee aparece em duas posições no site: sobreposta na parte inferior do Hero (já descrita na seção 4\) e possivelmente em outras seções de transição se o design indicar. 

**FUNCIONAMENTO TÉCNICO RESUMIDO**   
— O conteúdo de texto é duplicado no HTML   
— dois blocos idênticos lado a lado.   
— O bloco inteiro se move continuamente da direita para a esquerda.   
— Quando o primeiro bloco sai completamente pela esquerda, o segundo já ocupou seu lugar — o loop é imperceptível.   
— A velocidade é lenta o suficiente para o usuário conseguir ler cada frase.   
— Ao passar o mouse: pausa. Ao tirar o mouse: retoma de onde parou.

**9\. Transições de Página**   
Ao navegar entre páginas do site, a transição não deve ser abrupta — a página não deve simplesmente cortar para a próxima. 

**COMPORTAMENTO**   
— Ao clicar em um link interno: a página atual desaparece com fade out suave (opacidade vai de 1 para 0 em aproximadamente 0.3s).   
— A nova página carrega e aparece com fade in suave \+ leve movimento de baixo para cima (translateY de 16px para 0, em 0.6s).   
— Links para âncoras dentro da mesma página (\#) não ativam essa transição — apenas rolam suavemente até o destino.   
— Links externos também não ativam — abrem normalmente 

**10\. Quiz — Transições Entre Perguntas**   
O quiz funciona em página única — não recarrega entre perguntas. O JavaScript controla qual pergunta está visível. 

**AO CLICAR EM UMA RESPOSTA**   
— AVANÇAR   
— A pergunta atual desliza para a esquerda e some (translateX de 0 para \-32px, opacidade de 1 para 0).   
— A próxima pergunta já está posicionada à direita (translateX \+32px, opacidade 0\) e desliza para o centro enquanto aparece.   
— As duas animações acontecem simultaneamente — a saída da atual e a entrada da próxima. — Duração de aproximadamente 0.35s — rápido o suficiente para parecer ágil, lento o suficiente para ser percebido.   
— Após o clique, a resposta selecionada fica visualmente marcada por um breve momento antes de avançar — confirma visualmente a escolha do usuário. 

**AO CLICAR EM VOLTAR**   
— Direção inversa: a pergunta atual sai pela direita, a anterior entra pela esquerda.   
— A resposta da pergunta anterior é desmarcada. BARRA DE PROGRESSO   
— Uma barra fina no topo do quiz indica em qual pergunta o usuário está.   
— Ao avançar: a barra cresce suavemente até a nova porcentagem (transição de 0.5s).   
— Ao voltar: a barra encolhe suavemente. 

**OPÇÕES DE RESPOSTA**   
— FEEDBACK TÁTIL   
— Ao clicar: a opção faz uma leve compressão (scale 0.98) e volta com leve bounce (scale 1.02) — sensação de pressionar um botão físico.  
 — A opção selecionada muda visualmente para o estado ativo (fundo escuro, texto branco) e mantém esse estado até a pergunta mudar. 

**11\. Adaptações Mobile**   
No mobile a experiência é tátil — não existe mouse, não existe hover. Todas as interações são redesenhadas para touch. 

**DESATIVAR COMPLETAMENTE NO MOBILE**   
— Cursor customizado — não existe em dispositivos touch.   
— Parallax nas imagens de seção — causa problemas de performance e aparência em mobile.   
— Parallax do Hero — substituir por imagem ou vídeo estático com leve escala.   
— Hover effects em cards — não existe hover em touch. O tap no card navega diretamente. 

**MANTER NO MOBILE COM AJUSTES**   
— Scroll animations — manter, mas com threshold de detecção menor (0.08 em vez de 0.12) pois telas são menores e elementos entram mais rapidamente no viewport.   
— Transições de página — manter, melhoram muito a percepção de qualidade em mobile.   
— Marquee — manter com velocidade mais lenta ainda, pois a tela é estreita e o texto precisa de mais tempo para ser lido.   
— Nav scroll behavior — manter: esconde ao rolar para baixo, reaparece ao rolar para cima.   
— Transições do quiz — manter exatamente iguais ao desktop.   
— Barra de progresso do quiz — manter. 

**COMPORTAMENTOS ESPECÍFICOS DO MOBILE**   
— Menu hambúrguer:   
· Tap nas 3 linhas abre overlay com menu em tela cheia ou parcial, deslizando de cima para baixo.   
· O ícone anima de 3 linhas para X enquanto o menu abre.   
· Tap no X fecha o menu com animação inversa.   
· Tap fora do menu também fecha. 

**— Cards de tratamento:**   
· Tap diretamente navega para a página do tratamento — sem hover intermediário.   
· Feedback visual ao tap: opacidade reduz brevemente (0.85 por 150ms) e volta. 

**— Botões:**   
· Ao pressionar: leve compressão visual (opacidade 0.8 por 150ms).   
· Ao soltar: volta ao estado normal. 

**— Quiz:**   
· Tap em uma resposta: leve compressão (scale 0.96 por 150ms), depois avança para a próxima pergunta.   
· As transições de slide entre perguntas são idênticas ao desktop. 

**ACESSIBILIDADE**   
— Quando o sistema operacional do usuário tem a preferência de movimento reduzido ativada (prefers-reduced-motion), todas as animações devem ser instantâneas ou completamente desativadas — sem fade, sem slide, sem zoom. A funcionalidade é preservada, apenas o movimento é removido. 