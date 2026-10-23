/**
 * Texto con marcadores de dato pendiente entre corchetes — hoy el
 * rango de la ACE (`[2026-2029]`); sirve igual si se añaden métricas
 * o años pendientes más adelante. Se resaltan en mono con subrayado
 * punteado para que el propietario del CV los localice de un vistazo.
 * Son texto, no decoración: conservan el contenido para lectores de
 * pantalla.
 */
const PLACEHOLDER = /(\[[^\]]+\])/;

export function PendingText({ text }: { text: string }) {
  return (
    <>
      {text.split(PLACEHOLDER).map((part, i) =>
        PLACEHOLDER.test(part) ? (
          <span key={i} className="pending-text">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
