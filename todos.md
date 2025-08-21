## 🔴 Alta Prioridad

> Configurar ModalUpdates.tsx y admin.tsx

---

## 🟡 Media Prioridad

> El orden de los libros funciona extraño.

---

## 🟢 Baja Prioridad

> Automatizar la recomendación de libros.
> En modo 'shuffle' el valor del arr se modifica al cambiar 'searchVal', 'stateVal' o 'showFavs'.

---

## Features:

- Seguir con los tests.
- Unificar las rutas y lógica de las rutas guest y recommendation.
- Fecha de publicación para cada libro.
- Utilizar un editor de texto enriquecido para las notas.
- Chatbot con RAG Component.
- Crear una nueva colección por cada UID.

---

## Tener en cuenta

- Los if de navigator.onLine de los useEffect del index son para la PWA.
- Las recomendaciones se actualizan manulamente en el código (si, sé que está mal).
- Las peticiones a base de datos se gestionan desde la carpeta 'adapters'.
