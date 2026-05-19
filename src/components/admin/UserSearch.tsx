"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type SearchedUser = {
  id: string;
  full_name: string;
  email: string;
};

type Props = {
  onSelect: (user: SearchedUser) => void;
  selected: SearchedUser | null;
  placeholder?: string;
};

export function UserSearch({ onSelect, selected, placeholder }: Props) {
  const supabase = createClient();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchedUser[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selected || query.trim().length < 2) {
      setResults([]);
      return;
    }
    const handle = setTimeout(async () => {
      const term = `%${query.trim()}%`;
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .or(`full_name.ilike.${term},email.ilike.${term}`)
        .limit(8);
      setResults((data ?? []) as SearchedUser[]);
      setOpen(true);
    }, 200);
    return () => clearTimeout(handle);
  }, [query, selected, supabase]);

  return (
    <div className="relative">
      {selected ? (
        <div className="flex items-center justify-between rounded-lg border border-ink/15 bg-ink/3 px-3 py-2">
          <div>
            <div className="font-medium">{selected.full_name}</div>
            <div className="text-xs text-ink/50">{selected.email}</div>
          </div>
          <button
            type="button"
            onClick={() => {
              onSelect(null as unknown as SearchedUser);
              setQuery("");
            }}
            className="text-sm text-ink/50 hover:text-ink"
          >
            Değiştir
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            className="w-full rounded-lg border border-ink/20 px-3 py-2 outline-none focus:border-sky"
            placeholder={placeholder ?? "Ad veya e-posta ile ara..."}
          />
          {open && results.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-ink/10 bg-white shadow-lg">
              {results.map((u) => (
                <li key={u.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(u);
                      setOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left hover:bg-sky/5"
                  >
                    <div className="font-medium">{u.full_name}</div>
                    <div className="text-xs text-ink/50">{u.email}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
