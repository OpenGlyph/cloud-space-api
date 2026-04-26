import { HttpClient } from '../client.js';
import { DictEntry, DictListData, DictStoreData, DictStoreRequest } from '../types.js';

export class Dict {
  private client: HttpClient;
  private dictId: string;

  constructor(client: HttpClient, dictId: string) {
    this.client = client;
    this.dictId = dictId;
  }

  /** List all entries with pagination. */
  list(offset = 0, limit = 500): Promise<DictListData> {
    return this.client.get<DictListData>(
      `/coconut/webdb/admin/dict/${this.dictId}?offset=${offset}&limit=${limit}`,
    );
  }

  /** Batch add, edit, and delete entries in one request. */
  store(req: DictStoreRequest): Promise<DictStoreData> {
    return this.client.post<DictStoreData>(
      `/coconut/webdb/admin/dict/${this.dictId}/storevalues`,
      req,
    );
  }

  /** Add a single entry. */
  async add(key: string, value: string, type = 'string'): Promise<DictEntry> {
    const result = await this.store({ addItems: [{ key, value, type }] });
    return result.addItems[0];
  }

  /** Update a single entry by id. */
  async edit(id: number, key: string, value: string, type = 'string'): Promise<DictEntry> {
    const result = await this.store({ editItems: [{ id, key, value, type }] });
    return result.editItems[0];
  }

  /** Delete entries by id. */
  remove(id: number): Promise<DictStoreData> {
    return this.store({ deleteItems: [id] });
  }

  /** Find a single entry by key name. */
  async getByKey(key: string): Promise<DictEntry | undefined> {
    const { items } = await this.list();
    return items.find((e) => e.key === key);
  }

  /** Remove an entry by key name. */
  async removeByKey(key: string): Promise<boolean> {
    const { items } = await this.list();
    const target = items.find((e) => e.key === key);
    if (!target) return false;
    await this.remove(target.id);
    return true;
  }
}
