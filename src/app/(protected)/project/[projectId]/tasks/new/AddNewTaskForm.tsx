'use client';
import { FormSelect } from '@/components/ui/FormSelect';
import { addNewTask } from '@/lib/actions/taskActions';
import { AddTaskSchema } from '@/validations/add.task.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import type { AddTaskFormData } from '@/validations/add.task.schema';
import { Status } from '@/lib/types/index';
import Toast from '@/components/Toast';
import { useToast } from '@/lib/hooks/useToast';
import { getProjectMembers } from '@/lib/actions/projectMembersActions';
import { useEffect, useState } from 'react';
import type { MemberData } from '@/lib/types/index';
import { DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { Epic } from '@/lib/types/index';
import { components, OptionProps, SingleValueProps } from 'react-select';
import CardIdBadge from '../../../_components/CardBadge';
import { useRouter } from 'next/navigation';

export default function AddNewTaskForm({
  projectId,
  status,
  epicId,
}: {
  projectId: string;
  status?: Status;
  epicId?: string;
}) {
  const { message, success, showToast } = useToast();
  const [members, setMemebers] = useState<MemberData[]>([]);
  const [epics, setEpics] = useState<Epic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const router = useRouter()

  async function getMemebers() {
    const result = await getProjectMembers(projectId);
    if (!result.success) {
      showToast(result.message, false, 1500);
      return;
    }
    setMemebers(result.data);
  }

  type EpicOptions = {
    label: string;
    value: string;
  };

  const DisplayEpic = ({ data }: { data: EpicOptions }) => {
    const displayId = data.label.split(' ')[0];
    const title = data.label.split(' ').slice(1);
    return (
      <div className="flex items-center gap-2">
        <CardIdBadge
          id={displayId}
          extraStyles="px-[8px] py-[4px] md:px-[6px] md:py-[3px]"
        />
        {title}
      </div>
    );
  };

  const EpicOption = ({ data }: { data: EpicOptions }) => {
    return <DisplayEpic data={data} />;
  };

  const customEpicOption = (props: OptionProps<EpicOptions>) => {
    return (
      <components.Option {...props}>
        <EpicOption data={props.data} />
      </components.Option>
    );
  };

  const customSingleValue = (props: SingleValueProps<EpicOptions>) => {
    return (
      <components.SingleValue {...props}>
        <DisplayEpic data={props.data} />
      </components.SingleValue>
    );
  };

  async function fetchEpics(page: number, limit = 5) {
    if (isLoading) return;
    setIsLoading(true);
    console.log(page, 'PAGE');

    const offset = (page - 1) * limit;
    const res = await fetch(
      `/api/epics?projectId=${projectId}&limit=${limit}&offset=${offset}&order=created_at.asc`
    );
    if (!res.ok) {
      const error = await res.json();
      // setError()
      return;
    }
    const { data } = await res.json();

    setEpics((prev) => {
      const existingIds = new Set(prev.map((epic: Epic) => epic.id));
      const newEpics = data.filter((epic: Epic) => !existingIds.has(epic.id));
      return [...prev, ...newEpics];
    });
    setIsLoading(false);
  }

  async function fetchEpicById(epicId: string | undefined) {    
    const res = await fetch(`/api/epics/${epicId}?projectId=${projectId}`);
    if (!res.ok) return;
    const { epic } = await res.json();
    
    setEpics((prev) => {
      if (prev.some((item) => item.id === epic.id)) {
        return prev;
      }
      return [...prev, epic];
    });
  }

  useEffect(() => {
    getMemebers();
    fetchEpics(page);
    fetchEpicById(epicId)    
  }, [projectId, page, epicId]);

  const assigneeOptions = members.map((member: MemberData) => ({
    value: member.user_id,
    label: member.metadata.name,
  }));

  const epicOptions = epics.map((epic) => ({
    label: `${epic.epic_id} ${epic.title}`,
    value: epic.id,
  }));

  function formateEpicTitle(title: string) {
    return title.length > 100 ? title.slice(0, 100) + '...' : title;
  }

  const statusOptions = Object.values(Status).map((statusOption) => ({
    value: statusOption,
    label: statusOption.replace(/_/g, ' '),
  }));

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(AddTaskSchema),
    defaultValues: {
      status: status ? status : Status.TO_DO,
      epic_id: epicId ? epicId : '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: AddTaskFormData) {
    try {
      const result = await addNewTask({
        ...data,
        project_id: projectId,
        due_date: data.due_date ? data.due_date.toISOString() : null,
      });
      if (!result.success) {
        showToast(result.message, false, 1500);
        return;
      }
      showToast(result.message, true, 1500);
    } catch (error) {
      showToast(
        'Network error. Please check your connection and try again',
        false,
        1500
      );
    }
  }
  function handleMenuScrollToBottom(e: TouchEvent | WheelEvent) {
    console.log('Reached the bottom of the menu!');
    setPage((prev) => prev + 1);
  }

  return (
    console.log(epics, 'epics inside return'),
    
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[928px] md:bg-white rounded-md shadow-card px-6 py-4 flex flex-col gap-8"
    >
      {message && <Toast success={success}>{message}</Toast>}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Title <span className="text-red-700">*</span>
        </label>
        <input
          id="title"
          {...register('title')}
          className={`form-input  ${errors.title ? 'input-error bg-[#FFDAD6] focus:border-red-500' : 'input-text'}`}
          type="text"
          placeholder="e.g., Finalize structural schematics"
        />

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
            {errors.title.message}
          </div>
        )}
      </div>

      <div className="flex justify-between w-full gap-8">
        <div className="flex flex-col gap-2 w-1/2">
          <label
            htmlFor="status"
            className="label-sm-muted tracking-[0.55px] text-slate-500"
          >
            Status <span className="text-red-700">*</span>
          </label>
          {
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormSelect
                  options={statusOptions}
                  inputId="status"
                  value={
                    statusOptions.find(
                      (option) => option.value === field.value
                    ) ?? null
                  }
                  instanceId="status-select"
                  onChange={(selected) => {
                    field.onChange(selected?.value ?? '');
                  }}
                />
              )}
            />
          }
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label
            htmlFor="assignee"
            className="label-sm-muted tracking-[0.55px] text-slate-500"
          >
            Assignee
          </label>

          {
            <Controller
              control={control}
              name="assignee_id"
              render={({ field }) => (
                <FormSelect
                  isClearable
                  placeholder={'Select Team Member'}
                  value={
                    assigneeOptions.find(
                      (option) => option.value === field.value
                    ) ?? null
                  }
                  options={assigneeOptions}
                  onChange={(selected) => field.onChange(selected?.value ?? '')}
                  inputId="assignee"
                  instanceId="assignee-select"
                />
              )}
            />
          }
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="epic"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Epic
        </label>
        {
          <Controller
            name="epic_id"
            control={control}
            render={({ field }) => (
              <FormSelect<EpicOptions>
                isClearable
                components={{
                  Option: customEpicOption,
                  SingleValue: customSingleValue,
                }}
                onMenuScrollToBottom={handleMenuScrollToBottom}
                options={epicOptions}
                value={
                  epicOptions.find((option) => option.value === field.value) ??
                  null
                }
                onChange={(selected) => field.onChange(selected?.value ?? '')}
                inputId="epic"
                instanceId="epic-select"
              />
            )}
          />
        }
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="due-date"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Due date
        </label>

        {
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                isClearable
                placeholderText="mm/dd/yyyy"
                portalId="root"
                dateFormat={'MM/dd/yyyy'}
                className="form-input input-text px-4 py-3 w-full cursor-pointer"
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
        }
        {errors.due_date && (
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
            {errors.due_date.message}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          className="form-input input-text resize-none h-36"
          placeholder="Provide detailed context for this task..."
        />
      </div>

      {errors.root && (
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
          {errors.root.message}
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button type="button" className="btn-secondary" onClick={() => router.push(`/project/${projectId}/tasks?view=board`)}>
          Back
        </button>
        <button type="submit" className="btn-primary">
          Create Task
        </button>
      </div>
    </form>
  );
}
