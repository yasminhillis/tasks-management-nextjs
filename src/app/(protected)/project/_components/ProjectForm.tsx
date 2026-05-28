'use client';
import type { ADDProjectFormData } from '@/validations/project.schema';
import { ProjectSchema } from '@/validations/project.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from '@/lib/actions/projectActions';

type ProjectFormProps = {
  mode: 'edit' | 'add';
  initialData?: { name: string; description: string };
  projectId?: string;
};

export default function ProjectForm({
  mode,
  initialData,
  projectId,
}: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
  } = useForm<ADDProjectFormData>({
    resolver: zodResolver(ProjectSchema),
    mode: 'onChange',
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
    },
  });

  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  // const [isEditSuccessful, setIsEditSuccessful] = useState(false);
  const descriptionLength: number | undefined = watch('description')?.length;
  const router = useRouter();

  useEffect(() => {
    if (!isRequestSuccessful) return;
    const timer = setTimeout(() => setIsRequestSuccessful(false), 3000);
    return () => clearTimeout(timer);
  }, [isRequestSuccessful]);

  async function onSubmit(data: ADDProjectFormData) {
    if (mode === 'edit') {
      const result = await updateProject(projectId!, data);
      if (!result.success) {
        setError('root', { message: result.message });
        return;
      }
      setIsRequestSuccessful(true);
    } else {
      try {
        const res = await fetch('/api/projects', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const error = await res.json();
          setError('root', {
            message: error.message,
          });
          return;
        }
        setIsRequestSuccessful(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          setError('root', {
            message: 'Please check your connection and try again',
          });
        } else {
          setError('root', {
            message: 'Something went wrong. Please try again',
          });
        }
      }
    }
  }

  return (
    <div className="max-w-[672px] max-h-[696px] mx-auto shadow-sm rounded-md">
      {isRequestSuccessful && (
        <div className="fixed bottom-5 right-5 max-w-sm px-4 py-3 md:bottom-6 md:right-6 max-md:bottom-16 max-md:right-0 max-md:mx-3 max-md:rounded-lg max-md:left-0 max-md:max-w-full bg-[#82F9BE]/30 text-[#005235]  border border-green-500 flex items-center justify-center rounded-lg gap-2">
          <h3>
            {mode === 'add'
              ? 'Project Added Successfully!'
              : 'Your changes are saved successfully'}
          </h3>
        </div>
      )}
      <header className="hidden md:block bg-white shadow-sm pt-8 pl-8 pb-10 pr-8 border-b border-b-[#F1F3FF]">
        <div className="flex items-center gap-4 ">
          <div className="flex items-center justify-center w-[46px] h-[44px] bg-[#0052CC1A] rounded-sm">
            <span className="material-symbols-outlined text-[#0052CC]">
              add_task
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-2xl text-[#041B3C]">
              {mode === 'add' ? 'Initialize New Project' : 'Edit Project'}
            </h3>
            <p className="text-sm text-[#4F5F7B]">
              Define the scope and foundational details of your project.
            </p>
          </div>
        </div>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:pt-8 md:pl-8 md:pb-4 md:pr-8 md:bg-white"
      >
        {errors?.root && (
          <div className="flex items-center gap-1 text-[#BA1A1A] pb-2 font-medium text-sm mb-3">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '14px' }}
            >
              error
            </span>
            {errors.root.message}
          </div>
        )}
        <div className="flex flex-col mb-6 space-y-3">
          <label
            htmlFor="name"
            className="uppercase text-[11px] font-bold leading-[0.55px] flex gap-1 text-[#4F5F7B] "
          >
            Project TITLE
            <span className="text-[#BA1A1A]">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`text-[#041B3C] overflow-scroll h-full p-4 md:px-4 md:py-3 w-full rounded-md md:rounded-sm
                focus:outline-none border border-transparent focus:border-primary-container ${errors.name ? 'bg-[#FFDAD6]' : 'bg-[#D7E2FF]'} ${errors.name ? 'border border-red-500 focus:outline-none focus:border-red-500' : 'focus:outline-none border border-transparent'}`}
          />
          {errors?.name && (
            <div
              role="alert"
              id="name-error"
              className="flex items-center gap-1 text-[#BA1A1A] font-medium text-xs"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
              >
                error
              </span>
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center justify-between">
            <label
              htmlFor="description"
              className="uppercase text-[#434654] font-bold text-[11px] leading-[0.55px]"
            >
              Description
            </label>
            <span className="hidden md:block text-[#4F5F7B99] text-[11px]">
              Optional
            </span>
          </div>
          <textarea
            {...register('description')}
            id="description"
            aria-describedby={
              errors.description ? 'description-error' : undefined
            }
            placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
            className="bg-[#D7E2FF] resize-none overflow-hidden pt-4 pr-4 pb-22 pl-4 rounded-md placeholder:text-[#4F5F7B80] border border-transparent focus:outline-none focus:border focus:border-primary-container"
          ></textarea>
          <span
            className={`flex justify-end text-[11px] font-medium ${descriptionLength && descriptionLength > 500 ? 'text-red-500' : 'text-[#4F5F7B]'}`}
          >
            {`${descriptionLength ?? 0} / 500 `}
            <span className="hidden md:block">&nbsp; characters</span>
          </span>
          {errors?.description && (
            <div
              role="alert"
              id="description-error"
              className="flex items-center gap-1 text-[#BA1A1A] font-medium text-xs"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
              >
                error
              </span>
              {errors.description.message}
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row md:justify-between">
          <button
            disabled={isSubmitting}
            type="submit"
            className="order-1 md:order-2 text-white px-6 py-4 w-full md:max-w-[161px] rounded-md md:rounded-sm bg-radial from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors shadow-btn-primary cursor-pointer disabled:opacity-50"
          >
            {isSubmitting
              ? 'Loading...'
              : mode === 'add'
                ? 'Create Project'
                : 'Save Changes'}
          </button>
          <button
            onClick={() => router.push('/project')}
            type="button"
            className="order-1 md:order-1 px-6 py-4 md:py-3 md:max-w-[96px] font-medium text-[#003D9B] w-full cursor-pointer hover:text-[#2b76e8] transition-colors"
          >
            {mode === 'add' ? 'Back' : 'Cancel'}
          </button>
        </div>
      </form>

      <div className="bg-[#F1F3FF] p-6 rounded-md md:hidden">
        <h3 className="mb-2 text-[#4F5F7B] text-xs font-bold">Pro Tip</h3>
        <p className="text-[#4F5F7B] text-xs">
          You can invite project members and assign epics immediately after the
          initial creation process.
        </p>
      </div>

      <div className="bg-[#F1F3FF] rounded-md p-6 hidden md:block">
        <div className="flex items-center gap-[2px]">
          <span
            className="material-symbols-outlined text-[#4F5F7B] shrink-0"
            style={{ fontSize: '17px' }}
          >
            lightbulb
          </span>
          <p className="text-[#4F5F7B] text-xs font-bold">
            Pro Tip:&nbsp;
            <span className="font-normal">
              You can invite project members and assign epics immediately after
              the initial creation process.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
