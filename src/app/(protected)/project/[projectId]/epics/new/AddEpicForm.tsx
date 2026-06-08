'use client';
import addNewEpic from '@/lib/actions/epicActions';
import type { MemberData } from '@/lib/types/index';
import { EpicSchema, type EpicFormData } from '@/validations/epic.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type AddEpicFormProps = {
  projectId: string;
  members: MemberData[];
};

export default function AddEpicForm({ projectId, members }: AddEpicFormProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const {
    register,
    setError,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<EpicFormData>({
    resolver: zodResolver(EpicSchema),
    mode: 'onChange',
  });

  const descriptionLength = watch('description')?.length ?? 0;

  async function onSubmit(data: EpicFormData) {
    const result = await addNewEpic({
      title: data.title,
      description: data.description || undefined,
      assignee_id: data.assignee_id || undefined,
      project_id: projectId,
      deadline: data.deadline || undefined,
    });

    if (!result.success) {
      setError('root', {
        message: result.message,
      });
      return;
    }
    setSuccessMsg(result.message);
    setIsRedirecting(true);
    setTimeout(() => router.push(`/project/${projectId}/epics`), 300);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:bg-white md:shadow-card md:p-8 rounded-md border-[#C3C6D61A] font-sans flex flex-col gap-6 md:gap-8"
    >
      {successMsg.length > 0 && (
        <div className="fixed bottom-5 right-5 md:max-w-sm px-4 py-3 md:bottom-6 md:right-6 max-md:bottom-16 max-md:right-0 max-md:mx-3 max-md:rounded-lg max-md:left-0 max-md:max-w-full bg-[#82F9BE]/30 text-[#005235]  border border-green-500 flex items-center justify-center rounded-lg gap-2">
          <h3>{successMsg}</h3>
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
        <label
          htmlFor="title"
          className="w-[120px] shrink-0 uppercase label-sm text-slate-500"
        >
          Title<span className="text-[#BA1A1A] ml-1">*</span>
        </label>
        <div className="w-full">
          <input
            {...register('title')}
            id="title"
            type="text"
            className="border body-lg w-full px-4 py-3 bg-surface-highest border-transparent placeholder:text-[#43465466] rounded-[4px] focus:outline-none focus:border-primary-container mb-[7.5px]"
            placeholder="e.g. Structural Foundation Phase"
          />
          <span className="md:hidden hint">Minimum 3 characters required.</span>
          {errors.title && (
            <div
              role="alert"
              className="error-sm inline-flex items-center gap-[3px]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
              >
                info
              </span>
              Title is required (minimum 3 characters)
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-6 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="w-[120px] shrink-0 uppercase label-sm text-slate-500"
          >
            Description
          </label>
          <span className="hidden md:inline hint opacity-50">Optional</span>
        </div>
        <div className="flex flex-col w-full">
          <textarea
            {...register('description')}
            id="description"
            className={`body-lg pt-[12px] pr-[16px] pb-[84px] pl-[16px] border border-transparent placeholder:text-[#43465466] rounded-[4px] focus:outline-none focus:border-primary-container resize-none md:mb-[6px] ${errors.description ? 'bg-[#FFDAD6]' : 'bg-surface-highest'}`}
            placeholder="Describe the scope and objectives of this epic..."
          />
          <span
            className={` ${errors.description ? 'error-sm' : 'text-[10px] text-[#43465499]'} md:inline-flex justify-end font-medium lowercase hidden`}
          >{`${descriptionLength} / 500 characters`}</span>
          {errors.description && (
            <div
              role="alert"
              className="error-sm inline-flex items-center gap-[3px]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
              >
                info
              </span>
              {errors.description.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:justify-between w-full">
        <div className="flex flex-col gap-2 md:gap-3 w-full md:w-1/2">
          <label htmlFor="assignee" className="label-sm text-slate-500">
            Assignee
          </label>
          <div className="relative">
            <select
              {...register('assignee_id')}
              id="assignee"
              className="body-lg rounded-sm bg-surface-highest p-3 w-full focus:outline-none focus:border-primary-container border border-transparent cursor-pointer appearance-none"
            >
              <option className="body-lg text-salte-900" value="">
                Select a member...
              </option>
              {members.map((member) => (
                <option key={member.user_id} value={member.user_id}>
                  {member.metadata.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-900 pointer-events-none">
              expand_more
            </span>
            {errors.assignee_id && (
              <div
                role="alert"
                className="error-sm inline-flex items-center gap-[3px]"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '14px' }}
                >
                  info
                </span>
                {errors.assignee_id.message}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-3 w-full md:w-1/2">
          <label htmlFor="deadline" className="label-sm text-slate-500">
            Deadline
          </label>
          <input
            type="date"
            {...register('deadline')}
            id="deadline"
            className="body-lg bg-surface-highest rounded-sm p-3 focus:outline-none
                    focus:border-primary-container border border-transparent cursor-pointer 
                    [&::-webkit-calendar-picker-indicator]:hidden"
          />
          {errors.deadline && (
            <div
              role="alert"
              className="error-sm inline-flex items-center gap-[3px]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '14px' }}
              >
                info
              </span>
              {errors.deadline.message}
            </div>
          )}
        </div>
      </div>
      {errors.root && (
        <div className="error-sm inline-flex items-center gap-[3px]">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: '14px' }}
          >
            info
          </span>
          {errors.root.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-end gap-3 md:gap-4 pt-[24px]">
        <button
          onClick={() => router.push(`/project/${projectId}/epics`)}
          type="button"
          className="order-2 md:order-1 cursor-pointer px-8 py-3 hover:text-[#9a9b9e]"
        >
          Cancel
        </button>
        <button
          disabled={isSubmitting || isRedirecting}
          type="submit"
          className="order-1 md:order-2 btn-primary inline-flex shadow-btn-primary cursor-pointer bg-radial from-[#003D9B] to-[#0052CC] hover:from-[#1259cb] hover:to-[#0657d1] transition-colors disabled:opacity-50"
        >
          {isSubmitting
            ? 'Loading...'
            : isRedirecting
              ? 'Redirecting...'
              : 'Create Epic'}
        </button>
      </div>
    </form>
  );
}
