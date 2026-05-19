import {
  MOCK_ADMIN_USER,
  MOCK_PROFILES,
  MOCK_EQUIPMENTS,
  MOCK_ACTIVITIES,
  MOCK_EVENT_CONFIG,
} from "./data";

type TableName = "profiles" | "equipments" | "activities" | "event_config";

// Mutable runtime store — initialized from seed data at module load
const store: Record<TableName, Record<string, unknown>[]> = {
  profiles: MOCK_PROFILES.map((r) => ({ ...r })),
  equipments: MOCK_EQUIPMENTS.map((r) => ({ ...r })),
  activities: MOCK_ACTIVITIES.map((r) => ({ ...r })),
  event_config: [{ ...MOCK_EVENT_CONFIG }],
};

function getRows(table: TableName): Record<string, unknown>[] {
  return store[table];
}

type Filter = { col: string; op: string; val: unknown };

class MockQueryBuilder {
  private _table: TableName;
  private _filters: Filter[] = [];
  private _orStr: string | null = null;
  private _orderCol: string | null = null;
  private _orderAsc = true;
  private _limitN: number | null = null;
  private _isSingle = false;
  private _isCountOnly = false;

  constructor(table: TableName) {
    this._table = table;
  }

  select(_fields?: string, opts?: { count?: string; head?: boolean }) {
    if (opts?.count === "exact") this._isCountOnly = true;
    return this;
  }

  eq(col: string, val: unknown) {
    this._filters.push({ col, op: "eq", val });
    return this;
  }

  neq(col: string, val: unknown) {
    this._filters.push({ col, op: "neq", val });
    return this;
  }

  gte(col: string, val: unknown) {
    this._filters.push({ col, op: "gte", val });
    return this;
  }

  lte(col: string, val: unknown) {
    this._filters.push({ col, op: "lte", val });
    return this;
  }

  or(filterStr: string) {
    this._orStr = filterStr;
    return this;
  }

  order(col: string, opts?: { ascending?: boolean; nullsFirst?: boolean }) {
    this._orderCol = col;
    this._orderAsc = opts?.ascending ?? true;
    return this;
  }

  limit(n: number) {
    this._limitN = n;
    return this;
  }

  maybeSingle() {
    this._isSingle = true;
    return this;
  }

  single() {
    this._isSingle = true;
    return this;
  }

  update(data: Record<string, unknown>) {
    const table = this._table;
    return {
      eq: (col: string, val: unknown) => {
        const rows = store[table];
        for (const row of rows) {
          if (row[col] === val) {
            Object.assign(row, data);
            // Sync embedded profiles when equipment assignment changes
            if (table === "equipments" && "assigned_to" in data) {
              const userId = data["assigned_to"] as string | null;
              row["profiles"] = userId
                ? (store.profiles.find((p) => p["id"] === userId) ?? null)
                : null;
            }
          }
        }
        return Promise.resolve({ data: null, error: null });
      },
    };
  }

  insert(data: Record<string, unknown> | Record<string, unknown>[]) {
    const rows = Array.isArray(data) ? data : [data];
    for (const row of rows) {
      const newRow: Record<string, unknown> = {
        id: `m${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        created_at: new Date().toISOString(),
        ...row,
      };
      // Embed profiles for activities
      if (this._table === "activities" && row["user_id"]) {
        const profile = store.profiles.find((p) => p["id"] === row["user_id"]);
        newRow["profiles"] = profile
          ? { full_name: profile["full_name"], email: profile["email"] }
          : null;
      }
      store[this._table].push(newRow);
    }
    return Promise.resolve({ data: null, error: null });
  }

  then(
    onFulfilled: (v: unknown) => unknown,
    onRejected?: (e: unknown) => unknown,
  ) {
    return Promise.resolve(this._resolve()).then(onFulfilled, onRejected);
  }

  private _resolve() {
    let rows = [...getRows(this._table)];

    for (const f of this._filters) {
      rows = rows.filter((row) => {
        const v = row[f.col];
        if (f.op === "eq") return v === f.val;
        if (f.op === "neq") return v !== f.val;
        if (f.op === "gte") return (v as string) >= (f.val as string);
        if (f.op === "lte") return (v as string) <= (f.val as string);
        return true;
      });
    }

    if (this._orStr && this._table === "profiles") {
      const conditions = this._orStr.split(",").map((part) => {
        const firstDot = part.indexOf(".");
        const secondDot = part.indexOf(".", firstDot + 1);
        return {
          col: part.substring(0, firstDot),
          op: part.substring(firstDot + 1, secondDot).toLowerCase(),
          val: part.substring(secondDot + 1).replace(/%/g, "").toLowerCase(),
        };
      });

      rows = rows.filter((row) =>
        conditions.some(({ col, op, val }) => {
          const rv = String(row[col] ?? "").toLowerCase();
          return op === "ilike" ? rv.includes(val) : rv === val;
        }),
      );
    }

    if (this._orderCol) {
      const col = this._orderCol;
      const asc = this._orderAsc;
      rows = [...rows].sort((a, b) => {
        const av = a[col] ?? "";
        const bv = b[col] ?? "";
        if (av < bv) return asc ? -1 : 1;
        if (av > bv) return asc ? 1 : -1;
        return 0;
      });
    }

    if (this._limitN !== null) rows = rows.slice(0, this._limitN);

    if (this._isCountOnly) return { data: null, error: null, count: rows.length };
    if (this._isSingle) return { data: rows[0] ?? null, error: null };
    return { data: rows, error: null };
  }
}

class MockChannel {
  on(_event: string, _opts: unknown, _cb: unknown) {
    return this;
  }
  subscribe() {
    return this;
  }
}

// Singleton — same reference across all renders, prevents useCallback infinite loops
const MOCK_CLIENT = {
  auth: {
    getUser: async () => ({ data: { user: MOCK_ADMIN_USER }, error: null }),
    signOut: async () => ({ error: null }),
    verifyOtp: async (_params: unknown) => ({ data: {}, error: null }),
    onAuthStateChange: (
      _event: unknown,
      _cb: unknown,
    ) => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: (table: string) => new MockQueryBuilder(table as TableName),
  channel: (_name: string) => new MockChannel(),
  removeChannel: (_ch: unknown) => {},
  storage: {
    from: (_bucket: string) => ({
      upload: async (_path: string, _file: unknown) => ({
        data: { path: "mock/screenshot.jpg" },
        error: null,
      }),
      createSignedUrl: async (_path: string, _expiry: number) => ({
        data: { signedUrl: null },
        error: null,
      }),
    }),
  },
};

export function createMockClient() {
  return MOCK_CLIENT;
}
