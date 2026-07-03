import { formatDate } from '@/app/(protected)/_utils/formatDate';
import Initials from '@/components/Initials';
import Toast from '@/components/Toast';
import { Epic } from '@/lib/types';
import { useEffect, useState } from 'react';
import updateField from '../_utils/updateFiled';
import type { MemberData } from '@/lib/types';
import Select, { OptionProps, SingleValueProps } from 'react-select';
import { components } from 'react-select';

type ModalBodyProps = {
  description: string;
  createdBy: string;
  deadline: string | null;
  createdAt: string;
  assignee: string;
  epicId: string;
  assigneeId: string;
  onEpicUpdate: (id: string, data: Partial<Epic>) => void;
  members: MemberData[];
  membersStatus: 'idle' | 'loading' | 'failed' | 'success';
};

type AssigneeOptions = {
  value: string;
  label: string;
};

export default function ModalBody({
  description,
  createdBy,
  deadline,
  createdAt,
  assignee,
  epicId,
  assigneeId,
  onEpicUpdate,
  members,
  membersStatus,
}: ModalBodyProps) {
  const [currentDescriptionValue, setCurrentDescriptionValue] =
    useState(description);
  const [previousDescriptionValue, setPreviousDescriptionValue] =
    useState(description);

  const [currentDeadline, setCurrentDeadline] = useState(deadline);
  const [previousDeadline, setpreviousDeadline] = useState(deadline);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [currentAssigneeName, setCurrentAssigneeName] = useState(assignee);
  const [previousAssigneeId, setPreviousAssigneeId] = useState(assigneeId);
  const [previousAssigneeName, setPreviousAssigneeName] = useState(assignee);

  function showToast(message: string, success: boolean) {
    setMessage(message);
    setSuccess(success);
    setTimeout(() => {
      setMessage('');
      setSuccess(false);
    }, 3000);
  }

  async function handleFieldUpdate(
    field: 'title' | 'description' | 'assignee_id' | 'deadline' | 'assignee',
    previousValue: string,
    currentValue: string,
    onSuccessCallback: (value: string) => void,
    onRevertCallback: (value: string) => void
  ) {
    function handleRevert(previousValue: string, message: string) {
      showToast(message, false);
      onRevertCallback(previousValue);
    }

    function handleSuccess(currentValue: string) {
      const displayField = field === 'assignee_id' ? 'assignee' : field;
      showToast(
        `${displayField.charAt(0).toUpperCase() + field.slice(1)} updated successfully`,
        true
      );
      onSuccessCallback(currentValue);
      if (field !== 'assignee_id') {
        onEpicUpdate(epicId, { [field]: currentValue });
      }
    }

    setIsSaving(true);
    await updateField({
      epicId,
      field,
      previousValue,
      currentValue,
      onSuccess: handleSuccess,
      onRevert: handleRevert,
    });
    setIsSaving(false);
  }

  const options: AssigneeOptions[] = [
    { value: '', label: 'Unassigned' },
    ...members.map((member) => ({
      value: member.user_id,
      label: member.metadata.name,
    })),
  ];

  const DisplayAssignee = ({data}: {data: AssigneeOptions}) => {
    const isUnassigned = data.label === 'Unassigned';
    return (
     <div className="flex items-center gap-2 cursor-pointer">
          {isUnassigned ? (
            <div className="flex items-center justify-center w-[24px] h-[24px] bg-[#E0E8FF] rounded-full">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '15px', color: '#4F5F7B' }}
              >
                person_off
              </span>
            </div>
          ) : (
            <Initials
              name={data.label}
              mode="desktop"
              state="success"
              extraStyles="rounded-full w-6 h-6 bg-[#CDDDFF] font-normal text-[11px]"
            />
          )}
          {data.label}
        </div>)
  }

  const customSingleValue = (props: SingleValueProps<AssigneeOptions>) => {
    return (
      <components.SingleValue {...props}>
       <DisplayAssignee data={props.data}/>
      </components.SingleValue>
    );
  };
  const customOption = (props: OptionProps<AssigneeOptions>) => {
    return (
      <components.Option
        {...props}
        className="flex items-center gap-2 cursor-pointer"
      >
       <DisplayAssignee data={props.data}/>
      </components.Option>
    );
  };

  return (
    <div className="px-[24px] py-[16px] md:p-[32px] flex flex-col gap-[20px] md:gap-[32px]">
      {message && <Toast success={success}>{message}</Toast>}
      <div className="flex flex-col gap-2">
        <label className="md:hidden label-sm mb-[8px]" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          style={{ fieldSizing: 'content' }}
          placeholder={
            currentDescriptionValue === '' ? 'No description provided' : ''
          }
          className={`min-h-[120px] max-h-[160px] body-lg-dark mt-0 text-[14px] text-[#4F5F7B] resize-none border border-[#D7E2FF] rounded-lg h-[150px] focus:border border-[#E6EAF2] p-2 outline-none focus:border-primary-container`}
          value={currentDescriptionValue}
          onChange={(e) => setCurrentDescriptionValue(e.target.value)}
          onBlur={() =>
            handleFieldUpdate(
              'description',
              previousDescriptionValue,
              currentDescriptionValue,
              (val) => setPreviousDescriptionValue(val),
              (val) => setCurrentDescriptionValue(val)
            )
          }
          disabled={isSaving}
        ></textarea>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr] gap-[24px]">
        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">
            Created By
          </h3>
          <div className="flex items-center gap-[8px]">
            <div className="hidden  md:block">
              <Initials
                name={createdBy}
                mode="desktop"
                state="success"
                extraStyles="rounded-[12px] bg-[#0052CC] text-[10px] font-bold text-white w-[28px] h-[28px]"
              />
            </div>

            <div className="md:hidden">
              <Initials
                name={createdBy}
                mode="mobile"
                state="success"
                extraStyles="rounded-full bg-[#CDDDFF] text-[6px] text-[#51617E]"
              />
            </div>

            <span className="body-md-medium">{createdBy}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <label className="label-sm md:label-xs-muted text-[#041B3C66]">
            Assignee
          </label>

          <Select<AssigneeOptions>
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
            value={options.find(
              (option) => option.label === currentAssigneeName
            )}
            options={options}
            onChange={(e) => {
              const selectedMember = members.find(
                (m) => m.user_id === e?.value
              );
              console.log('selected:', e);
              console.log('selectedMember:', selectedMember);
              console.log('members:', members);
              setCurrentAssigneeName(e?.label ?? 'Unassigned');
              handleFieldUpdate(
                'assignee_id',
                previousAssigneeId,
                e?.value ?? '',
                (val) => {
                  setPreviousAssigneeId(val);
                  setPreviousAssigneeName(currentAssigneeName);
                  onEpicUpdate(epicId, {
                    assignee: selectedMember
                      ? {
                          sub: selectedMember.user_id,
                          name: selectedMember.metadata.name,
                          email: selectedMember.metadata.email ?? '',
                          department: selectedMember.metadata.department ?? '',
                        }
                      : null,
                  });
                },
                (val) => {
                  setCurrentAssigneeName(previousAssigneeName);
                }
              );
            }}
          />
        </div>

        <div className="col-span-2 border-t border-[#E6EAF2] md:hidden" />

        <div className="flex flex-col justify-center gap-[8.5px]">
          <label className="label-sm md:label-xs-muted text-[#041B3C66]">
            Deadline
          </label>
          <div className="flex items-center gap-[8px] body-md-medium">
            {/* <span
              className="material-symbols-outlined"
              style={{ fontSize: '15px', color: '#041B3C66' }}
            >
              calendar_today
            </span> */}
            {/* <time className="text-[14px] w-full" dateTime={deadline ?? ''}>
              {deadline ? formatDate(deadline) : 'No deadline'}
            </time> */}

            <input
              type="date"
              className="cursor-pointer"
              onChange={(e) => {
                setCurrentDeadline(e.target.value);
                handleFieldUpdate(
                  'deadline',
                  previousDeadline ?? '',
                  e.target.value,
                  (val) => setCurrentDeadline(val),
                  (val) => setpreviousDeadline(val)
                );
              }}
              value={currentDeadline ? currentDeadline : ''}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[8.5px]">
          <h3 className="label-sm md:label-xs-muted text-[#041B3C66]">
            Created At
          </h3>
          <div className="flex items-center gap-[8px] body-md-medium text-[14px]">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '15px', color: '#041B3C66' }}
            >
              calendar_today
            </span>
            <time className=" w-full" dateTime={createdAt}>
              {formatDate(createdAt)}
            </time>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-[11px] md:text-[18px] font-semibold leading-[28px]">
          Tasks
        </h2>
        <div className="flex items-center gap-[3px] cursor-pointer hidden md:flex">
          <span
            className="material-symbols-outlined inline-flex items-center"
            style={{
              fontSize: '19px',
              color: '#003D9B',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            add
          </span>
          <span className="text-[14px] font-semibold text-primary hover:text-blue-700">
            Add Task
          </span>
        </div>

        <div className="md:hidden rounded-[12px] w-[58px] h-[19px] px-[8px] py-[2px] bg-[#E0E8FF] font-bold text-[9px] uppercase">
          0 tasks
        </div>
      </div>

      <div className="border-dashed-custom bg-[#F1F3FF] p-[48px] rounded-[8px] flex flex-col items-center justify-center gap-[16px]">
        <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-[#D7E2FF]">
          <span
            className="material-symbols-outlined hidden! md:inline!"
            style={{ opacity: '30%' }}
          >
            list
          </span>

          <span
            className="material-symbols-outlined md:hidden!"
            style={{ color: '#003D9B' }}
          >
            list
          </span>
        </div>
        <p className="empty-state-text text-center text-[#4F5F7B]">
          No tasks have been added to this epic yet
        </p>
        <button className="btn-primary shadow-sm text-[12px] md:text-[16px] gap-[3px]">
          <span
            className="material-symbols-outlined md:hidden!"
            style={{ fontSize: '17px' }}
          >
            add
          </span>
          <span
            className="material-symbols-outlined hidden! md:inline!"
            style={{ fontSize: '20px' }}
          >
            add
          </span>
          Add Task
        </button>
      </div>
    </div>
  );
}
