import { HttpClient } from './client.js';
import { Table } from './resources/table.js';
import { Dict } from './resources/dict.js';
import { CloudSpaceOptions } from './types.js';

export class CloudSpace {
  private client: HttpClient;

  constructor(authorization: string, options?: CloudSpaceOptions) {
    this.client = new HttpClient(authorization, options?.baseUrl);
  }

  table(tableId: string): Table {
    return new Table(this.client, tableId);
  }

  dict(dictId: string): Dict {
    return new Dict(this.client, dictId);
  }
}

export type { Table, Dict };
export type * from './types.js';
