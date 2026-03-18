import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DUMMY_SOURCES } from "@/lib/dummyData";
import { CATEGORIES, Category } from "@/types/news";
import { SourceCard } from "@/components/SourceCard";
import { Search, X, ChevronRight } from "lucide-react";

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const CATEGORY_ICONS: Record<string, string> = {
  general: "🌍",
  business: "💼",
  technology: "💻",
  science: "🔬",
  health: "🏥",
  sports: "⚽",
  entertainment: "🎬",
};

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const sources = DUMMY_SOURCES;

  const countries = useMemo(() => [...new Set(sources.map((s) => s.country))].sort(), [sources]);
  const languages = useMemo(() => [...new Set(sources.map((s) => s.language))].sort(), [sources]);

  const filtered = useMemo(() => {
    return sources.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && s.category !== selectedCategory) return false;
      if (selectedCountry && s.country !== selectedCountry) return false;
      if (selectedLanguage && s.language !== selectedLanguage) return false;
      return true;
    });
  }, [sources, search, selectedCategory, selectedCountry, selectedLanguage]);

  const hasFilters = !!search || !!selectedCategory || !!selectedCountry || !!selectedLanguage;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    sources.forEach((s) => { counts[s.category] = (counts[s.category] || 0) + 1; });
    return counts;
  }, [sources]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 py-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Global News Index
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse {sources.length} news sources from around the world
          </p>
        </div>
      </header>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border border-border"
            >
              <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
              <span className="text-sm font-medium text-card-foreground capitalize">{cat}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{categoryCounts[cat] || 0} sources</span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search sources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-9 pr-3 rounded-lg bg-secondary text-foreground text-sm shadow-input-inset placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountry(selectedCountry === c ? null : c)}
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

          <div className="flex flex-wrap gap-1.5">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLanguage(selectedLanguage === l ? null : l)}
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

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setSelectedCategory(null); setSelectedCountry(null); setSelectedLanguage(null); }}
              className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          )}
        </div>

        <p className="text-xs text-muted-foreground mb-4 tabular-nums">
          Showing {filtered.length} of {sources.length} sources
        </p>

        {/* Source Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-lg font-semibold text-foreground mb-1">No sources match your filters</h2>
            <button
              onClick={() => { setSearch(""); setSelectedCategory(null); setSelectedCountry(null); setSelectedLanguage(null); }}
              className="mt-2 text-xs font-medium text-primary hover:underline"
            >
              Clear all
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedCountry}-${selectedLanguage}-${search}`}
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filtered.map((source, i) => (
                <SourceCard key={source.id} source={source} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default Index;
