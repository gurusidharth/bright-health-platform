import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FileText, Folder, Image as ImageIcon, Search, Upload } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/dashboard";
import { documents, folders } from "@/lib/data/documents";

export const Route = createFileRoute("/dashboard/documents")({
  component: DocumentsPage,
});

const typeIcon = { pdf: FileText, image: ImageIcon, record: FileText };

function DocumentsPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = documents;
    if (activeFolder) list = list.filter((d) => d.folderId === activeFolder);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((d) => d.name.toLowerCase().includes(q));
    return list;
  }, [activeFolder, query]);

  const folderCounts = useMemo(() => {
    const counts = new Map<string, number>();
    documents.forEach((d) => counts.set(d.folderId, (counts.get(d.folderId) ?? 0) + 1));
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        subtitle={`${documents.length} files across ${folders.length} folders.`}
        action={
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-white shadow-glow hover:opacity-95">
            <Upload className="h-4 w-4" /> Upload
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {folders.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFolder(activeFolder === f.id ? null : f.id)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
              activeFolder === f.id ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:bg-accent"
            }`}
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Folder className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold">{f.name}</div>
              <div className="text-xs text-muted-foreground">{folderCounts.get(f.id) ?? 0} files</div>
            </div>
          </button>
        ))}
      </div>

      <SectionCard title={activeFolder ? folders.find((f) => f.id === activeFolder)?.name : "All Documents"} subtitle={`${filtered.length} results`}>
        <div className="relative mb-4 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents…"
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <ul className="divide-y divide-border">
          {filtered.map((d) => {
            const Icon = typeIcon[d.type];
            return (
              <li key={d.id} className="flex items-center gap-3 py-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{d.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{d.uploadedBy} · {d.uploadedDate} · {d.size}</div>
                </div>
                <button className="shrink-0 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">Preview</button>
              </li>
            );
          })}
        </ul>
      </SectionCard>
    </div>
  );
}
