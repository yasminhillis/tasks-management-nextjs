'use client';
import { FormSelect } from '@/components/ui/FormSelect';
import Select from 'react-select';

export default function AddNewTaskForm() {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  return (
    <form className="w-full max-w-[928px] md:bg-white rounded-md shadow-card px-6 py-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Title <span className="text-red-700">*</span>
        </label>
        <input
          id="title"
          className="form-input input-text"
          type="text"
          placeholder="e.g., Finalize structural schematics"
        />
      </div>

      <div className="flex justify-between w-full gap-8">
        <div className="flex flex-col gap-2 w-1/2">
          <label
            htmlFor="status"
            className="label-sm-muted tracking-[0.55px] text-slate-500"
          >
            Status <span className="text-red-700">*</span>
          </label>
          <FormSelect  inputId="status"
            instanceId="status-select" />
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label
            htmlFor="assignee"
            className="label-sm-muted tracking-[0.55px] text-slate-500"
          >
            Assignee
          </label>
          <FormSelect  inputId="assignee"
            instanceId="assignee-select" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="epic"
          className="label-sm-muted tracking-[0.55px] text-slate-500"
        >
          Epic
        </label>
        <FormSelect  inputId="epic"
          instanceId="epic-select" />
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
          id="description"
          className="form-input input-text resize-none"
          placeholder="Provide detailed context for this task..."
        />
      </div>

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
