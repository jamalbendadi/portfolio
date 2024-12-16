# Nuxt 3 / Directus

**Features**

- Directus 9 support to use as your backend, API, headless CMS - whatever your use case
- Tailwind CSS with all plugins, HeadlessUI, and Heroicons (Now Using V2) icon support
- ESLint and Prettier already configured
- Dark mode support

## Stack

### Nuxt 3

The leading Vue framework that handles routing, server side rendering, and more.

Be sure to keep your eye on [their roadmap](https://nuxt.com/docs/community/roadmap) for the latest information.

---

### Directus 9 support via the Directus SDK

If you're not familiar - Directus is an open data platform backed by a SQL database that allows you to quickly created a ready-to-use backend / API to power your application without writing any code.

For a smooth experience, the [Directus SDK](https://docs.directus.io/reference/sdk/#javascript-sdk) is already integrated for you and availably globally as a Nuxt plugin.


---

### Tailwind CSS

#### Primary Color

All the base components included in the starter use a `primary` class like `class="text-primary-600 bg-primary-500"` for colors to make it simple to change your preferred base color.

Just adjust it within your `tailwind.config.js`

```vue
// tailwind.config.js
...
theme: {
    extend: {
      colors: {
        primary: colors.violet, // Change this to your preferred Tailwind shade ie colors.yourShade
        gray: colors.slate,
      },
    },
  },
...
```
# Install
Docker setup
1. local
```zsh
docker run --rm -dit --name portfolio -p 3000:3000 \
  -v "$(pwd):/usr/src/app" \
  -w /usr/src/app \
  node:alpine \
  /bin/sh
```
