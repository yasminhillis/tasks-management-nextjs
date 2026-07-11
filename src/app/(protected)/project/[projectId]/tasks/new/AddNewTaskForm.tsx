'use client';
import { FormSelect } from '@/components/ui/FormSelect';
import { addNewTask } from '@/lib/actions/taskActions';
import { AddTaskSchema } from '@/validations/add.task.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import type { AddTaskFormData } from '@/validations/add.task.schema';
import { Status } from '@/lib/types/index'
import Toast from '@/components/Toast';
import { useToast } from '@/lib/hooks/useToast';
import { getProjectMembers } from '@/lib/actions/projectMembersActions';
import { useEffect, useState } from 'react';
import type { MemberData } from '@/lib/types/index';

export default function AddNewTaskForm({ projectId }: {projectId: string}) {
  
  const { message, success, showToast } = useToast();
  const [members, setMemebers] = useState<MemberData[]>([])

  async function getMemebers(){
    const result = await getProjectMembers(projectId); 
    if (!result.success) {
      showToast(result.message, false, 1500)
      return;
    }
    setMemebers(result.data)
  }

  useEffect(() => {
    getMemebers()
   
  }, [projectId])

   console.log(members);

  const assigneeOptions = members.map((member: MemberData) => (
    {
      value: member.user_id, 
      label: member.metadata.name
    }
  ));

  console.log(assigneeOptions, 'assignee options');
  

  function formateEpicTitle(title: string){
    return title.length > 100 ? title.slice(0, 100) + '...' : title
  }

  const options = [
    { value: 'chcolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const statusOptions = Object.values(Status).map(statusOption => ({
    value: statusOption, 
    label: statusOption.replace(/_/g, " ")
  }))
  
  const { register, control, handleSubmit, setError, formState: {errors} } = useForm({
    resolver: zodResolver(AddTaskSchema), 
    defaultValues: {
      status: Status.TO_DO
    }, 
    mode: 'onChange'
  })

  async function onSubmit(data: AddTaskFormData){
    try {
      const result = await addNewTask({...data, project_id: projectId});
      if (!result.success) {
        showToast(result.message, false, 1500)
        return;
      }
      showToast(result.message, true, 1500)
    } catch (error) {
      showToast('Network error. Please check your connection and try again', false, 1500)
    } 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[928px] md:bg-white rounded-md shadow-card px-6 py-4 flex flex-col gap-8">
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
          {...register("title")}
          className={`form-input  ${errors.title ? 'input-error bg-[#FFDAD6] focus:border-red-500' : 'input-text'}`}
          type="text"
          placeholder="e.g., Finalize structural schematics"
        />

        {errors.title && <div
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
            </div>}
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
            <Controller name="status" control={control} render={({ field }) => (
              <FormSelect
                options={statusOptions}
                inputId="status"
                value={statusOptions.find(option => option.value === field.value) ?? null}
                instanceId="status-select"
                onChange={(selected) => {
                  field.onChange(selected?.value ?? "")
                }}
              />
            )} />
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
            <Controller control={control} name="assignee_id" render={({ field }) => (
              console.log(field, 'field'),
              
              <FormSelect
                placeholder={'Select Team Member'}
                value={assigneeOptions.find(option => option.value === field.value) ?? null} 
                options={assigneeOptions}  onChange={selected => field.onChange(selected?.value ?? "")} 
                inputId="assignee" 
                instanceId="assignee-select" 
              />
            )} />
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
          <Controller name="epic_id" control={control} render={({ field }) => (
            <FormSelect value={options.find(option => option.value === field.value) ?? null} onChange={selected => field.onChange(selected?.value ?? "")} inputId="epic" instanceId="epic-select" />
          )} />
        }
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="due-date"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Due date
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          className="form-input input-text resize-none h-36"
          placeholder="Provide detailed context for this task..."
        />
      </div>

        {errors.root && <div
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
            </div>}

      <div className="flex justify-end gap-4">
        <button type="button" className="btn-secondary">
          Back
        </button>
        <button type="submit" className="btn-primary">
          Create Task
        </button>
      </div>
    </form>
  );
}
