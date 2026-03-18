import { NewsSource } from "@/types/news";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface SourceCardProps {
  source: NewsSource;
  index: number;
}

const itemVars = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function SourceCard({ source }: SourceCardProps) {
  return (
    <motion.a
      variants={itemVars}
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between p-5 bg-card rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 will-change-transform cursor-pointer"
    >
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-card-foreground tracking-tight text-balance leading-tight">
            {source.name}
          </h3>
          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
        </div>
        <p className="text-[14px] text-muted-foreground leading-5 mb-3">
          {source.description}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-secondary text-secondary-foreground text-[11px] font-medium capitalize">
          {source.category}
        </span>
        <span className="font-mono-meta text-[10px] text-muted-foreground uppercase tracking-wider">
          {source.country}
        </span>
        <span className="font-mono-meta text-[10px] text-muted-foreground uppercase tracking-wider">
          {source.language}
        </span>
      </div>
    </motion.a>
  );
}
