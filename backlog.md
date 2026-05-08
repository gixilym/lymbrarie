# Backlog de Refactorización - Lymbrarie

## Reglas de Prioridad
- **P0 (Crítico)**:安全问题，需要立即修复
- **P1 (Alta)**: 性能问题或功能缺陷
- **P2 (Media)**: 代码质量问题
- **P3 (Baja)**: 改进建议

---

## P0 - CRÍTICO (Seguridad)

### P0.1 XSS via query params 
**Archivo:** `pages/error.tsx:11`, `components/ErrorNotes.tsx:42`
**Problema:** `dangerouslySetInnerHTML` con datos de URL sin sanitizar
**Fix:** Instalar y usar `dompurify` para sanitizar antes de renderizar
```typescript
import DOMPurify from 'dompurify';
const sanitizedNotes = DOMPurify.sanitize(notes);
dangerouslySetInnerHTML={{ __html: sanitizedNotes }}
```

### P0.2 Clave de descrypt expuesta al cliente ✅
**Archivo:** `utils/encrypt.ts:4`
**Problema:** `NEXT_PUBLIC_DECRYPT` era accesible client-side
**Fix:** Renombrado a `DECRYPT` (solo servidor). Actualizado `.env.local`, `.env.production`, `.env.example`

### P0.3 Verificar .env.local no esté en git ✅
**Verificado:** `.env.local` contiene credenciales reales pero está correctamente excluido en `.gitignore` (línea 20: `.env*.local`). Solo `.env.example` (valores placeholder "0") está rastreado. Ningún secreto real está en el repositorio.

---

## P1 - ALTA (Performance + Seguridad Media)

### P1.1 Fuga de memoria: onSnapshot sin cleanup
**Archivo:** `adapters/book.adapters.ts:44`
**Problema:** `onSnapshot` retorna unsubscribe pero nunca se limpia
**Fix:** En componentes que usan `syncBooks`, agregar `useEffect` con cleanup:
```typescript
useEffect(() => {
  const unsub = syncBooks(...);
  return () => unsub();
}, [...]);
```

### P1.2 Sin virtualización en listas grandes
**Archivo:** `components/ListBooks.tsx:29`
**Problema:** Todos los libros renderizan de golpe - DOM inflado con cientos de items
**Fix:** Implementar `react-window` o `react-virtualized` para windowing

### P1.3 Componentes sin memo - re-renders excesivos
**Archivos:** `components/BookCard.tsx`, `CardWithDetails.tsx`, `CardWithoutDetails.tsx`, `BookCardSearched.tsx`, `BookState.tsx`, `FieldsBook.tsx`, `Menu.tsx`
**Fix:** Envolver cada uno en `memo()`:
```typescript
const BookCard = memo(function BookCard({ ... }: BookCardProps) { ... });
```

### P1.4 Verificación de propiedad en Firestore
**Archivo:** `adapters/book.adapters.ts:71,84`
**Problema:** No se verifica ownership del libro antes de modificar/eliminar
**Fix:** Agregar verificación de UID en cada operación

### P1.5 Estados duplicados en 10+ ubicaciones
**Archivos:** `utils/consts.ts`, `utils/helpers.ts`, `components/BookState.tsx`, `FieldsBook.tsx`, `pages/profile.tsx`, `pages/guest.tsx`, `pages/search.tsx`, `pages/recommendation/[BookRecommendationId].tsx`
**Problema:** Hardcoded strings para estados de libro
**Fix:** Crear `utils/states.ts` centralizado:
```typescript
export const BOOK_STATES = {
  READING: { es: "Leyendo", en: ["Reading"] },
  READ: { es: "Leído", en: ["Read"] },
  PENDING: { es: "Pendiente", en: ["Pending"] },
  RECOMMENDED: { es: "Recomendado", en: ["Recommended"] },
} as const;
export const STATE_OPTIONS = Object.values(BOOK_STATES).map(s => s.es);
```

