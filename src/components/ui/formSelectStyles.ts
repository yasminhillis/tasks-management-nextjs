
import { ClassNamesConfig } from 'react-select';

export const formSelectStyles: ClassNamesConfig = {
     control: (state) =>
                `form-input input-text px-4 py-3 rounded-sm  ${state.isFocused ? 'border border-primary-container' : 'border border-transparent'} `,
              placeholder: () => 'text-slate-500',
              singleValue: () => 'input-text',
              menu: () =>
                'bg-white rounded-sm shadow-card input-text z-10 overflow-hidden p-2',
              option: (state) => `${state.isFocused ? 'bg-surface-low' : ''}`,
}