import Initials from '@/components/Initials';
import Pill from './_components/Pill';
import type { MemberRole } from '@/lib/types';

type MembersMetaData = {
  sub: string;
  name: string;
  email: string;
  department?: string;
  email_verified: boolean;
};

type MembersData = {
  email: string;
  member_id: string;
  metadata: MembersMetaData;
  project_id: string;
  role: MemberRole;
  user_id: string;
};

type MembersTableProps = {
  data: MembersData[];
};
export default function MembersTable({ data }: MembersTableProps) {
  const tableHeaderStyles = `py-5 px-8 label-sm text-[#434654]`;

  const memberElements = data.map((member: MembersData) => (
    <tr key={member.member_id}>
      <td className="px-8 py-5 align-middle">
        <div className="flex items-center gap-4">
          <Initials
            name={member.metadata.name}
            extraStyles="w-[48px] h-[48px] flex items-center justify-center rounded-lg text-[14px] font-bold text-[#003D9B]"
          />
          <div className="flex flex-col">
            <h3 className="body-sm">{member.metadata.name}</h3>
            <h3 className="caption-xs">{member.metadata.email}</h3>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 align-middle">
        <Pill role={member.role} />
      </td>
      <td className="align-middle px-8  py-5 text-right">
        <div className="flex justify-end">
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </td>
    </tr>
  ));

  return (
    <table className="table-fixed w-full rounded-md overflow-hidden p-1 shadow-sm bg-white">
      <thead className="bg-[#E0E8FF4D] w-full h-[54px]">
        <tr>
          <th className={`w-[388px] ${tableHeaderStyles} text-left`}>MEMBER</th>
          <th className={`w-[187px] ${tableHeaderStyles} text-left`}>ROLE</th>
          <th className={`w-[169px] ${tableHeaderStyles} text-right`}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#E8EDFF]">{memberElements}</tbody>
    </table>
  );
}
