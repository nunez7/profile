---
target: src/app/page.tsx
total_score: 35
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\projects\\nextjs\\perfil-cv\\src\\app\\page.tsx"
target_fingerprint: "sha256:1c5b1257941328821fbf0c3f9ef00c1fbacecd6e7e35376701ff687cc3482802"
target_path: "C:\\projects\\nextjs\\perfil-cv\\src\\app\\page.tsx"
timestamp: 2026-10-13T16-19-19Z
slug: src-app-page-tsx
closed: true
---
# Critique — src/app/page.tsx (run 2, post-polish)

**Method: dual-agent (A: design review · B: detector + navegador)**

## Design Health Score

| # | Heurística | Score | Problema clave |
|---|---|---|---|
| 1 | Visibilidad del estado del sistema | 4 | Scrollspy, disponibilidad, badge HEAD — ejemplar |
| 2 | Match sistema/mundo real | 4 | Léxico git siempre adyacente a texto llano |
| 3 | Control y libertad | 4 | Toggles reversibles; nada irreversible |
| 4 | Consistencia y estándares | 4 | Drift de radios: CTA/toggle 0px vs radio único 6px |
| 5 | Prevención de errores | 3 | Footer renderiza `(+52) 323-104-52xx` como `tel:` funcional |
| 6 | Reconocimiento vs. recall | 4 | Todo visible |
| 7 | Flexibilidad y eficiencia | 4 | Anclas, prefs, scrollspy |
| 8 | Estética minimalista | 4 | KPIs apilados en móvil gastan ~280px verticales |
| 9 | Recuperación de errores | 4 | Sin flujos con error |
| 10 | Ayuda y documentación | n/a | Superficie de solo lectura |

**Total: 35 / 36 = 97% → Excellent** (run 1: 28.5/36 = 79% Good; delta +6.5).

## Veredicto de especificidad

Superficie genuinamente específica: timeline git y `profile.ts` codifican información real; escalera de elevación `flat`/`shadow-panel`/`elevated` implementada como DESIGN.md la documenta y legible en ambos temas; regla `hue` unifica KPIs y stack; CTA único elemento relleno. El descriptor cae en la cola: Formación/Certificaciones y Contacto son listas competentes pero genéricas; la página termina sin reabrir la conversión. Drift único: DESIGN.md declara radio 6px único, pero CTA y toggle renderizan a 0px (pestaña `profile.ts` 4px).

**Detector**: CLI exit 2 → 3 findings (2× border-accent-on-rounded, 1× codex-grid-background); runtime 9 claro / 10 oscuro, idéntico en las 4 vistas. Delta vs run 1: findings de móvil eliminados (body-text-viewport-edge, text-overflow, varianza entre viewports). Restantes = reglas hue (8×, una sola ubicación multiplicada por reutilización), caret y halo — diseño documentado.

## Impresión general

La ronda anterior se sostiene completa: elevación jerárquica, CTA indiscutible, móvil sin desbordar, timeline escaneable. La mayor oportunidad restante está en el final del viaje: canal tel: roto y ausencia de CTA de cierre.

## Lo que funciona

1. Payload de escaneo completo en el primer viewport en ambos breakpoints.
2. Timeline: cada ornamento mapea a dato.
3. Elevación comunica; theme toggle sin layout shift (4248/6106 px idénticos).

## Priority Issues

**[P1] El canal Teléfono está muerto al llegar**
Por qué importa: Footer construye `tel:` desde `(+52) 323-104-52xx` (enmascarado en dict.ts) → enlace con `xx` no marca; canal presentado-y-roto es peor que omitido en Persuade.
Fix: número completo en dict (ES+EN) + Footer, o quitar `href` y dejar texto plano.
Comando: harden

**[P2] Sin CTA de cierre: la conversión solo existe arriba**
Por qué importa: el reclutador convencido llega a Contacto y debe volver 4000px para actuar.
Fix: Footer.tsx — repetir la acción primaria bajo el h2 de Contacto antes del dl.
Comando: shape

**[P2] KPIs móviles apilados queman ~280px entre CTA y profile.ts**
Por qué importa: empujan el arte firma a la tercera pantalla en 375.
Fix: Hero.tsx — en <sm, fila hairline por KPI (label izquierda, cifra derecha) en vez de panel completo.
Comando: distill

**[P3] CTA y toggle violan la regla del radio único (0px vs 6px)**
Por qué importa: drift documental; botón cuadrado junto a KPIs redondeados.
Fix: `rounded-panel` en botón (Hero.tsx) y toggle (Header.tsx), o registrar excepción en DESIGN.md.
Comando: polish

## Persona red flags

- Jordan: "Descargar CV" abre diálogo de impresión sin pista de Guardar como PDF; tel: parece callable y no lo es.
- Casey: 3 KPIs full-width retrasan profile.ts; entrada 3 envuelve título 2 líneas / meta 3.
- Riley: skip link y aria correctos; tel: falla silencioso; sin layout shift al conmutar tema.

## Observaciones menores

- meta repite +8 años a 120px del KPI — redundancia inofensiva.
- Hueco bajo Frontend (5) junto a Prácticas (7) — whitespace intencional con items-start.
- "(PDF)" en la label del CTA alinearía expectativa con el diálogo.
- Sombra shadow-panel en claro al umbral de visibilidad sobre papel lavanda.

## Preguntas provocadoras

1. Si el teléfono está enmascarado por spam, ¿debería presentarse como canal dialable — o "WhatsApp" sin número expuesto sirve mejor?
2. ¿Es la entrada 1 abierta con 7 bullets el right segundo acto tras un hero aireado?
3. ¿Es la cola sin momento de marca restraint o final sin art-directar?
