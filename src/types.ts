export interface CloudSpaceOptions {
  baseUrl?: string;
}

// --- Common ---

export interface CreationApiResponse<T> {
  code: number;
  success: boolean;
  data: T;
  msg: string;
  extData: unknown;
  traceId: string;
}

export interface PaginatedList<T> {
  records: T[];
  offset: number;
  limit: number;
  total: number;
}

// --- Table types ---

export interface TableRecord {
  record_id: string;
  values: Record<string, string>;
}

export interface TableColumnValue {
  column_id: string;
  value: string;
}

export interface TableStoreRequest {
  add_items?: Array<{ values: TableColumnValue[] }>;
  edit_items?: Array<{ record_id: string; values: TableColumnValue[] }>;
  delete_items?: string[];
}

export interface TableStoreData {
  add_items: Array<{ record_id: string }>;
  edit_items: Array<{ record_id: string }>;
  delete_items: string[] | null;
}

// --- Dict types ---

export interface DictEntry {
  id: number;
  key: string;
  value: string;
  type: string;
}

export interface DictListData {
  items: DictEntry[];
  limit: number;
  offset: number;
  total: number;
}

export interface DictStoreRequest {
  addItems?: Array<{ key: string; value: string; type?: string }>;
  editItems?: Array<{ id: number; key: string; value: string; type?: string }>;
  deleteItems?: number[];
}

export interface DictStoreData {
  addItems: DictEntry[];
  editItems: DictEntry[];
  deleteItems: number[];
}
