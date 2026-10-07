import Header from './_components/Header';
import LoadingCard from './_components/LoadingCard';

export default function ProjectLoading() {
  return (
    <>
      <Header loading/>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-[24px] max-h-[524px]">
        {[...Array(6)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </>
  );
}
