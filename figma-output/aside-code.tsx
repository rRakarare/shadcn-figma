const imgLine = "https://www.figma.com/api/mcp/asset/6567c7c8-c092-4c52-8202-5ea1a319213f";
const img = "https://www.figma.com/api/mcp/asset/b3c5ae3f-25b4-4120-91ca-1d979ea9c30b";
const img1 = "https://www.figma.com/api/mcp/asset/e5956204-a694-4112-871e-98faac7b0c10";
const img2 = "https://www.figma.com/api/mcp/asset/58690624-3681-4ad7-8f49-88c184ac26c3";
const img3 = "https://www.figma.com/api/mcp/asset/758dff83-4ef3-44f2-a86a-21b44a16bbd7";
const img4 = "https://www.figma.com/api/mcp/asset/c892bbc0-c218-4de0-bab5-edc8d33bb587";
const img5 = "https://www.figma.com/api/mcp/asset/bfd77c06-cd48-43ca-b499-973873941fb3";
const img6 = "https://www.figma.com/api/mcp/asset/b273f478-6b90-41b5-b99c-1050f059b1c8";
const img7 = "https://www.figma.com/api/mcp/asset/86608b24-c344-40d7-9f8d-e14bb456f0fc";
const img8 = "https://www.figma.com/api/mcp/asset/9b7329b1-c664-4139-a8cb-c696a8700788";
const img9 = "https://www.figma.com/api/mcp/asset/d4ed427b-1188-4642-870d-56986ed58030";

