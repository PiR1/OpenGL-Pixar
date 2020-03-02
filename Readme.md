# TP Synthese TSI 2019-2020 - Pixar
## Authors : Burdet & Dubreuil
Programme en OpenGL recréant la scène d'introduction du studio Pixar où vous pouvez controler la lampe.

# Known issues
## La fonction `radian` ne fonctionne pas sous Ubuntu dans le fragment shader

## Correction à appliquer
### Sous Windows
`if(angle > radians(50))`

### Sous Ubuntu 
`if(angle > 20)`

# Recommandations
## Pour un meilleur rendu, laisser la fenêtre de jeu en fenêtré.