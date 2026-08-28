import Initials from '@/components/Initials';
import { shimmer } from '../../../_components/loadingStyle';

export default function ListTableLoadingState() {
  return (
    <table className="rounded-lg shadow-card w-full">
      <thead className="bg-[#F1F3FF80] border-b border-b-[#C3C6D61A] h-[47px] w-full">
        <tr className="text-left">
          <th className="table-header-label w-[175px] px-6 py-[18.5px]">
            Task ID
          </th>
          <th className="table-header-label w-[354px] px-6 py-[18.5px]">
            Title
          </th>
          <th className="table-header-label px-6 py-[18.5px] text-left">
            Status
          </th>
          <th className="table-header-label px-6 py-[18.5px]">Due Date</th>
          <th className="table-header-label px-6 py-[18.5px]">Assignee</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, i) => (
          <tr key={i} className="border-t border-t-[#F1F3FF]">
            <td className="table-cell-id px-6 py-[18.5px]">
              <div className={`${shimmer} w-[55px] h-[16px]`}></div>
            </td>
            <td className="table-cell-title px-6 py-[18.5px]">
              <div className={`${shimmer} w-[291px] h-[17px]`}></div>
            </td>
            <td className="w-[137px] px-6 py-[18.5px]">
              <div
                className={`table-status-badge status-pill`}
                style={{}}
              >
                <div className={`${shimmer} w-[50px] h-[22px]`}>

                </div>
              </div>
            </td>
            <td className="table-cell-date w-[139px] px-6 py-[18.5px] whitespace-nowrap">
              <div className={`${shimmer} w-[83px] h-[17px]`}></div>
            </td>
            <td className="table-cell-assignee w-[163px] px-6 py-[18.5px] whitespace-nowrap">
              <div className="flex items-center gap-3">
                <Initials
                  name={''}
                  mode="desktop"
                  state="loading"
                  extraStyles="w-[28px] h-[28px] task-card-avatar rounded-full"
                />
                <h4 className="table-cell-assignee">
                  <div className={`${shimmer} w-[63px] h-[17px]`}></div>
                </h4>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
