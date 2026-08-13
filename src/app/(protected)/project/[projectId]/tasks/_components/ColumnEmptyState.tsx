 const emptyStateText: Record<string, string> = {
    'TO DO': 'No upcoming tasks',
    'IN PROGRESS': 'Nothing in progress',
    'BLOCKED': 'Nothing blocked',
    'IN REVIEW': 'Nothing in review',
    'READY FOR QA': 'Nothing ready for QA',
    'REOPENED': 'Nothing reopened',
    'READY FOR PRODUCTION': 'Nothing ready for production',
    'DONE': 'Nothing done',
  };


export default function ColumnEmptyState({statusColor, statusForDisplay}: {statusColor: string, statusForDisplay: string}){
    return <div className="border-dashed-custom flex flex-col justify-center items-center flex-1 min-h-0 w-full bg-surface-low">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: `${statusColor}1A` }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '16px', color: statusColor }}
            >
              inbox
            </span>
          </div>
          <h3 className="body-lg-medium">{emptyStateText[statusForDisplay]}</h3>
          <p className="hint">Drag a task here or add one below</p>
        </div>
}