'use client';

import Select, { components, SingleValueProps, OptionProps } from 'react-select';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const iconMap: Record<string, string> = {
  board: 'grid_view', 
  list: 'list'
}

const DisplayIconAndText = ({
  label,
  value,
  padding
}: {
  label: string;
  value: string;
  padding?: boolean
}) => {
  return (
    <div className={`flex gap-2 items-center ${padding ? 'px-2 py-3  ml-1 cursor-pointer hover:bg-surface-low' : ''}`}>
      <div className="material-symbols-outlined">{iconMap[value]}</div>
      <h3 className="body-md-medium">{label}</h3>
    </div>
  );
};

type OptionType = { value: string; label: string };

const customSingleValue = (props: SingleValueProps<OptionType>) => {
  console.log(props, 'props22');

  return (
    <components.SingleValue {...props}>
      <DisplayIconAndText label={props.data.label} value={props.data.value} />
    </components.SingleValue>
  );
};

const customOptions = (props: OptionProps<OptionType>) => {
  return (
    <components.SingleValue {...props}>
      <DisplayIconAndText label={props.data.label} value={props.data.value}  padding={true}/>
    </components.SingleValue>
  );
};

const options: OptionType[] = [
  {
    value: 'board',
    label: 'Board View',
  },
  {
    value: 'list',
    label: 'List View',
  },
];

export default function ViewSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') ?? 'board';
  const selected =
    options.find((option) => option.value === currentView) ?? options[1];

  const handleChange = (option: OptionType | null) => {
    if (!option) return; 
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', option.value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Select<OptionType, false>
      options={options}
      instanceId="tasks-view-select"
      inputId="tasks-view-select-input"
      value={selected}

      classNames={{
        control: () => 'cursor-pointer', 
        valueContainer: () => 'cursor-pointer', 
        indicatorsContainer: () => 'cursor-pointer', 
        option: () => 'cursor-pointer p-2 bg-red-100'
      }}

      components={{
        SingleValue: customSingleValue,
        IndicatorSeparator: () => null,
        Option: customOptions
      }}
      onChange={handleChange}
    />
  );
}
