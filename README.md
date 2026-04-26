# cloud-space-api

A Node.js SDK for [Codemao Cloud Space (源码云空间)](https://cloud-space.codemao.cn/), providing simple access to cloud databases and cloud dictionaries.

## Installation

```bash
npm install cloud-space-api
# or
pnpm add cloud-space-api
```

## Quick Start

```ts
import { CloudSpace } from 'cloud-space-api';

const cs = new CloudSpace('your-authorization-token');

// --- Cloud Database (Table) ---
const table = cs.table('your-table-id');

// List records
const { records, total } = await table.list(0, 100);

// Add a record
const recordId = await table.add([
  { column_id: 'col_xxx', value: 'hello' },
  { column_id: 'col_yyy', value: '42' },
]);

// Update a record
await table.edit(recordId, [
  { column_id: 'col_xxx', value: 'world' },
]);

// Delete a record
await table.delete(recordId);

// Get a record by id
const record = await table.get(recordId);

// Batch operations
await table.store({
  add_items: [{ values: [{ column_id: 'col_xxx', value: 'new' }] }],
  edit_items: [{ record_id: 'id_1', values: [{ column_id: 'col_xxx', value: 'updated' }] }],
  delete_items: ['id_2'],
});

// --- Cloud Dictionary (Dict) ---
const dict = cs.dict('your-dict-id');

// List all entries
const { items, total } = await dict.list();

// Add an entry
const entry = await dict.add('my_key', 'my_value');

// Edit an entry by id
await dict.edit(entry.id, 'my_key', 'new_value');

// Delete an entry by id
await dict.remove(entry.id);

// Look up an entry by key
const found = await dict.getByKey('my_key');

// Delete an entry by key
await dict.removeByKey('my_key');

// Batch operations
await dict.store({
  addItems: [{ key: 'k1', value: 'v1' }],
  editItems: [{ id: 123, key: 'k2', value: 'v2' }],
  deleteItems: [456],
});
```

## API Reference

### CloudSpace

```ts
class CloudSpace {
  constructor(authorization: string, options?: CloudSpaceOptions);
  table(tableId: string): Table;
  dict(dictId: string): Dict;
}
```

- `authorization` — Your Codemao API authorization token.
- `options.baseUrl` — Optional custom base URL (defaults to `https://api-creation.codemao.cn`).

### Table

```ts
class Table {
  list(offset?: number, limit?: number): Promise<PaginatedList<TableRecord>>;
  store(body: TableStoreBody): Promise<void>;
  add(values: TableColumnValue[]): Promise<string>;
  edit(recordId: string, values: TableColumnValue[]): Promise<void>;
  delete(recordId: string): Promise<void>;
  get(recordId: string): Promise<TableRecord | undefined>;
}
```

#### Types

```ts
interface TableRecord {
  record_id: string;
  values: Record<string, string>;
}

interface TableColumnValue {
  column_id: string;
  value: string;
}

interface PaginatedList<T> {
  records: T[];
  offset: number;
  limit: number;
  total: number;
}
```

### Dict

```ts
class Dict {
  list(offset?: number, limit?: number): Promise<DictListData>;
  store(req: DictStoreRequest): Promise<DictStoreData>;
  add(key: string, value: string, type?: string): Promise<DictEntry>;
  edit(id: number, key: string, value: string, type?: string): Promise<DictEntry>;
  remove(id: number): Promise<DictStoreData>;
  getByKey(key: string): Promise<DictEntry | undefined>;
  removeByKey(key: string): Promise<boolean>;
}
```

#### Types

```ts
interface DictEntry {
  id: number;
  key: string;
  value: string;
  type: string;
}

interface DictListData {
  items: DictEntry[];
  limit: number;
  offset: number;
  total: number;
}

interface DictStoreRequest {
  addItems?: Array<{ key: string; value: string; type?: string }>;
  editItems?: Array<{ id: number; key: string; value: string; type?: string }>;
  deleteItems?: number[];
}

interface DictStoreData {
  addItems: DictEntry[];
  editItems: DictEntry[];
  deleteItems: number[];
}
```

## Development

```bash
pnpm build        # Compile TypeScript
pnpm test         # Run tests
pnpm lint         # Lint source code
pnpm format       # Format code with Prettier
```

## License

MIT
