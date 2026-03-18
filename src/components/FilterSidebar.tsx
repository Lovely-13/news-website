import { CATEGORIES, Category } from "@/types/news";
import { Search, X } from "lucide-react";

interface FilterSidebarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedCategory: Category | null;
  onCategoryChange: (cat: Category | null) => void;
  selectedCountry: string | null;
  onCountryChange: (country: string | null) => void;
  countries: string[];
  languages: string[];
  selectedLanguage: string | null;
  onLanguageChange: (lang: string | null) => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterSidebar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCountry,
  onCountryChange,
  countries,
  languages,
  selectedLanguage,
  onLanguageChange,
  totalCount,
  filteredCount,
}: FilterSidebarProps) {
  const hasFilters = !!search || !!selectedCategory || !!selectedCountry || !!selectedLanguage;

  return (
    <aside className="w-full lg:w-[280px] shrink-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto p-5 lg:border-r border-border bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground -tracking-[0.02em]">
          Global News Index
        </h1>
        <p className="text-[14px] text-muted-foreground mt-1 tabular-nums">
          Showing {filteredCount} of {totalCount} sources
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search sources..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-9 pr-3 rounded-lg bg-secondary text-foreground text-[14px] shadow-input-inset placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {hasFilters && (
        <button
          onClick={() => {
            onSearchChange("");
            onCategoryChange(null);
            onCountryChange(null);
            onLanguageChange(null);
          }}
          className="flex items-center gap-1.5 text-[11px] font-medium text-primary mb-4 hover:underline"
        >
          <X className="w-3 h-3" />
          Clear all filters
        </button>
      )}

      {/* Categories */}
      <div className="mb-5">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Category
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(selectedCategory === cat ? null : cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="mb-5">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Country
        </h2>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => onCountryChange(selectedCountry === c ? null : c)}
              className={`px-2.5 py-1 rounded-lg font-mono-meta text-[10px] uppercase tracking-wider transition-all ${
                selectedCountry === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="mb-5">
        <h2 className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Language
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => onLanguageChange(selectedLanguage === l ? null : l)}
              className={`px-2.5 py-1 rounded-lg font-mono-meta text-[10px] uppercase tracking-wider transition-all ${
                selectedLanguage === l
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
