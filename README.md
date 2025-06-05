# 🎬 Movie Explorer

**Movie Explorer** est une application web construite avec **Next.js 15** permettant de rechercher et d'explorer des films depuis l'API **TMDb**. Elle combine des bonnes pratiques front-end modernes : fetch optimisé, pagination infinie, debounced search, typage strict TypeScript, tests unitaires robustes, et une UI responsive.

---

## 🚀 Fonctionnalités

- Principles SOLID : L'architecture du projet est conçue dans le respect des principes SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion), garantissant un code modulaire, facile à étendre et à maintenir sur le long terme.
- 🔍 Recherche avec debounce (optimisée pour éviter les appels excessifs à l'API)
- ♾️ Scroll infini via `IntersectionObserver` avec React Query
- 🧠 Contexte global pour partager l'état de recherche (`useSearch`)
- ⚡ Images optimisées avec `next/image` + stratégie `lazy/eager` basée sur l’index
- 🧪 Tests unitaires (mock de contexte, tests d’accessibilité, rendering conditionnel)
- 🧰 Développement typé avec TypeScript
- 💅 Interface responsive avec Tailwind CSS 4

---

## 🛠️ Technologies utilisées

| Technologie         | Usage principal                          |
| ------------------- | ---------------------------------------- |
| **Next.js 15**      | Framework principal (App Router)         |
| **React 19**        | Moteur UI                                |
| **TypeScript 5**    | Typage statique                          |
| **React Query 5**   | Fetch / cache / infinite scroll          |
| **Tailwind CSS 4**  | Style utilitaire responsive              |
| **Jest**            | Framework de tests                       |
| **Testing Library** | Tests d'intégration orientés utilisateur |
| **Undici**          | Fetch HTTP bas niveau pour les mocks     |
| **Nock**            | Mock d’API pour les tests                |

---

## ⚙️ Installation

git clone https://github.com/stephanlbj/tmdbApp.git
cd tmdbapp
npm install

# ou

yarn install

🔐 Configuration

⚠️ Remarque importante :

## Les clés suivantes sont uniquement présentes ici pour faciliter les tests du projet. Elles seront désactivées après la démonstration ou l'évaluation..

NEXT_PUBLIC_API_KEY=a3b521de3e82a57c16097116a57fb30d
TMDB_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2I1MjFkZTNlODJhNTdjMTYwOTcxMTZhNTdmYjMwZCIsIm5iZiI6MS42MDY1NzgwNjYzMjYwMDAyZSs5LCJzdWIiOiI1ZmMyNmY5MmE2NzI1NDAwNDA2ZmU3ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CISqCXJV01cRH06JxdsWD1sxja0qUmqGmsMscqTGgNk
NEXT_PUBLIC_API_URL=https://api.themoviedb.org/3

📜 Scripts disponibles

npm run dev # Démarrer l'application en mode développement

npm run build # Construire l'application pour la production

npm run start # Lancer le build

npm run test # Exécuter tous les tests unitaires

npm run test:watch # Lancer les tests en mode interactif (TDD)

![core web vitals](./public/perf.PNG)
