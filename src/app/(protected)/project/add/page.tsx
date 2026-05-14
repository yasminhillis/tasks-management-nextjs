import AddProjectForm from './AddProjectForm';

export default function AddProject() {
  return (
    <div className="font-sans px-6 pt-8 md:px-8 md:pt-6 mb-30 min-h-screen">
      <div className="md:hidden mb-8">
        <h2 className="md:hidden text-[#041B3C] font-semibold text-2xl mb-1">
          Initialize New Project
        </h2>
        <p className="text-[#4F5F7B] text-sm">
          Define the scope and foundational details of your project.
        </p>
      </div>
      <div className="hidden md:block md:flex items-center justify-between mb-10">
        <h2 className="hidden md:block font-semibold md:text-4xl text-[#041B3C]">
          Add New Project
        </h2>
        <button className="hidden md:block md:flex items-center gap-2 px-6 py-3 shadow-[0_4px_6px_-4px_rgba(0,61,155,0.2),0_10px_15px_-3px_rgba(0,61,155,0.2)] bg-radial from-[#003D9B] to-[#0052CC] text-white text-sm cursor-pointer hover:from-[#1259cb] hover:to-[#0657d1] transition-colors font-bold">
          <span className="material-symbols-outlined">person_add</span>
          Invite Member
        </button>
      </div>
      <AddProjectForm />
    </div>
  );
}
