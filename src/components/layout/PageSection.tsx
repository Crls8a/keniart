import { PageContainer, type PageContainerProps } from "@/components/layout/PageContainer";

type PageSectionProps = Omit<PageContainerProps, "as"> & {
  as?: "section" | "article";
};

export function PageSection({ as = "section", children, className }: PageSectionProps) {
  return (
    <PageContainer as={as} className={className}>
      {children}
    </PageContainer>
  );
}
