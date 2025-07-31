# LGQuery

**LGQuery** is a strongly-typed, fluent GraphQL query builder designed specifically for the [LabraGo](https://github.com/GoLabra/labra) headless CMS API. It supports CRUD operations, filtering, pagination, and nested relationships—all written in TypeScript for a type-safe development experience.

> Works great with LabraGo's GraphQL API out of the box.


## Type Safety & Autocomplete

To get the most out of **LGQuery**, we highly recommend generating your GraphQL types and using them with the library. This enables:

- Full **TypeScript autocomplete**
- Strongly typed inputs and query fields
- Safer and faster development experience


## Features

- Type-safe query building
- Filtering with logical operators
- CRUD operations (Create, Read, Update, Delete)
- Nested relationship support via `.include()`
- Zero GraphQL knowledge required for basic usage
- Lightweight and dependency-minimal

---

## Installation

```bash
npm install lg-query
or
yarn add lg-query
```

## Usage
Here's a quick example demonstrating how to build different GraphQL queries using LGQuery.

```ts
import { GplFilter, LGQuery } from "lg-query";
```

#### GET Query
```ts
const getQuery = LGQuery
  .from<User>('user')
  .orderByAscending('name')
  .select('id', 'name')
  .include('permissions', q => q.select('id', 'name'));

console.log('GET Query:', getQuery.build());
```

#### CREATE Query
```ts
const createQuery = LGQuery
  .create<User>('user', { name: 'labra' })
  .select('id');

console.log('CREATE Query:', createQuery.build());
```

#### UPDATE Query
```ts
const updateQuery = LGQuery
  .update<User>('user', { name: 'labra' })
  .where(GplFilter.field('id', '', '123'))
  .select('id', 'name');

console.log('UPDATE Query:', updateQuery.build());
```

#### DELETE Query
```ts
const deleteQuery = LGQuery
  .deleteFrom<User>('user')
  .where(GplFilter.field('id', '', '123'))
  .select('id');

console.log('DELETE Query:', deleteQuery.build());
```

# Build the library
```bash
npm run build
```

# Run example usage
```bash
npm run example
```

📄 License
MIT © GoLabra

📫 Contributing & Support
Feel free to submit issues or pull requests. Feedback and contributions are always welcome!
