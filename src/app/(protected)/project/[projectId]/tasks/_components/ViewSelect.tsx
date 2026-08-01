'use client';

import Select, { components, SingleValueProps } from 'react-select';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const iconMap: Record<string, string> = {
  board: 'grid_view', 
  list: 'list'
}

const DisplaySingleValue = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
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
      <DisplaySingleValue label={props.data.label} value={props.data.value} />
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
  // options.find(option => option.label === e?.value)
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
      components={{
        SingleValue: customSingleValue,
        IndicatorSeparator: () => null,
      }}
      onChange={handleChange}
    />
  );
}
