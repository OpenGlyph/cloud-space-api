import { HttpClient } from '../client.js';
import {
  PaginatedList,
  TableColumnValue,
  TableRecord,
} from '../types.js';

export class Table {
  private client: HttpClient;
  private tableId: string;

  constructor(client: HttpClient, tableId: string) {
    this.client = client;
    this.tableId = tableId;
  }

  /** List records with pagination. */
  list(offset = 0, limit = 500): Promise<PaginatedList<TableRecord>> {
    return this.client.get<PaginatedList<TableRecord>>(
      `/coconut/clouddb/${this.tableId}/data_list?offset=${offset}&limit=${limit}`,
    );
  }

  /** Batch add, edit, and delete records in one request. */
  store(body: {
    add_items?: Array<{ values: TableColumnValue[] }>;
    edit_items?: Array<{ record_id: string; values: TableColumnValue[] }>;
    delete_items?: string[];
  }): Promise<void> {
    return this.client.put(`/coconut/clouddb/${this.tableId}/datas`, body);
  }

  /** Add a single record. */
  async add(values: TableColumnValue[]): Promise<string> {
    const data = await this.client.put<{ add_items: Array<{ record_id: string }> }>(
      `/coconut/clouddb/${this.tableId}/datas`,
      { add_items: [{ values }] },
    );
    return data.add_items[0].record_id;
  }

  /** Update a single record. */
  edit(recordId: string, values: TableColumnValue[]): Promise<void> {
    return this.store({ edit_items: [{ record_id: recordId, values }] });
  }

  /** Delete a single record. */
  delete(recordId: string): Promise<void> {
    return this.store({ delete_items: [recordId] });
  }

  /** Find a record by its id. */
  async get(recordId: string): Promise<TableRecord | undefined> {
    const { records } = await this.list();
    return records.find((r) => r.record_id === recordId);
  }
}
