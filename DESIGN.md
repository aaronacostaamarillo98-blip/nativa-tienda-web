# DESIGN.md · Nativa (cosmética natural)

Identidad visual de la tienda online. Cualquier agente que edite esta web o haga piezas para ella (anuncios, posteos, secciones nuevas) sigue estas reglas.

## Esencia
Cosmética natural hecha en Paraguay. Se siente cálida, natural y cuidada, como un spa de barrio, no como una marca de lujo fría. Promesa: **tu piel, al natural**. Comprás online, pagás como quieras y lo recibís en tu casa.

## Colores
| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#fbf6f1` | Fondo general (crema claro) |
| Tinta | `#2b1f1a` | Texto principal, barra superior, botón de carrito |
| Texto suave | `#7c6a60` | Bajadas, categorías |
| Terracota | `#c2593f` | Marca, botón principal, precios rebajados, acentos |
| Terracota claro | `#d9745a` | Hover |
| Salvia | `#8aa189` | Hojas y detalles naturales |
| Oliva | `#5d6b4a` | Banner de kits, etiqueta "Nuevo" |
| Rubor | `#f3dfd5` | Etiquetas suaves, círculos de pasos |
| Línea | `rgba(43,31,26,.10)` | Bordes |

## Tipografía
- Títulos: **Fraunces** 600–700, interlineado 1–1,05, espaciado −0,02 a −0,03 em. La palabra clave del título va en terracota.
- Texto: **DM Sans** 400–700.

## Componentes
- Botones pill (radio 999 px). Principal en terracota con texto blanco; secundario con borde.
- Tarjetas de producto blancas con radio de 28 px: foto sobre un fondo pastel de color propio, categoría, nombre en Fraunces y precio en Gs. con el botón redondo "+" en tinta.
- Etiquetas: "-20%" en terracota, "Nuevo" en oliva y "Kit" en terracota.
- Barra superior en tinta con el beneficio de envío.
- Iconos: **Lucide** (search, shopping-bag, plus, credit-card, truck). Sin emojis.

## Fotos de producto
Hoy los productos están ilustrados con código. Para un cliente real, cambiarlos por fotos con el fondo quitado (rembg) sobre el mismo fondo pastel de cada tarjeta.

## Voz
Voseo paraguayo, cálido y simple: "Elegí, pagá online y recibilo en tu casa". Nada de promesas de salud ni de resultados en la piel. No inventar reseñas ni cantidades de ventas.

## Movimiento
- **GSAP + ScrollTrigger** (autoalojados en `js/`): el título del inicio entra palabra por palabra, las secciones y tarjetas suben suave al hacer scroll. Curvas `expo.out` / `power3.out`, nunca rebote en textos.
- **Lottie** (`anim/check.json`): tilde que se dibuja para confirmar acciones (turno confirmado, producto agregado).
- Todo el movimiento vive en `js/motion.js`. Sin JS el contenido se ve completo; con `prefers-reduced-motion` no se anima nada.

## Calidad
- Contraste mínimo 4,5:1 en el texto.
- Foco visible en terracota.
- Se respeta `prefers-reduced-motion`.
- Se prueba en 375 px, 768 px y 1440 px, sin desborde horizontal (en celular, una tarjeta por fila).

## En anuncios
Fondo crema con terracota y títulos en Fraunces. Mostrar la tienda real dentro de un MacBook o iPhone realista.

Sitio creado por aravora.
