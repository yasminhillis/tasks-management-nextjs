import LoadingTaskCard from "./LoadingTaskCard"

export default function ColumnLoadingState(){
    return  <ul className="flex flex-col gap-3 flex-1 min-h-0 mb-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingTaskCard key={i} />
              ))}
            </ul>
}