import { ClassNamesConfig } from 'react-select'; 
// styles={{
//               control: (base, state) => ({
//                 ...base, 
//                 borderColor: state.isFocused ? '#0052cc' :'#D7E2FF',
//                 borderRadius: '8px',
//                 boxShadow: 'none',
//                 height: '40px',
//                 display: 'flex', 
//                 alignItems: 'center',
//                 '&:hover': {
//                   borderColor: '#0052cc'
//                 }
//               }),
//               indicatorSeparator: () => ({display: 'none'}),
//               valueContainer: (base) => ({
//                 ...base, 
//                 padding: '0 8px'
//               }), 
//               dropdownIndicator: (base) => ({
//                 ...base, 
//                 color: '#6B7280',
//                 cursor: 'pointer',
//                 "&:hover": {
//                   color: '#0052cc'
//                 }
//               }), 
//               option: (base, state) => ({
//                 ...base,
//                 backgroundColor: state.isSelected ? '#E0E8FF' : state.isFocused ? '#F1F3FF' : 'white',
//                 color: '#041B3C',
//                 cursor: 'pointer',
//                 borderRadius: '2px',
//               }),
//             }}

// classNames={{
//               control: (state) =>
//                 `form-input input-text px-4 py-3 rounded-sm  ${state.isFocused ? 'border border-primary-container' : 'border border-transparent'} `,
//               placeholder: () => 'text-slate-500',
//               singleValue: () => 'input-text',
//               menu: () =>
//                         'bg-white rounded-sm shadow-card input-text z-10 overflow-hidden p-2',
//               option: (state) => `${state.isFocused ? 'bg-surface-low' : ''}`,
//             }}

// export const selectClassNames: ClassNamesConfig<any, false> = {
//     control: (state) => `form-input input-text px-4 py-3 rounded-sm ${state.isFocused ? 'border border-primary-container' : 'border border-transparent'}`, 
//     valueContainer: () => 'p-0 gap-2', 
//     input: () => 'm-0 p-0', 
//     placeholder: () => 'text-slate-500', 
//     singleValue: () => 'input-text', 
//     menu: () => 'bg-white rounded-sm shadow-card input-text z-10 overflow-hidden p-2',
//     option: (state) => `px-3 py-2 rounded cursor-pointer ${state.isFocused ? 'bg-surface-low' : ''} ${state.isSelected ? 'bg-surface-highest text-primary': ''}`,
// }

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