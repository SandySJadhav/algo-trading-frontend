import { memo } from 'react';

const ToggleInput = ({ onChange, title, strategyId, checked }: any) => {
  return (
    <div className="flex flex-col xl:items-center xl:text-center w-full">
      <label
        htmlFor={strategyId}
        className="relative inline-flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            id={strategyId}
            name={strategyId}
            type="checkbox"
            checked={checked}
            className="border-black sr-only peer"
            onChange={(e) => onChange(strategyId, e.target.checked)}
          />
          <div className="rounded-full bg-gray-200 peer peer-checked:after:translate-x-full peer-checked:bg-gray-200 after:content-[''] after:absolute after:left-0 peer-checked:after:bg-master-green after:border-2 after:border-solid after:border-gray-200 after:bg-master-pink after:rounded-full w-16 h-10 after:top-1 after:h-8 after:w-8 after:transition-all" />
          {title ? (
            <span className="text-sm font-medium text-gray-300">{title}</span>
          ) : null}
        </div>
      </label>
    </div>
  );
};

export default memo(ToggleInput);
