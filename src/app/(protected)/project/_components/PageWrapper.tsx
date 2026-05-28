type PageWrapperProps = {
  children: React.ReactNode;
  additionalStyles?: string;
};
export default function PageWrapper({
  children,
  additionalStyles,
}: PageWrapperProps) {
  return (
    <div
      className={`font-sans px-6 pt-8 md:px-8 md:pt-6 mb-30 min-h-screen ${additionalStyles}`}
    >
      {children}
    </div>
  );
}
