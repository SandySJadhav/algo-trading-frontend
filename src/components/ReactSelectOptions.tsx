import classNames from "classnames";
import { ForwardedRef, forwardRef } from "react";

type Prop = {
  open: boolean;
  loading?: boolean;
  options: any;
  onClose: () => void;
  onSelect: (selection: any) => void;
};

const ReactSelect = forwardRef(
  ({ options = [], onClose, open, onSelect }: Prop, ref: ForwardedRef<any>) => {
    const handleOnBlur = (e: any) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        onClose();
      }
    };

    return (
      <div
        className={classNames(
          "top-full bg-white border-2 shadow-master my-1 absolute w-full z-10 box-border",
          {
            hidden: !open,
          }
        )}
      >
        <div
          className="max-h-[300px] overflow-y-auto overflow-x-hidden pb-1 relative box-border"
          onBlur={handleOnBlur}
          ref={ref}
        >
          {!options.length ? (
            <div className="block font-sm text-sm p-4 text-master-gray">
              Start typing...
            </div>
          ) : (
            options.map((option: any) => {
              return (
                <div
                  tabIndex={1}
                  key={option.label}
                  onClick={() => onSelect(option.value)}
                  className="react-select-option bg-transparent cursor-default block py-2 px-3 w-full box-border hover:bg-blue-200"
                >
                  <div className="flex justify-between items-center select-none">
                    <div className="flex text-sm">{option.label}</div>
                    <div className="flex justify-end">
                      <div className="text-center rounded-2xl p-2 text-xs bg-[#b3c5dc4d] text-master-blue">
                        {option.value?.exch_seg}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
);

ReactSelect.displayName = "ReactSelect";

export default ReactSelect;
