

import { components, OptionProps, SingleValueProps } from 'react-select';
import CardBadge from '@/app/(protected)/project/_components/CardBadge';

export type EpicOption = {
  label: string;
  value: string;
};

function DisplayEpic({ data }: { data: EpicOption }) {
  const displayId = data.label.split(' ')[0];
  const title = data.label.split(' ').slice(1);
  return (
    <div className="flex items-center gap-2">
      <CardBadge id={displayId} extraStyles="px-[8px] py-[4px] md:px-[6px] md:py-[3px]" />
      {title}
    </div>
  );
}

export function EpicSelectOption(props: OptionProps<EpicOption>) {
  return (
    <components.Option {...props}>
      <DisplayEpic data={props.data} />
    </components.Option>
  );
}

export function EpicSelectSingleValue(props: SingleValueProps<EpicOption>) {
  return (
    <components.SingleValue {...props}>
      <DisplayEpic data={props.data} />
    </components.SingleValue>
  );
}