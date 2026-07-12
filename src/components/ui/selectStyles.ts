import { ClassNamesConfig } from 'react-select'; 

export const selectClassNames: ClassNamesConfig<any, false> = {
  container: () => 'w-full',

  control: ({ isFocused }) =>
  `
  min-h-[40px]
  rounded-lg
  border
  bg-white
  px-0
  transition-colors
  ${
    isFocused
      ? 'border-primary-container'
      : 'border-[#D7E2FF]'
  }
`,

  valueContainer: () =>
    'flex flex-1 items-center gap-2 px-2',

  input: () =>
    'm-0 p-0',

  singleValue: () =>
    'flex items-center m-0',

  placeholder: () =>
    'text-slate-500',

  indicatorsContainer: () =>
    'flex items-center self-stretch',

  dropdownIndicator: () =>
    'px-2 text-[#6B7280] hover:text-primary-container cursor-pointer',

  indicatorSeparator: () =>
    'hidden',

  menu: () =>
    'mt-1 rounded-lg border border-[#E6EAF2] bg-white shadow-card p-1 overflow-hidden',

  menuList: () =>
    'p-0',

  option: ({ isFocused, isSelected }) =>
    [
      'flex',
      'items-center',
      'rounded-sm',
      'px-3',
      'py-2',
      'cursor-pointer',
      isSelected
        ? 'bg-[#E0E8FF]'
        : isFocused
        ? 'bg-[#F1F3FF]'
        : '',
    ].join(' '),
};