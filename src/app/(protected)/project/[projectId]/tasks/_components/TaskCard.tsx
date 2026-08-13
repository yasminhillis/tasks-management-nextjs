import Initials from '@/components/Initials';

type TaskCardProps = {
  title: string;
  assigneeName: string;
  dueDate: string;
  status: string;
};

function formatDate(dateString: string): { label: string; message: string } {
  if (dateString === '')
    return { label: 'No Deadline specified', message: 'no deadline' };

  const date = new Date(dateString);

  const formatted = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return { label: formatted.toUpperCase(), message: 'formatted successfully' };
}

function displayDate(date: string) {
  if (formatDate(date).label === 'No Deadline specified')
    return {
      label: 'No Deadline specified',
      status: 'none',
      textClass: 'caption-xs-medium',
    };
  const today = new Date();
  const dueDate = new Date(date);

  const dayToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const dueDay = new Date(
    dueDate.getFullYear(),
    dueDate.getMonth(),
    dueDate.getDate()
  );

  if (dayToday.getTime() === dueDay.getTime()) {
    return { label: 'Today', status: 'today', textClass: 'caption-xs-muted' };
  }

  if (dueDay < dayToday) {
    return {
      label: 'Delayed',
      status: 'delayed',
      textClass: 'caption-xs-muted',
    };
  }

  return {
    label: formatDate(date).label,
    status: 'upcoming',
    textClass: 'caption-xs-muted',
  };
}

export default function TaskCard({
  title,
  assigneeName,
  dueDate,
  status,
}: TaskCardProps) {
  const dateInfo = displayDate(dueDate);

  return (    
    <div className={`flex flex-col relative gap-4 rounded-md p-4 border border-[#C3C6D61A] shadow-card-subtle ${status === "BLOCKED" ? 'bg-[#FFDAD633] border border-[#BA1A1A1A]/10' : 'bg-white w-[288px]'}`}>
      {status === 'IN PROGRESS' && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg border-l border-l-4 border-l-[#003D9B]"
          
        />
      )}
      <h3 className="body-md-medium word-break">{title}</h3>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <span
            className="material-symbols-outlined leading-none"
            style={{
              fontSize: '14px',
              color:
                dateInfo.status === 'delayed'
                  ? '#BA1A1A'
                  : dateInfo.status === 'today'
                    ? '#003D9B'
                    : '#94A3B8',
            }}
          >
            {dateInfo.status === 'delayed' ? 'warning' : 'calendar_today'}
          </span>
          <h3
            className={`mb-0 leading-none ${dateInfo.textClass} ${dateInfo.status === 'delayed' ? 'text-[#BA1A1A]' : dateInfo.status === 'today' ? 'text-[#003D9B]' : 'text-[#94A3B8]'}`}
          >
            {dateInfo.label}
          </h3>
        </div>

        {assigneeName === 'Unassigned' ? (
          <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#E0E8FF]">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '15px' }}
            >
              person_off
            </span>
          </div>
        ) : (
          <Initials
            name={assigneeName}
            mode="desktop"
            state="success"
            extraStyles="rounded-full caption-xs-dark w-[22px] h-[22px] bg-[#0052CC] text-white"
          />
        )}
      </div>
    </div>
  );
}
