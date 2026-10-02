# Test Pattern Generator

Gerador de test patterns para LED walls e ecrãs wide. Corre no browser, sem instalação, e exporta PNG à resolução real (pixel a pixel).

**Usar online:** https://mikefkfmiguel-create.github.io/Testpatern-generador/

## Funcionalidades

- Resoluções rápidas: HD, WUXGA, 4K UHD, DCI 4K, 2×/3×/4×HD wide, 8K, ou personalizada até 32768 px
- Calculadora de LED wall: painel (P1.9, P2.6, P2.9, P3.9, 500×1000…) × colunas × filas → resolução total
- Patterns:
  - Grelha + círculos
  - Mapa de cabinets numerados (coluna/fila + coordenada x,y)
  - Barras de cor 100% / 75%
  - Rampas RGBW
  - Escala de cinza (11 passos + crush de pretos e brancos)
  - Xadrez
  - Linhas de pixel 1–4 px (teste de scaler)
  - Bordas com régua de pixels (mapeamento)
  - Cor sólida
- Camadas: contorno de cabinets, etiqueta (nome, resolução, data), cruz central, círculo, diagonais, borda 1 px
- Pré-visualização ajustada ao ecrã ou 1:1
- Exporta `NOME_pattern_LxA.png`

## Uso offline

É um único ficheiro (`index.html`). Descarrega-o e abre no browser. Só as fontes vêm do Google Fonts; sem internet usa fontes do sistema.

## Limites

Resoluções muito grandes (acima de ~16K por lado) podem falhar no Safari e em telemóveis. O Chrome no desktop aguenta mais.
