import LoadingTaskCard from "./LoadingTaskCard"

export default function ColumnLoadingState(){
    return  <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingTaskCard key={i} />
              ))}
            </ul>
}