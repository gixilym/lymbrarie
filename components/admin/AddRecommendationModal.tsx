import type { Component } from "@/utils/types";

export default function AddRecommendationModal(): Component {
  return (
    <div className="text-white w-full max-w-sm bg-slate-900 p-4 rounded-md border border-slate-800">
      <form>
        <label htmlFor="title" className="block mb-1">
          Titulo
        </label>
        <input
          type="text"
          id="title"
          className="w-full border border-slate-600 px-4 py-2 rounded-md mb-3 bg-slate-800 focus:outline-none focus:ring-0"
        />

        <label htmlFor="author" className="block mb-1">
          Autor
        </label>
        <input
          type="text"
          id="author"
          className="w-full border border-slate-600 px-4 py-2 rounded-md mb-3 bg-slate-800 focus:outline-none focus:ring-0"
        />

        <label htmlFor="gender" className="block mb-1">
          Género
        </label>
        <input
          type="text"
          id="gender"
          className="w-full border border-slate-600 px-4 py-2 rounded-md mb-3 bg-slate-800 focus:outline-none focus:ring-0"
        />

        <label htmlFor="image" className="block mb-1">
          URL de portada
        </label>
        <input
          type="text"
          id="image"
          className="w-full border border-slate-600 px-4 py-2 rounded-md mb-3 bg-slate-800 focus:outline-none focus:ring-0"
        />

        <label htmlFor="url" className="block mb-1">
          URL de Google Books
        </label>
        <input
          type="text"
          id="url"
          className="w-full border border-slate-600 px-4 py-2 rounded-md mb-3 bg-slate-800 focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          className="bg-blue-800 hover:bg-blue-700 transition-colors w-full py-2 rounded-md mt-2"
        >
          Actualizar recomendación
        </button>
      </form>
    </div>
  );
}
