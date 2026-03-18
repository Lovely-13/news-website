import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DUMMY_SOURCES } from "@/lib/dummyData";
import { CATEGORIES, Category } from "@/types/news";
import { SourceCard } from "@/components/SourceCard";
import { ArrowLeft } from "lucide-react";

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  general: "Top headlines and breaking news from around the globe.",
  business: "Financial markets, economy, and corporate news.",
  technology: "Latest in tech, startups, gadgets, and digital culture.",
  science: "Discoveries, research, and the natural world.",
  health: "Medical breakthroughs, wellness, and public health.",
  sports: "Scores, highlights, and sports coverage worldwide.",
  entertainment: "Movies, music, TV, gaming, and pop culture.",
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const isValid = CATEGORIES.includes(category as Category);

  const filtered = useMemo(
    () => DUMMY_SOURCES.filter((s) => s.category === category),
    [category]
  );

  if (!isValid) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Category not found</h1>
          <Link to="/" className="text-sm text-primary hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-5 py-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3">
            <ArrowLeft className="w-4 h-4" /> All Sources
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground capitalize">{category}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {CATEGORY_DESCRIPTIONS[category!] || ""} — {filtered.length} sources
          </p>
        </div>
      </header>

      {/* Other categories nav */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1.5 mb-8">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                cat === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
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
      </section>
    </div>
  );
};

export default CategoryPage;
