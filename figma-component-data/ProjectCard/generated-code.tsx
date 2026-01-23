const imgLine = "https://www.figma.com/api/mcp/asset/757f8cb4-33a2-45f8-9f6a-8d5037647461";
const imgLine1 = "https://www.figma.com/api/mcp/asset/dddb7c16-b9c6-4b03-aac1-2651c24bc997";
const imgLine2 = "https://www.figma.com/api/mcp/asset/e84e6ca5-5f9d-4af1-aaef-089dc630dfa1";
const imgLine3 = "https://www.figma.com/api/mcp/asset/1152f560-3855-4edb-8b79-f0f3a3a738dd";
const imgLine4 = "https://www.figma.com/api/mcp/asset/a3196c6f-d72e-4fb7-af0d-0c6e35cd9eae";
type SeparatorProps = {
  className?: string;
  horizontal?: "False";
};

function Separator({ className, horizontal = "False" }: SeparatorProps) {
  return (
    <div data-node-id="2232:5629" className={className}>
      <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-0">
        <div className="flex-none h-full rotate-[-90deg]">
          <div data-node-id="2232:5631" className="h-full relative w-[24px]" data-name="Line">
            <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(209, 213, 219, 1)" } as React.CSSProperties}>
              <img className="block max-w-none size-full" alt="" src={imgLine} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
type ProjectProps = {
  property1?: "Default" | "hovered";
};

export default function Project({ property1 = "Default" }: ProjectProps) {
  const isDefault = property1 === "Default";
  const isHovered = property1 === "hovered";
  return (
    <div id={isDefault ? "node-2138_5642" : isHovered ? "node-2138_6228" : ""} className={isDefault ? "border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start px-[24px] py-[20px] relative w-[462px]" : isHovered ? "bg-[var(--custom\\/bg-primary-10,rgba(23,23,23,0.05))] border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex flex-col gap-[var(--p-4,16px)] items-start px-[24px] py-[20px] relative w-[462px]" : ""}>
      <div id={isDefault ? "node-2138_21356" : isHovered ? "node-2138_6392" : ""} className={`absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] top-0 w-[8px] ${isDefault ? "left-[-8px]" : isHovered ? "left-0" : ""}`} data-name="border" />
      <div id={isDefault ? "node-2138_21160" : isHovered ? "node-2138_20259" : ""} className={`content-stretch flex gap-[var(--p-4,16px)] items-start relative ${isDefault ? "flex-[1_0_0] min-h-px min-w-px self-stretch" : isHovered ? "shrink-0 w-full" : ""}`} data-name="Project Info">
        <div id={isDefault ? "node-2138_21368" : isHovered ? "node-2138_21367" : ""} className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details">
          <div id={isDefault ? "node-2138_21369" : isHovered ? "node-2138_6232" : ""} className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header">
            <div id={isDefault ? "node-2138_21162" : isHovered ? "node-2138_6229" : ""} className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon">
              <div id={isDefault ? "node-I2138_21162-2706_13779" : isHovered ? "node-I2138_6229-2706_13779" : ""} className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector">
                <div className="absolute inset-[-5.54%_-4.99%]" style={{ "--stroke-0": "rgba(55, 65, 81, 1)" } as React.CSSProperties}>
                  <img className="block max-w-none size-full" alt="" src={imgLine1} />
                </div>
              </div>
            </div>
            <p id={isDefault ? "node-2138_21370" : isHovered ? "node-2138_6233" : ""} className={`font-[family-name:var(--font\\/family\\/font-sans,"Inter:Medium",sans-serif)] font-[var(--font\\/weight\\/font-medium,500)] leading-[var(--font\\/line-height\\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis`}>
              MyAwesomeProject (1)
            </p>
            <div id={isDefault ? "node-2138_37633" : isHovered ? "node-2138_6234" : ""} className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon">
              <div id={isDefault ? "node-I2138_37633-2706_16460" : isHovered ? "node-I2138_6234-2706_16460" : ""} className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape">
                <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                  <img className="block max-w-none size-full" alt="" src={imgLine2} />
                </div>
              </div>
            </div>
          </div>
          <div id={isDefault ? "node-2138_21716" : isHovered ? "node-2138_21888" : ""} className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags">
            <div id={isDefault ? "node-2138_21717" : isHovered ? "node-2138_21889" : ""} className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container">
              <div id={isDefault ? "node-2138_21718" : isHovered ? "node-2138_21890" : ""} className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag">
                <div id={isDefault ? "node-2138_21719" : isHovered ? "node-2138_21891" : ""} className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge">
                  <div id={isDefault ? "node-I2138_21719-6938_80982" : isHovered ? "node-I2138_21891-6938_80982" : ""} className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database">
                    <div id={isDefault ? "node-I2138_21719-6938_80982-2706_14985" : isHovered ? "node-I2138_21891-6938_80982-2706_14985" : ""} className="absolute inset-[8.33%_12.5%]" data-name="Vector">
                      <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                        <img className="block max-w-none size-full" alt="" src={imgLine3} />
                      </div>
                    </div>
                  </div>
                  <p id={isDefault ? "node-I2138_21719-135_1174" : isHovered ? "node-I2138_21891-135_1174" : ""} className={`font-[family-name:var(--font\\/family\\/font-sans,"Inter:Medium",sans-serif)] font-[var(--font\\/weight\\/font-medium,500)] leading-[var(--font\\/line-height\\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis`}>
                    Datasilo
                  </p>
                </div>
                <div className="flex flex-row items-center self-stretch">
                  <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                </div>
              </div>
            </div>
            <div id={isDefault ? "node-2138_21725" : isHovered ? "node-2138_21897" : ""} className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container">
              <div id={isDefault ? "node-2138_21726" : isHovered ? "node-2138_21898" : ""} className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag">
                <div id={isDefault ? "node-2138_21727" : isHovered ? "node-2138_21899" : ""} className="border-[var(--border,#d1d5db)] border-[var(--border-width\\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge">
                  <p id={isDefault ? "node-I2138_21727-136_1190" : isHovered ? "node-I2138_21899-136_1190" : ""} className={`font-[family-name:var(--font\\/family\\/font-sans,"Inter:Medium",sans-serif)] font-[var(--font\\/weight\\/font-medium,500)] leading-[var(--font\\/line-height\\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis`}>
                    Finance
                  </p>
                </div>
                <div id={isDefault ? "node-2138_21728" : isHovered ? "node-2138_21900" : ""} className="border-[var(--border,#d1d5db)] border-[var(--border-width\\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge">
                  <p id={isDefault ? "node-I2138_21728-136_1190" : isHovered ? "node-I2138_21900-136_1190" : ""} className={`font-[family-name:var(--font\\/family\\/font-sans,"Inter:Medium",sans-serif)] font-[var(--font\\/weight\\/font-medium,500)] leading-[var(--font\\/line-height\\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis`}>
                    HR
                  </p>
                </div>
                <div id={isDefault ? "node-2138_21729" : isHovered ? "node-2138_21901" : ""} className="border-[var(--border,#d1d5db)] border-[var(--border-width\\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge">
                  <p id={isDefault ? "node-I2138_21729-136_1190" : isHovered ? "node-I2138_21901-136_1190" : ""} className={`font-[family-name:var(--font\\/family\\/font-sans,"Inter:Medium",sans-serif)] font-[var(--font\\/weight\\/font-medium,500)] leading-[var(--font\\/line-height\\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis`}>
                    Marketing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id={isDefault ? "node-2140_5567" : isHovered ? "node-2140_5568" : ""} className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button">
          <div id={isDefault ? "node-I2140_5567-6724_7781" : isHovered ? "node-I2140_5568-6724_7781" : ""} className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical">
            <div id={isDefault ? "node-I2140_5567-6724_7781-2706_13617" : isHovered ? "node-I2140_5568-6724_7781-2706_13617" : ""} className="absolute inset-[16.67%_45.83%]" data-name="Vector">
              <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                <img className="block max-w-none size-full" alt="" src={imgLine4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
