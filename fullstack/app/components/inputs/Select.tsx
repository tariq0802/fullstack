"use client";

import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  value?: any;
  onChange: (value: any) => void;
  options: Record<string, any>[];
  disabled?: boolean;
  isMulti?: boolean;
  defaultValue?: any;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
  isMulti,
  defaultValue,
}) => {
  return (
    <div className="w-full z-[100]">
      <label
        className="
          block 
          text-sm 
          font-medium 
          leading-6
          pb-2 
          text-gray-900"
      >
        {label}
      </label>
      <div className="">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          isMulti={isMulti}
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
