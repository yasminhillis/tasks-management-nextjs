import { formatDate } from "@/app/(protected)/_utils/formatDate"
import TaskCard from "./TaskCard"
import type { Task } from "@/lib/types"

export default function ColumnPopulatedState({tasks, statusForDisplay}: {tasks: Task[], statusForDisplay: string}){
    return <ul className="flex flex-col gap-3 flex-1 overflow-y-auto overflow-x-hidden min-h-0 mb-3 scrollbar">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  assigneeName={task.assignee?.name ?? 'Unassigned'}
                  dueDate={task.due_date ? formatDate(task.due_date) : ''}
                  status={statusForDisplay}
                />
              ))}
            </ul>
}