function Separator({ className }: { className?: string }) {
  return (
    <div className={className || ""} data-name="Separator" data-node-id="2232:5627">
      <div className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-[24px] items-start p-[var(--p-0,0px)] relative w-0" data-name="Horizontal=False" data-node-id="2232:5629">
        <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative w-0">
          <div className="-rotate-90 flex-none h-full">
            <div className="h-full relative w-[24px]" data-name="Line" data-node-id="2232:5631">
              <div className="absolute inset-[-1px_0_0_0]">
                <img alt="" className="block max-w-none size-full" src={imgLine} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Aside({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[var(--sidebar\/sidebar,rgba(255,255,255,0.5))] content-stretch flex flex-col h-[1083px] items-start relative w-[420px]"} data-name="Aside" data-node-id="2143:31510">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-full" data-name="Container" data-node-id="2119:17381">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header" data-node-id="2119:17433">
          <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Bold',sans-serif)] font-[var(--font\/weight\/font-bold,700)] leading-[var(--font\/line-height\/leading-8,32px)] not-italic relative shrink-0 text-[color:var(--secondary-foreground,#374151)] text-[length:var(--text-xl,20px)] tracking-[-0.6px]" data-node-id="2119:17380">
            Company Knowledge
          </p>
          <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2119:17420">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / plus" data-node-id="I2119:17420;6715:46630">
              <div className="absolute inset-[20.83%]" data-name="Vector" data-node-id="I2119:17420;6715:46630;2706:15853">
                <div className="absolute inset-[-7.13%_-7.12%_-7.12%_-7.13%]">
                  <img alt="" className="block max-w-none size-full" src={img} />
                </div>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--primary-foreground,white)] text-[length:var(--text-sm,14px)]" data-node-id="I2119:17420;6715:46629">
              New Project
            </p>
          </div>
        </div>
        <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex flex-col gap-[var(--p-2,0px)] items-start overflow-clip px-[var(--p-3,12px)] py-[var(--p-2,8px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,4px)_var(--shadow\/xs\/layer-1\/blur,8px)_var(--shadow\/xs\/layer-1\/spread,-1px)_var(--shadow\/xs,rgba(0,0,0,0.1))] shrink-0 w-full" data-name="Input" data-node-id="2119:17382">
          <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--muted-foreground,#6b7280)] text-[length:var(--text-sm,14px)]" data-node-id="I2119:17382;29740:146740">
            Search projects
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Filters" data-node-id="2131:13192">
          <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2138:21927">
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--foreground,#1e293b)] text-[length:var(--text-sm,14px)]" data-node-id="I2138:21927;6724:6600">
              All Knowledge
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / chevron-down" data-node-id="I2138:21927;6724:6601">
              <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I2138:21927;6724:6601;2706:13883">
                <div className="absolute inset-[-16.63%_-8.31%_-16.62%_-8.31%]">
                  <img alt="" className="block max-w-none size-full" src={img1} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2131:13194">
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--foreground,#1e293b)] text-[length:var(--text-sm,14px)]" data-node-id="I2131:13194;6724:6600">
              View
            </p>
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / list-filter" data-node-id="I2131:13194;6724:6601">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector" data-node-id="I2131:13194;6724:6601;2706:14251">
                <div className="absolute inset-[-8.31%_-5.54%]">
                  <img alt="" className="block max-w-none size-full" src={img2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-[var(--border,#d1d5db)] border-solid border-t content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="projects" data-node-id="2119:17044">
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-[462px]" data-name="Project" data-node-id="2138:5994">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:5994;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:5994;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:5994;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:5994;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:5994;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:5994;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:5994;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:5994;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:5994;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:5994;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:5994;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:5994;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:5994;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:5994;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]">
                            <img alt="" className="block max-w-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:5994;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:5994;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:5994;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:5994;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:5994;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:5994;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:5994;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:5994;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:5994;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--custom\/bg-primary-10,rgba(23,23,23,0.05))] border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex flex-col gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:21947">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-0 top-0 w-[8px]" data-name="border" data-node-id="I2138:21947;2138:6392" />
          <div className="content-stretch flex gap-[var(--p-4,16px)] items-start relative shrink-0 w-full" data-name="Project Info" data-node-id="I2138:21947;2138:20259">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:21947;2138:21367">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:21947;2138:6232">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:21947;2138:6229">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:21947;2138:6229;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21947;2138:6233">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:21947;2138:6234">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:21947;2138:6234;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img7} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:21947;2138:21888">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21947;2138:21889">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21947;2138:21890">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21891">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:21947;2138:21891;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:21947;2138:21891;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]">
                            <img alt="" className="block max-w-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:21947;2138:21891;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21947;2138:21897">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21947;2138:21898">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21899">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21947;2138:21899;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21900">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21947;2138:21900;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21901">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21947;2138:21901;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:21947;2140:5568">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:21947;2140:5568;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:21947;2140:5568;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-[462px]" data-name="Project" data-node-id="2138:22037">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:22037;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22037;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22037;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22037;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:22037;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22037;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22037;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:22037;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22037;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22037;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22037;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22037;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:22037;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22037;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-3.33%_-3.69%]">
                            <img alt="" className="block max-w-none size-full" src={img8} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22037;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22037;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22037;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22037;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22037;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22037;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22037;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22037;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22037;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22128">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:22128;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22128;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22128;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22128;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:22128;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22128;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22128;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:22128;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22128;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22128;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22128;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22128;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:22128;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22128;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]">
                            <img alt="" className="block max-w-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22128;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22128;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22128;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22128;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22128;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22128;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22128;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22128;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22128;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:6038">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:6038;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:6038;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:6038;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:6038;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:6038;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:6038;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:6038;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:6038;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:6038;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img7} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:6038;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:6038;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:6038;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:6038;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:6038;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-3.33%_-3.69%]">
                            <img alt="" className="block max-w-none size-full" src={img8} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:6038;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:6038;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:6038;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:6038;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:6038;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:6038;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:6038;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:6038;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:6038;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:21948">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:21948;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:21948;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:21948;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:21948;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:21948;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:21948;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21948;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:21948;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:21948;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img7} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:21948;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21948;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21948;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:21948;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:21948;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-3.33%_-3.69%]">
                            <img alt="" className="block max-w-none size-full" src={img8} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:21948;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21948;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21948;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21948;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21948;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:21948;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:21948;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:21948;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:21948;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22129">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:22129;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22129;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22129;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22129;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:22129;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22129;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22129;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:22129;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22129;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22129;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22129;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22129;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:22129;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22129;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]">
                            <img alt="" className="block max-w-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22129;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22129;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22129;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22129;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22129;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22129;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22129;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22129;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22129;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22038">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:22038;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22038;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22038;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22038;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:22038;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22038;2138:21162;2706:13779">
                    <div className="absolute inset-[-5.54%_-4.99%]">
                      <img alt="" className="block max-w-none size-full" src={img9} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22038;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:22038;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22038;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img7} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22038;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22038;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22038;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:22038;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22038;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-3.33%_-3.69%]">
                            <img alt="" className="block max-w-none size-full" src={img8} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22038;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22038;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22038;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22038;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22038;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22038;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22038;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22038;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22038;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22130">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[4px]" data-name="border" data-node-id="I2138:22130;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22130;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22130;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22130;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / crown" data-node-id="I2138:22130;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22130;2138:21162;2706:13779">
                    <div className="absolute inset-[-3.7%_-3.33%]">
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22130;2138:21370">
                  MyAwesomeProject (1)
                </p>
                <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / star-filled" data-node-id="I2138:22130;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22130;2138:37633;2706:16460">
                    <img alt="" className="block max-w-none size-full" src={img4} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22130;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22130;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22130;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / database" data-node-id="I2138:22130;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22130;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]">
                            <img alt="" className="block max-w-none size-full" src={img5} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22130;2138:21719;135:1174">
                        Datasilo
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22130;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22130;2138:21726">
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22130;2138:21727;136:1190">
                        Finance
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22130;2138:21728;136:1190">
                        HR
                      </p>
                    </div>
                    <div className="border-[var(--border,#d1d5db)] border-[var(--border-width\/w-100,1px)] border-solid content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--foreground,#1e293b)] text-ellipsis" data-node-id="I2138:22130;2138:21729;136:1190">
                        Marketing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22130;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22130;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22130;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]">
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}