---

## P2 - MEDIA (TypeScript + Code Quality)

### P2.1 Eliminar tipos `any`
**Archivos y líneas:**

| Archivo | Línea | Fix |
|---------|-------|-----|
| `utils/types.ts` | 18 | `SingleValue<{value: string; label: string}>` |
| `utils/types.ts` | 22 | `RefObject<HTMLFormElement>` |
| `utils/types.ts` | 26 | Definir tipo `User` propio desde next-firebase-auth |
| `utils/types.ts` | 28 | `MemoExoticComponent<(arg0: Book) => Component>` |
| `utils/types.ts` | 36 | `SetterOrUpdater<string>` |
| `utils/encrypt.ts` | 6,8,10 | `data: unknown`, `unknown`, `unknown` |
| `hooks/useLocalStorage.ts` | 4,5,15,21 | Generic `useLocalStorage<T>(key: string, initialValue?: T)` |

### P2.2 Type assertions unsafe
**Archivos:**

| Archivo | Línea | Riesgo | Fix |
|---------|-------|--------|-----|
| `pages/profile.tsx` | 64 | Error runtime | Crear validación de estado |
| `pages/book/[bookId].tsx` | 35 | Podría ser string[] | Verificar tipo con `Array.isArray` |
| `components/btns/ShareBtn.tsx` | 20-25 | null checks | Usar optional chaining o verificar |

### P2.3 Validación duplicada URL/length
**Archivos:** `components/popups/NewBookPopUp.tsx`, `EditBookPopUp.tsx`
**Fix:** Crear `utils/validation.ts`:
```typescript
export const URL_REGEX = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
export const MAX_TITLE_LENGTH = 80;
export const MAX_AUTHOR_LENGTH = 34;
export const MAX_GENDER_LENGTH = 24;
export const MAX_LOANED_LENGTH = 24;
export const MAX_URL_LENGTH = 500;

export function validateImageUrl(url: string): boolean {
  return URL_REGEX.test(url) && url.length <= MAX_URL_LENGTH;
}
export function validateTitleLength(title: string): boolean {
  return title.length > 0 && title.length <= MAX_TITLE_LENGTH && !title.includes('/');
}
```

### P2.4 Mensajes de error hardcoded duplicados
**Archivos:** `NewBookPopUp.tsx`, `EditBookPopUp.tsx`
**Fix:** Crear `utils/messages.ts`:
```typescript
export const VALIDATION_MESSAGES = {
  TITLE_EMPTY: "El título no puede estar vacío",
  TITLE_REPEATED: "Ya tienes un libro con ese título",
  TITLE_TOO_LONG: (max: number) => `El título es demasiado largo (máx. ${max} caracteres)`,
  AUTHOR_TOO_LONG: (max: number) => `El autor es demasiado largo (máx. ${max} caracteres)`,
  INVALID_URL: "La URL de la imagen no es válida",
};
```

### P2.5 Hook compartido para formularios de libro
**Archivos:** `components/popups/NewBookPopUp.tsx`, `EditBookPopUp.tsx`
**Problema:** ~100 líneas de lógica duplicada entre ambos
**Fix:** Crear `hooks/useBookForm.ts` con:
- Estado del formulario
- Validación
- Handlers de cambio
- Lógica de edición vs creación

### P2.6 Números mágicos como constantes
| Valor | Archivo | Constante |
|-------|---------|-----------|
| `80` | New/Edit BookPopUp | `MAX_TITLE_LENGTH` |
| `34` | New/Edit BookPopUp | `MAX_AUTHOR_LENGTH` |
| `24` | New/Edit BookPopUp | `MAX_FIELD_LENGTH` |
| `2300` | New/Edit BookPopUp | `ERROR_DELAY_MS` |

### P2.7 Funciones sin useCallback en ListSection
**Archivo:** `components/ListSection.tsx:78,104,122,127`
**Fix:** Envolver en `useCallback` con dependencias correctas

