import React from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <header
      className={[
        "flex flex-row items-center justify-between gap-3",
        "sticky top-14 z-20 -mx-4 px-4 py-3 bg-surface-muted",
        "lg:static lg:mx-0 lg:px-0 lg:py-0 lg:pb-2 lg:bg-transparent",
      ].join(" ")}
    >
      {title && (
        <div className="min-w-0">
          <h1 className="font-display text-lg sm:text-xl lg:text-2xl uppercase tracking-wide text-content">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-content-muted mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {actions && (
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {actions}
        </div>
      )}
    </header>
  );
};
