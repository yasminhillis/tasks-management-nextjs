import { useState } from 'react';
import CardIdBadge from '../../../_components/CardBadge';

import Select, {
  components,
  SingleValueProps,
  OptionProps,
  OnChangeValue,
} from 'react-select';

const task = {
  id: '1da16113-6cc7-4419-a5d2-e7a44e4db87a',
  project_id: 'ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea',
  epic_id: '25057bd0-9218-43c3-9fd1-ee53c22b12b3',
  title: 'Implement glassmorphism effect on modals',
  description: '23/7/2026',
  status: 'DONE',
  created_at: '2026-07-15T01:08:31.340175+00:00',
  due_date: '2026-07-22T21:00:00+00:00',
  task_id: 'TASK-34',
  epic: {
    id: '25057bd0-9218-43c3-9fd1-ee53c22b12b3',
    title: 'New title test 888',
    epic_id: 'EPIC-2',
  },
  created_by: {
    id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
    name: 'Yasmin Ayman',
    email: 'yasminhillis7@gmail.com',
    department: 'Frontend',
  },
  assignee: {
    id: '031b7dc1-326c-4f32-b0a6-bf2267b0a8ef',
    name: 'Yasmin Ayman',
    email: 'yasminhillis7@gmail.com',
    department: 'Frontend',
  },
};

// const epics = [
//     {
//       "id": "9cd5c151-3bf0-4231-8f2d-ebc112ee9e6c",
//       "project_id": "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
//       "title": "rthrthtr",
//       "description": "htrhtrhtr",
//       "created_at": "2026-09-17T15:31:49.024395+00:00",
//       "deadline": null,
//       "epic_id": "EPIC-37",
//       "created_by": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       },
//       "assignee": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       }
//     },
//     {
//       "id": "b0c3f13d-b675-4493-a337-5247fe4d98c0",
//       "project_id": "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
//       "title": "epic 90 ",
//       "description": "cdcedc  ecece",
//       "created_at": "2026-08-18T10:20:56.080729+00:00",
//       "deadline": "2026-09-15",
//       "epic_id": "EPIC-36",
//       "created_by": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       },
//       "assignee": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       }
//     },
//     {
//       "id": "f528f7ef-7185-4448-b6c4-df19428f1606",
//       "project_id": "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
//       "title": "epic with deadline 14/7 updated assignee",
//       "description": null,
//       "created_at": "2026-06-30T20:31:31.71137+00:00",
//       "deadline": null,
//       "epic_id": "EPIC-35",
//       "created_by": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       },
//       "assignee": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       }
//     },
//     {
//       "id": "dc0cb2bc-79a5-4d22-8985-d40cd8de0707",
//       "project_id": "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
//       "title": "epic with tomorrow deadline changed assignee1/7",
//       "description": null,
//       "created_at": "2026-06-30T18:58:10.173178+00:00",
//       "deadline": null,
//       "epic_id": "EPIC-34",
//       "created_by": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       },
//       "assignee": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       }
//     },
//     {
//       "id": "9e60698e-334e-4e87-8947-dc106e416e97",
//       "project_id": "ddc3f2e6-588c-41d7-9d2f-3fc43fbf78ea",
//       "title": "no deadline",
//       "description": null,
//       "created_at": "2026-06-29T11:29:45.219497+00:00",
//       "deadline": null,
//       "epic_id": "EPIC-33",
//       "created_by": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       },
//       "assignee": {
//         "sub": "031b7dc1-326c-4f32-b0a6-bf2267b0a8ef",
//         "name": "Yasmin Ayman",
//         "email": "yasminhillis7@gmail.com",
//         "department": "Frontend"
//       }
//     }
//   ];

// {id, title}: {id: string, title: string}
type epicOption = {
  label: string;
  value: string;
};

const OptionComponent = (props: OptionProps<epicOption>) => {
  return (
    <components.Option {...props}>
      <EpicValue data={props.data} />
    </components.Option>
  );
};

const EpicValue = ({ data }: { data: epicOption }) => {
  return (
    <div className="flex items-center gap-1">
      <span
        className="material-symbols-outlined"
        style={{ fontSize: '15px', color: '#434654' }}
      >
        layers
      </span>
      <div>
        <h3 className="caption-md">{data.label}</h3>
      </div>
    </div>
  );
};

const SingleValueComponent = (props: SingleValueProps<epicOption>) => {
  return (
    <components.SingleValue {...props}>
      <EpicValue data={props.data} />
      {/* <div className="flex items-center gap-1">
      <span className="material-symbols-outlined" style={{'fontSize': '15px', 'color': '#434654'}}>layers</span>
      <div>
        <h3 className="caption-md">
          {props.children}
        </h3>
      </div>
    </div> */}
    </components.SingleValue>
  );
};
export default function ModalHeader() {
  
  const epicOptions: epicOption[] = [
    { value: task.epic.id, label: `${task.epic.epic_id} ${task.epic.title}` },
    { value: 'EPIC-33', label: 'EPIC-33 fix bug' },
  ];

  const [selectedOption, setSelectedOption] = useState<epicOption | null>(
    epicOptions.find(option => option.value === task.epic.id) || null
  );
  // const selectOptions = [task.epic].map(epic => (
  //     {
  //         value: epic.id,
  //         label: epic.title
  //     }
  // ))

  const handleChange = (option: OnChangeValue<any, false>) => {
    setSelectedOption(option)
  }
  return (
    <div className="flex flex-col gap-2 bg-green-50 px-8 py-6">
      <div className="flex items-center gap-3">
        <CardIdBadge
          id={task.task_id}
          extraStyles="md:bg-[#DAE2FF] md:card-id-badge md:px-2 md:py-[2px]"
        />
        <Select
          unstyled
          isSearchable={false}
          components={{
            SingleValue: SingleValueComponent,
            Option: OptionComponent,
          }}
          classNames={{
            control: () =>
              'flex gap-[6px] border border-[#D7E2FF] p-2 rounded-md',
            dropdownIndicator: () => 'text-[#6B7280] cursor-pointer',
            singleValue: () => 'caption-md',
            placeholder: () => '',
            menu: () =>
              'bg-white rounded-sm  border-box mb-2 w-full shadow-ring',
            option: () => 'caption-md p-2',
          }}
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected
                ? '#E0E8FF'
                : state.isFocused
                  ? '#F1F3FF'
                  : 'white',
              cursor: 'pointer',
              borderRadius: '2px',
            }),
          }}
          instanceId="epic-select"
          options={epicOptions}
          value={selectedOption}
          onChange={handleChange}
        />
      </div>
      <h2 className="task-details-title">{task.title}</h2>
    </div>
  );
}