### P2.8 Cálculos sin useMemo
| Archivo | Línea | Fix |
|---------|-------|-----|
| `ListSection.tsx` | 41 | `myFavs` en `useMemo([myBooks])` |
| `ListSection.tsx` | 104-120 | `where()` con `useCallback` o precomputar |
| `useTitles.ts` | 9-12 | `isRepeated` en `useMemo` |
| `BookCard.tsx` | 22-46 | Objetos `withDetails`, `withOutDetails`, `searchedProps` en `useMemo` |

### P2.9 Tipos no exportados
| Archivo | Tipo | Fix |
|---------|------|-----|
| `pages/profile.tsx:193` | `States` | Exportar o usar `Record<string, number>` |
| `pages/profile.tsx:195` | `BookState` | Exportar, ya que se usa externamente? |
| `utils/helpers.ts:186,193,196` | `AnimateOpacity`, `PathOptions`, `AnimatePopup` | Exportar o mover a `types.ts` |

### P2.10 Missing return types en exports
**Archivo:** `utils/helpers.ts`
**Fix:** Agregar tipos de retorno explícitos a todas las funciones exportadas

---

## P3 - BAJA (Dead Code + Cleanup)

### P3.1 Tipos exportados sin uso
**Archivo:** `utils/types.ts:14-42`
**Fix:** Eliminar exports no utilizados: `Document`, `FormRef`, `EventSelect`, `Handler`, `MemoComponent`, `Translate`, `SelectOpt`, `SortModes`, `Notis`, `Void`

### P3.2 GoogleIcon exportado sin uso
**Archivo:** `utils/svgs.tsx:71`
**Fix:** Eliminar si no se usa en ningún otro lugar

### P3.3 Tipo Void sin uso
**Archivo:** `hooks/useLoad.ts:16`
**Fix:** Eliminar

### P3.4 Bloque comentado en HeaderIndex
**Archivo:** `components/HeaderIndex.tsx:73-90`
**Problema:** 17 líneas comentadas de Link "Escritor"
**Fix:** Eliminar si la feature no se planea

### P3.5 Variable sin uso en EditBookPopUp
**Archivo:** `components/popups/EditBookPopUp.tsx:119`
**Problema:** `newTitles` sobrescrito sin uso
**Fix:** Eliminar línea o usar el valor

### P3.6 Interfases definidas sin exportar
**Archivo:** `utils/helpers.ts:186-200`
**Problema:** `AnimateOpacity`, `PathOptions`, `AnimatePopup` definidos pero no exportados
**Fix:** Exportar o eliminar si no se usan

### P3.7 Traducción de géneros redundante
**Archivo:** `utils/helpers.ts:72-105`
**Problema:** Mapeo English→Español ya existe en `GENDERS`
**Fix:** Derivar mapeo automáticamente de `GENDERS` o eliminar mapeo manual

### P3.8 Componente BaseCard compartido
**Archivos:** `components/CardWithDetails.tsx`, `CardWithoutDetails.tsx`
**Problema:** Clases CSS idénticas repetidas
**Fix:** Crear `components/BaseCard.tsx` con estilos compartidos

---

## Orden de Implementación Sugerido

1. **Semana 1: P0 (Crítico)**
   - Fix XSS con DOMPurify
   - Mover clave decrypt a servidor
   - Verificar .env.local

2. **Semana 2: P1 (Performance)**
   - Cleanup onSnapshot
   - Virtualización de listas
   - Memo en componentes clave
   - Centralizar estados de libro

3. **Semana 3-4: P2 (TypeScript + Quality)**
   - Eliminar `any`
   - Fix type assertions
   - Extraer validación compartida
   - Hook de formulario compartido
   - useMemo/useCallback

4. **Semana 5: P3 (Cleanup)**
   - Eliminar dead code
   - Limpiar exports
   - Docblock si es necesario
