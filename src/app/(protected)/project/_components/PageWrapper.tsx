type PageWrapperProps = {
  children: React.ReactNode;
  additionalStyles?: string;
  fillHeight?: boolean;
};
export default function PageWrapper({
  children,
  additionalStyles,
  fillHeight = false
}: PageWrapperProps) {
  return (
    <div
      className={`font-sans px-6 pt-8 md:px-8 md:pt-6 ${
        fillHeight ? 'flex flex-col h-full min-h-0' : 'mb-30'
      } ${additionalStyles}`}
    >
      {children}
    </div>
  );
}
