const img = "https://www.figma.com/api/mcp/asset/7c99a521-8e13-4d4c-b285-7d3516c2b1ee";
const img1 = "https://www.figma.com/api/mcp/asset/80d10fbc-d452-440b-944e-df0b44ba80ce";
type InputOptFieldProps = {
  className?: string;
  value?: string;
  type?: "Center" | "Left" | "Right";
  state?: "Default";
};

function InputOptField({ className, value = "", type = "Left", state = "Default" }: InputOptFieldProps) {
  const isCenterAndDefault = type === "Center" && state === "Default";
  const isLeftAndDefault = type === "Left" && state === "Default";
  const isRightAndDefault = type === "Right" && state === "Default";
  return (
    <div id={isLeftAndDefault ? "node-9_99" : isCenterAndDefault ? "node-9_100" : isRightAndDefault ? "node-9_101" : ""} className={className}>
      <div className="flex flex-col font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] justify-center leading-[0] overflow-hidden relative shrink-0 text-[color:var(--foreground,#09090b)] text-[length:var(--text-sm,14px)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="9:108">
        <p className="leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden text-[14px]">{value}</p>
      </div>
    </div>
  );
}
type InputOptProps = {
  className?: string;
  label?: string;
  label1?: boolean;
  helpText?: string;
  helpText1?: boolean;
  segments?: "One";
  state?: "Enabled";
  alignment?: "Left ←";
};

