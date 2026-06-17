import AddEpicForm from './AddEpicForm';
import PageWrapper from '../../../_components/PageWrapper';
import { getProjectMembers } from '@/lib/actions/projectMembersActions';

export default async function AddNewEpic({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const projectMembers = await getProjectMembers(projectId);

  return (
    <>
      <PageWrapper>
        <h1 className="display-md mb-2">Create New Epic</h1>
        <p className="hidden md:block body-lg mb-8 max-w-[472px]">
          Define a major project phase or high-level milestone to group related
          tasks and track architectural progress.
        </p>
        <p className="md:hidden body-md mb-[24px]">
          Define a high-level goal and organizational structure for your
          architectural phase.
        </p>
        <AddEpicForm members={projectMembers.data} projectId={projectId} />
      </PageWrapper>
    </>
  );
}
