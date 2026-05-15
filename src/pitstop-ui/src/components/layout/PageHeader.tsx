import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
}) => {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-2">
      <div className="min-w-0">
        <h1 className="font-display text-page-title uppercase tracking-wide text-content">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-content-muted mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </header>
  );
};
