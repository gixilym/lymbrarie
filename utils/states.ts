const BOOK_STATES = {
  READING: { es: "Leyendo", en: ["Reading"], bg: "bg-yellow-600/30" },
  READ: { es: "Leído", en: ["Read"], bg: "bg-green-600/30" },
  PENDING: { es: "Pendiente", en: ["Pending"], bg: "bg-orange-600/30" },
  LENT: { es: "Prestado", en: ["Lent", "Loaned"], bg: "bg-blue-600/30" },
  RECOMMENDED: { es: "Recomendado", en: ["Recommended"], bg: "bg-violet-600/30" },
  ABANDONED: { es: "Abandonado", en: ["Abandoned"], bg: "bg-red-600/30" },
  HALFWAY: { es: "A medias", en: ["Halfway", "Half"], bg: "bg-gray-600/30" },
} as const;

type BookStateKey = keyof typeof BOOK_STATES;

const STATE_ES_VALUES: string[] = Object.values(BOOK_STATES).map(s => s.es);
const STATE_EN_VALUES: string[] = Object.values(BOOK_STATES).flatMap(s => s.en);

function translateState(state: string): string {
  const entry = Object.values(BOOK_STATES).find(
    s => s.en.some(e => e === state) || s.es === state
  );
  return entry?.es ?? state;
}

function mapStateToEnglish(state: string): string[] {
  const entry = Object.values(BOOK_STATES).find(
    s => s.es === state
  );
  return entry ? [...entry.en] : [state];
}

function isLent(state: string): boolean {
  return BOOK_STATES.LENT.en.some(e => e === state) || state === BOOK_STATES.LENT.es;
}

export {
  BOOK_STATES,
  type BookStateKey,
  STATE_ES_VALUES,
  STATE_EN_VALUES,
  translateState,
  mapStateToEnglish,
  isLent,
};
