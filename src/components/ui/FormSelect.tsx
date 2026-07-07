'use client'; 
import Select, {Props as ReactSelectProps} from 'react-select'
import { formSelectStyles } from './formSelectStyles';

export function FormSelect<Option, IsMulti extends boolean = false>(props: ReactSelectProps<Option, IsMulti>){
    return <Select unstyled  {...props} classNames={formSelectStyles as ReactSelectProps<Option, IsMulti>['classNames']}/>
}