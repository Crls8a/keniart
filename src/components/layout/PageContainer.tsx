type PageContainerElement = "div" | "section" | "article" | "nav";

export type PageContainerProps = {
  as?: PageContainerElement;
  children: React.ReactNode;
  className?: string;
};

const pageContainerClassName = "mx-auto max-w-7xl px-5 sm:px-8";

export function PageContainer({ as: Component = "div", children, className }: PageContainerProps) {
  return <Component className={[pageContainerClassName, className].filter(Boolean).join(" ")}>{children}</Component>;
}
