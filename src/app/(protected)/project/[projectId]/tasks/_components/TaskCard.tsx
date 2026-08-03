import Initials from '@/components/Initials';

type TaskCardProps = {
  title: string;
  assigneeName: string;
  dueDate: string;
};

function formatDate(dateString: string) {
  if (dateString === '') return 'No Deadline specified'
  
  const date = new Date(dateString);

  const formatted = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  return formatted
}


// function displayDate(date: string){
//     const dateTodat = 
//     if () {

//     }
// }

export default function TaskCard({ title, assigneeName, dueDate }: TaskCardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white w-[288px] rounded-md p-4 border border-[#C3C6D61A] shadow-card-subtle">
      <h3 className="body-md-medium">{title}</h3>
      <div className="flex justify-between items-center">
        <h3 className="caption-xs-muted">{formatDate(dueDate)}</h3>

        { assigneeName === 'Unassigned' ? 
        (
          <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#E0E8FF]">
            <span className="material-symbols-outlined" style={{'fontSize': '15px'}}>person_off</span>
          </div>
        )
        :<Initials
          name={assigneeName}
          mode="desktop"
          state="success"
          extraStyles="rounded-full caption-xs-dark w-[22px] h-[22px] bg-[#0052CC] text-white"
        />}
      </div>
    </div>
  );
}
