# PokéScope – React Pokédex

## Overview

PokéScope is a single-page application that lets you browse, search, and favorite Pokémon using live data from the [PokeAPI](https://pokeapi.co/). It ships with a welcoming landing page, a searchable Pokédex grid with infinite loading, and a detailed view for every Pokémon, including stats, abilities, and vitals. Favorites are saved to local storage so they persist on the same device.

## Features

- ✨ **Welcome page** – Introduces the app and links out to the Pokédex and PokeAPI docs.
- 🔍 **Search & filter** – Instant client-side filtering across the loaded Pokémon collection.
- ♾️ **Load more pagination** – Fetches Pokémon in batches of 24 with a single click.
- ⭐ **Favorites** – Toggle favorites anywhere; selections stay in local storage.
- 📊 **Detail view** – Displays artwork, types, abilities, height/weight, and stat bars.
- 🔗 **GitHub Pages friendly** – Uses `HashRouter`, so it can be deployed without custom rewrites.

## Tech stack

- React 19 with functional components and hooks
- React Router 6 for client-side navigation
- Vite 5 + TypeScript for fast builds and DX
- Vanilla CSS for styling with responsive layouts

## Getting started

Prerequisites: Node.js 18.x or newer (Vite 5 requirement) and npm.

```bash
npm install
npm run dev
```

The dev server prints a local URL you can open in the browser. For production builds:

```bash
npm run build
npm run preview
```

`npm run build` outputs the static site into `dist/`, ready to publish via GitHub Pages (serve the folder root as your site).

## Project structure

```text
src/
├─ components/        // Header, cards, stats, search bar, shared UI
├─ context/           // Pokémon search + favorites context (local storage)
├─ hooks/             // Data-fetching hooks for lists and detail pages
├─ pages/             // Welcome, Pokédex, detail, and not-found views
├─ services/          // PokeAPI helpers
├─ types/             // Shared Pokémon TypeScript types
└─ utils/             // Formatting helpers
```

## Data source

All data comes from [PokeAPI](https://pokeapi.co/). Be mindful of their public rate limits when extending the app or adding heavier features.