function InputOpt({ className, label = "Label", label1 = false, helpText = "Help text", helpText1 = false, segments = "One", state = "Enabled", alignment = "Left ←" }: InputOptProps) {
  return (
    <div data-node-id="9:120" className={className}>
      {label1 && (
        <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] min-w-full relative shrink-0 text-[color:var(--foreground,#09090b)] text-[length:var(--text-sm,14px)] w-[min-content] whitespace-pre-wrap" data-node-id="9:138">
          {label}
        </p>
      )}
      <div data-node-id="9:139" className="content-stretch flex items-center relative shrink-0" data-name="Input">
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-bl-[var(--calc(var(--radius)-2px),8px)] rounded-tl-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" />
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" type="Center" />
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" type="Center" />
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" type="Center" />
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" type="Center" />
        <InputOptField className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-br-[var(--calc(var(--radius)-2px),8px)] rounded-tr-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 size-[36px]" type="Right" />
      </div>
      {helpText1 && (
        <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] min-w-full relative shrink-0 text-[color:var(--muted-foreground,#71717a)] text-[length:var(--text-sm,14px)] w-[min-content] whitespace-pre-wrap" data-node-id="9:146">
          {helpText}
        </p>
      )}
    </div>
  );
}
type CalendarDayButtonProps = {
  className?: string;
  selected?: boolean;
  state?: "Enabled" | "Hover";
  alignment?: "Central";
  size?: "Default";
};

function CalendarDayButton({ className, selected = false, state = "Enabled", alignment = "Central", size = "Default" }: CalendarDayButtonProps) {
  return (
    <div data-node-id="9:439" className={className}>
      <p data-node-id="9:454" className={`font-[family-name:var(--font\\/family\\/font-sans,"Geist:Regular",sans-serif)] font-[var(--font\\/weight\\/font-normal,400)] leading-[var(--font\\/line-height\\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap`}>
        2
      </p>
    </div>
  );
}
type CalendarDayHeaderProps = {
  className?: string;
  label?: string;
};

function CalendarDayHeader({ className, label = "Su" }: CalendarDayHeaderProps) {
  return (
    <div className={className} data-name=".CalendarDayHeader" data-node-id="9:434">
      <p className="absolute font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] inset-[0_0_40%_0] leading-none text-[color:var(--muted-foreground,#71717a)] text-[length:var(--text-xs,12px)] text-center" data-node-id="9:435">
        {label}
      </p>
    </div>
  );
}
type CalendarHeaderProps = {
  className?: string;
  leftArrow?: boolean;
  rightArrow?: boolean;
  monthYear?: string;
  type?: "Default";
};

function CalendarHeader({ className, leftArrow = true, rightArrow = true, monthYear = "June 2025", type = "Default" }: CalendarHeaderProps) {
  return (
    <div data-node-id="9:406" className={className}>
      <p className="flex-[1_0_0] font-[family-name:var(--font\/family\/font-sans,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] max-w-[176px] min-h-px min-w-px relative text-[color:var(--foreground,#09090b)] text-[length:var(--text-sm,14px)] text-center whitespace-pre-wrap" data-node-id="9:410">
        {monthYear}
      </p>
      {leftArrow && (
        <div className="absolute bg-[var(--background,white)] content-stretch flex gap-[var(--p-2,0px)] h-[var(--height\/h-8,32px)] items-center justify-center left-0 opacity-[var(--opacity-50,0.5)] p-[var(--p-2,8px)] rounded-[var(--calc(var(--radius)-2px),8px)] top-0 w-[var(--width\/w-8,32px)]" data-name=".Calendar Arrow Button" data-node-id="9:411">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / chevron-left" data-node-id="I9:411;6733:2232">
            <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I9:411;6733:2232;2706:13539">
              <div className="absolute inset-[-8.31%_-16.62%_-8.31%_-16.63%]" style={{ "--stroke-0": "rgba(9, 9, 11, 1)" } as React.CSSProperties}>
                <img alt="" className="block max-w-none size-full" src={img} />
              </div>
            </div>
          </div>
        </div>
      )}
      {rightArrow && (
        <div className="absolute bg-[var(--background,white)] content-stretch flex gap-[var(--p-2,0px)] h-[var(--height\/h-8,32px)] items-center justify-center opacity-[var(--opacity-50,0.5)] p-[var(--p-2,8px)] right-0 rounded-[var(--calc(var(--radius)-2px),8px)] top-0 w-[var(--width\/w-8,32px)]" data-name=".Calendar Arrow Button" data-node-id="9:412">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / chevron-right" data-node-id="I9:412;6733:2232">
            <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector" data-node-id="I9:412;6733:2232;2706:13799">
              <div className="absolute inset-[-8.31%_-16.62%_-8.31%_-16.63%]" style={{ "--stroke-0": "rgba(9, 9, 11, 1)" } as React.CSSProperties}>
                <img alt="" className="block max-w-none size-full" src={img1} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
type InputProps = {
  className?: string;
  placeholderText?: string;
  type?: "Text";
  state?: "Enabled";
  error?: "False";
};

function Input({ className, placeholderText = "Placeholder text", type = "Text", state = "Enabled", error = "False" }: InputProps) {
  return (
    <div data-node-id="9:23" className={className}>
      <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] relative shrink-0 text-[color:var(--muted-foreground,#71717a)] text-[length:var(--text-sm,14px)]" data-node-id="9:44">
        {placeholderText}
      </p>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-center justify-center p-[10px] relative size-full" data-name="Container" data-node-id="1:877">
      <Input className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#e6e6e6)] border-solid content-stretch flex flex-col gap-[var(--p-2,0px)] items-start overflow-clip px-[var(--p-3,12px)] py-[var(--p-2,8px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,1px)_var(--shadow\/xs\/layer-1\/blur,2px)_var(--shadow\/xs\/layer-1\/spread,0px)_var(--shadow\/xs,rgba(26,26,26,0.05))] shrink-0 w-full" />
      <div className="bg-[var(--background,white)] border-[var(--border,#e4e4e7)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex flex-col gap-[var(--p-0,0px)] items-start p-[var(--p-0,0px)] relative rounded-[var(--radius,12px)] shadow-[var(--shadow\/md\/layer-1\/x,0px)_var(--shadow\/md\/layer-1\/y,2px)_var(--shadow\/md\/layer-1\/blur,4px)_0px_var(--shadow\/md,rgba(26,26,26,0.05)),var(--shadow\/md\/layer-2\/x,0px)_var(--shadow\/md\/layer-2\/y,4px)_var(--shadow\/md\/layer-2\/blur,6px)_0px_var(--shadow\/md,rgba(26,26,26,0.05))] shrink-0" data-name="Calendar 01 Block" data-node-id="9:526">
        <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-start pb-[var(--p-2,8px)] pt-[var(--p-3,12px)] px-[var(--p-3,12px)] relative shrink-0 w-[248px]" data-name="Header" data-node-id="I9:526;6912:3978">
          <CalendarHeader className="content-stretch flex gap-[var(--p-2,8px)] h-[32px] items-center justify-center px-[var(--p-2\,5,10px)] py-[var(--p-0,0px)] relative shrink-0 w-full" />
        </div>
        <div className="content-stretch flex flex-col gap-[var(--p-2,8px)] items-start p-[var(--p-3,12px)] relative shrink-0 w-[248px]" data-name="Grid" data-node-id="I9:526;305:4333">
          <div className="content-stretch flex gap-[var(--p-0,0px)] items-start relative shrink-0 w-full" data-name="Days header" data-node-id="I9:526;305:4101">
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="Mo" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="Tu" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="We" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="Th" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="Fr" />
            <CalendarDayHeader className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" label="Sa" />
          </div>
          <div className="content-stretch flex items-start justify-between overflow-clip p-[var(--p-0,0px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 w-full" data-name="Row" data-node-id="I9:526;305:4130">
            <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4298">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4298;305:4212">
                1
              </p>
            </div>
            <CalendarDayButton className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" />
            <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4300">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4300;305:4212">
                3
              </p>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4301">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4301;305:4212">
                4
              </p>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4302">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4302;305:4212">
                5
              </p>
            </div>
            <div className="bg-[var(--primary,#171717)] content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4303">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--primary-foreground,#fafafa)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4303;305:4332">
                6
              </p>
            </div>
            <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] items-center justify-center overflow-clip p-[var(--p-1\,5,6px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shrink-0 size-[32px]" data-name=".Calendar Day Button" data-node-id="I9:526;305:4304">
              <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] overflow-hidden relative shrink-0 text-[14px] text-[color:var(--foreground,#09090b)] text-center text-ellipsis w-full whitespace-nowrap" data-node-id="I9:526;305:4304;305:4212">
                7
              </p>
            </div>
          </div>
          {/* Additional calendar rows... */}
        </div>
      </div>
      <InputOpt className="content-stretch flex flex-col gap-[var(--p-2,8px)] items-start p-[var(--p-0,0px)] relative shrink-0" />
      <div className="bg-[var(--primary,#171717)] content-stretch flex gap-[var(--p-2,8px)] h-[32px] items-center justify-center px-[var(--p-3,12px)] py-[var(--p-2,8px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] shrink-0 w-full" data-name="Button" data-node-id="1:930">
        <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] relative shrink-0 text-[color:var(--primary-foreground,#fafafa)] text-[length:var(--text-xs,12px)]" data-node-id="I1:930;6722:18542">
          Submit
        </p>
      </div>
      <div className="bg-[var(--destructive,#e7000b)] content-stretch flex gap-[var(--p-2,8px)] h-[32px] items-center justify-center px-[var(--p-3,12px)] py-[var(--p-2,8px)] relative rounded-[var(--calc(var(--radius)-2px),8px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,1px)_var(--shadow\/2xs\/layer-1\/blur,2px)_0px_var(--shadow\/2xs,rgba(26,26,26,0.05))] shrink-0 w-full" data-name="Button" data-node-id="1:872">
        <p className="font-[family-name:var(--font\/family\/font-sans,'Geist:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] relative shrink-0 text-[color:var(--destructive-foreground,#fafafa)] text-[length:var(--text-xs,12px)]" data-node-id="I1:872;6722:19913">
          Cancel
        </p>
      </div>
    </div>
  );
}
