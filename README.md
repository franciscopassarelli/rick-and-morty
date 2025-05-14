# Rick and Morty App - Componente "Tarjeta"

Este proyecto consiste en el desarrollo de una librería de componentes utilizando **React** y **TypeScript**, donde se implementa un componente principal denominado **"Tarjeta"**, inspirado en los personajes de la serie *Rick and Morty*. El diseño del componente sigue las especificaciones proporcionadas en un archivo de Figma.

---

## 🚀 Objetivo del Proyecto

Desarrollar un componente reutilizable y accesible que represente visualmente un personaje de la serie, respetando la identidad visual del diseño original en Figma. Además, se integró dentro de una aplicación funcional con navegación y funcionalidades adicionales.

---

## 🧪 Tecnologías Utilizadas

- ⚛️ React + Vite
- 📦 TypeScript
- 🎨 TailwindCSS
- 📄 React Router DOM
- ✅ Jest + React Testing Library (para pruebas unitarias)
- 📦 ESLint + Prettier (formato y linting)
- 🌐 API pública de Rick and Morty: [rickandmortyapi.com](https://rickandmortyapi.com/)

---

## 🧱 Estructura del Proyecto (Carpetas clave)

📁 src/
│
├── components/
│ └── /ui
│ └── Card.test.tsx
│
├── 
│
├── pages/
│ └── Index.tsx # Página de personajes favoritos
│ └── NotFound.tsx # Página 404
│
├── services/
│ └── api.ts # Funciones de fetch a la API
│-App.tsx
|-App.css
|-main.tsx
|-index.css
|-index.html
|---------------------------------------------

---

## 📱 Responsivo

La aplicación es **totalmente responsiva**. Se adapta correctamente a dispositivos móviles, tablets y escritorios utilizando TailwindCSS.

---

## 🧪 Pruebas

El componente **Tarjeta** cuenta con pruebas unitarias implementadas con **Jest** y **React Testing Library**.

Para correr los tests:

```bash
npm run test
