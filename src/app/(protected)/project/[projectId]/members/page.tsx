import { getProjectMembers } from '@/lib/actions/projectActions';
import Header from '../../_components/Header';
import PageWrapper from '../../_components/PageWrapper';
import MembersTable from './MembersTable';
import ErrorScreen from '@/app/(protected)/_components/ErrorScreen';

export default async function Members({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const result = await getProjectMembers(projectId);

  if (!result.success)
    return (
      <ErrorScreen
        message={`We're having trouble retrieving your
 project members right now. Please try
again in a moment.`}
        buttonElement={true}
      />
    );
  return (
    <PageWrapper>
      <Header
        desktopTitle="Project Members"
        buttonLabel="Invite Member"
        materialIcon="person_add"
        mobileTitle="Project Members"
        mobileStyles="text-center"
      />
      <MembersTable data={result.data} />
    </PageWrapper>
  );
}
