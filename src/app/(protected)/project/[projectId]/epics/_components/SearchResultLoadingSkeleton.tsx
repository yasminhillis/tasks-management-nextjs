import EpicCardSkeleton from "../EpicCardSkeleton"

export default function SearchResultLoadingSkeleton(){
    return <div className="grid sm:grid-cols-2 md:grid-cols-2 justify-items-center gap-6 mb-6 md:mb-10">
              {[...Array(6)].map((_, i) => (
                <EpicCardSkeleton key={i} />
              ))}
            </div>
}