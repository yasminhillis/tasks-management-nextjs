import Initials from '@/components/Initials';
import Pill from './_components/Pill';
import PageWrapper from '../../_components/PageWrapper';
import Header from '../../_components/Header';
import AddMemberButton from './_components/AddMemberButton';
export default function Loading() {
  //    const AddMembers = ({state, loadingStyle}: {state: 'success' | 'loading', loadingStyle: string}) => {
  //     return <button className={`${state === "loading" ? `${loadingStyle} w-[40px] h-[40px]` : `btn-primary px-[24px] py-[12px] rounded-[10px] w-[40px] h-[40px] cursor-pointer`}`}>
  //      { state === 'success' && <span className='material-symbols-outlined'>
  //         person_add
  //       </span>}
  //     </button>
  //   };

  const loadingStyle = `relative overflow-hidden bg-[#E8EDFF] rounded-md
                      before:absolute before:inset-0
                      before:translate-x-[-100%]
                      before:animate-[shimmer_1.8s_infinite]
                      before:bg-gradient-to-r
                      before:from-transparent
                      before:via-white/60
                      before:to-transparent`;

  const memeberElementsMobile = [...Array(4)].map((_, i) => (
    <li
      key={i}
      className="flex items-center justify-between bg-white rounded-lg p-4 mb-3"
    >
      <div className="flex gap-4 items-center">
        <Initials
          mode="mobile"
          state="loading"
          name=""
          extraStyles={`w-10 h-10 rounded-lg bg-[#D7E2FF] flex items-center justify-center ${loadingStyle}`}
        />
        <div className="flex flex-col gap-2">
          <h3 className={`w-[105px] h-[15px] ${loadingStyle}`}></h3>
          <p className={`w-[85px] h-[10px] ${loadingStyle}`}></p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Pill mode="mobile" state="loading" role="" />
        <div className="flex justify-end">
          <span className={`w-[20px] h-[20px] ${loadingStyle}`}></span>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <PageWrapper>
        <Header
          desktopTitle="Project Members"
          buttonLabel="Invite Member"
          materialIcon="person_add"
          mobileTitle="Project Members"
          mobileStyles="text-center"
        />
        <table className="hidden md:table bg-white px-6 py-4 table-fixed shadow-sm w-full">
          <thead>
            <tr className="align-middle h-[54px] border-b-[#E8EDFF80]">
              <th className="p-2 align-middle">
                <div
                  className={`w-[96px] h-[12px] ${loadingStyle} mx-auto`}
                ></div>
              </th>
              <th>
                <div
                  className={`w-[96px] h-[12px] ${loadingStyle}   mx-auto`}
                ></div>
              </th>
              <th className="">
                <div
                  className={`w-[64px] h-[12px] ${loadingStyle} mx-auto`}
                ></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EDFF4D]">
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td className="px-8 py-4 align-middle">
                  <div className="flex gap-[24px] items-center">
                    <Initials state="loading" name="" mode="desktop" />
                    <div
                      className={`${loadingStyle} w-[192px] h-[20px] rounded-[2px]`}
                    ></div>
                  </div>
                </td>
                <td className="px-8 py-4 align-middle text-center">
                  <div className="flex justify-center">
                    <Pill
                      role=""
                      extraStyles=""
                      mode="desktop"
                      state="loading"
                    />
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    <span
                      className={`${loadingStyle} w-[24px] h-[24px] rounded-[2px]`}
                    ></span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="md:hidden">{memeberElementsMobile}</ul>
        <div className="md:hidden flex justify-end">
          <AddMemberButton state="loading" loadingStyle={loadingStyle} />
        </div>
      </PageWrapper>
    </>
  );
}
