import Initials from '@/components/Initials';
import Pill from './_components/Pill';
import type { MemberData } from '@/lib/types';
import AddMemberButton from './_components/AddMemberButton';

type MembersTableProps = {
  data: MemberData[];
};

export default function MembersTable({ data }: MembersTableProps) {
  const tableHeaderStyles = `py-5 px-8 label-sm text-[#434654]`;

  const memberElementsDesktop = data.map((member: MemberData) => (
    <tr key={member.member_id}>
      <td className="px-8 py-5 align-middle">
        <div className="flex items-center gap-4">
          <Initials
            mode="desktop"
            name={member.metadata.name}
            extraStyles="w-[48px] h-[48px] flex items-center justify-center rounded-lg text-[14px] font-bold text-[#003D9B]"
            state="success"
          />
          <div className="flex flex-col">
            <h3 className="body-sm">{member.metadata.name}</h3>
            <h3 className="caption-xs">{member.metadata.email}</h3>
          </div>
        </div>
      </td>
      <td className="px-8 py-5 align-middle">
        <Pill
          mode="desktop"
          role={member.role}
          extraStyles="rounded-lg"
          state="success"
        />
      </td>
      <td className="align-middle px-8  py-5 text-right">
        <div className="flex justify-end">
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </td>
    </tr>
  ));

  const memeberElementsMobile = data.map((member: MemberData) => (
    <li
      key={member.member_id}
      className="flex items-center justify-between bg-white rounded-lg p-4"
    >
      <div className="flex gap-4">
        <Initials
          mode="mobile"
          state="success"
          name={member.metadata.name}
          extraStyles="w-10 h-10 rounded-lg bg-[#D7E2FF] flex items-center justify-center text-[16px] font-bold text-[#003D9B]"
        />
        <div>
          <h3 className="body-sm">{member.metadata.name}</h3>
          <p className="caption-xs">{member.metadata.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Pill
          mode="mobile"
          state="success"
          role={member.role}
          extraStyles="text-[10px] font-bold tracking-[-0.25px] uppercase text-[#434654] bg-[#D7E2FF] rounded-[2px] px-2 py-1"
        />
        <div className="flex justify-end">
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <table className="hidden md:table table-fixed w-full rounded-md overflow-hidden p-1 shadow-sm bg-white">
        <thead className="bg-[#E0E8FF4D] w-full h-[54px]">
          <tr>
            <th className={`w-[388px] ${tableHeaderStyles} text-left`}>
              MEMBER
            </th>
            <th className={`w-[187px] ${tableHeaderStyles} text-left`}>ROLE</th>
            <th className={`w-[169px] ${tableHeaderStyles} text-right`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E8EDFF]">
          {memberElementsDesktop}
        </tbody>
      </table>

      <ul className="md:hidden mb-8">{memeberElementsMobile}</ul>
      <div className="md:hidden flex justify-end">
        <AddMemberButton state="success" loadingStyle={''} />
      </div>
    </>
  );
}
