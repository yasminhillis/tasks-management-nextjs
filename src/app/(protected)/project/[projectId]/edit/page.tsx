import { getProjectById } from '@/lib/actions/projectActions';
import ProjectForm from '../../_components/ProjectForm';

export default async function AddProjectForm({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const { data } = await getProjectById(projectId);

  return (
    <div className="font-sans px-6 pt-8 md:px-8 md:pt-6 mb-30 min-h-screen">
      <div className="md:hidden mb-8">
        <h2 className="md:hidden text-[#041B3C] font-semibold text-2xl mb-1">
          Edit Project
        </h2>
        <p className="text-[#4F5F7B] text-sm">
          Define the scope and foundational details of your project.
        </p>
      </div>
      <div className="hidden md:block md:flex items-center justify-between mb-10">
        <h2 className="hidden md:block font-semibold md:text-4xl text-[#041B3C]">
          Edit Project
        </h2>
        <button className="hidden md:block md:flex items-center gap-2 px-6 py-3 shadow-blue-md bg-radial from-[#003D9B] to-[#0052CC] text-white text-sm cursor-pointer hover:from-[#1259cb] hover:to-[#0657d1] transition-colors font-bold">
          <span className="material-symbols-outlined">person_add</span>
          Invite Member
        </button>
      </div>
      <ProjectForm mode="edit" projectId={projectId} initialData={data} />
    </div>
  );
}
