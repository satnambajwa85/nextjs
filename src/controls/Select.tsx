import * as React from 'react';
import cx from 'classnames';
import Downshift from 'downshift'

interface SelectProps {
onSelectCustom(data: string) : void;
onChangeCustom(e: any): void;
defaultValue: string;
lable: string;
tagline: string;
items: { value: string; label: string }[];
className: string;
isOpen: boolean;
}

export const Select: React.FC<SelectProps> = ({
    className,
    lable,
    selectedItem,
    tagline,
    defaultValue,
    onSelectCustom,
    onChangeCustom,
    items,
    isOpen,
  }) => {

  return (
    <Downshift
        itemToString={item => (item ? item.value : '')}
        id="selec"
    >
        {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        inputValue,
        highlightedIndex,
        getRootProps,
        }) => (
        <div className={cx('card_select', className)}>
            <div className="airporticon text-neutral-300 dark:text-neutral-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="nc-icon-field" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
            </div>
    
    
            <div className="airportselect" {...getRootProps({}, {suppressRefError: true})}>
                <input onChange={(e:any)=>onChangeCustom(e.target.value)} placeholder={lable} />
                <span className="light-text">{tagline}</span>
            </div>
            
            {isOpen
                ? <ul {...getMenuProps()}> 
                {items
                    .filter((item:any) => !inputValue || item.value.includes(inputValue))
                    .map((item:any, index:number) => (
                    <li
                        {...getItemProps({
                        //key: item.value,
                        key:index,
                        index,
                        item,
                        style: {
                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                        })}
                        onClick={()=>onSelectCustom(item)}
                    >
                        <span className="icon block text-neutral-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 sm:h-6 w-4 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        </span>
                        <span>
                        {item.label}
                        </span>
                    </li>
                    ))
                }
                </ul>
                : null}
            
        </div>
        )}
  </Downshift>
  )
}

  