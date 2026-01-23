const imgLine = "https://www.figma.com/api/mcp/asset/587ee4b6-fb1a-411c-8320-3b53c2970c43";
const img = "https://www.figma.com/api/mcp/asset/a333b26c-ef38-44e7-a908-b9207611b90f";
const img1 = "https://www.figma.com/api/mcp/asset/a7ce4983-6ea4-4647-a24e-ff7474ceeb0f";
const img2 = "https://www.figma.com/api/mcp/asset/a0ec02d1-90db-45be-bfe6-ce36183d7cc9";
const img3 = "https://www.figma.com/api/mcp/asset/da27e8a0-9d74-4a48-a754-1f42d35c1b97";
const img4 = "https://www.figma.com/api/mcp/asset/08f7cf8f-8106-4429-8978-893c0dad92ae";
const img5 = "https://www.figma.com/api/mcp/asset/8e9baa3a-247a-4144-8ac7-0a246ba741b3";
const img6 = "https://www.figma.com/api/mcp/asset/e99bf911-d7e1-4f91-b6ea-f2ac0cb2f777";
const img7 = "https://www.figma.com/api/mcp/asset/b7dce4ac-0446-437c-9d94-5f570f4330df";
const img8 = "https://www.figma.com/api/mcp/asset/ea837016-a811-481a-b07d-99f48d09ae85";
const img9 = "https://www.figma.com/api/mcp/asset/2ba55dba-4400-45ed-ab00-b3df992b7e60";
const img10 = "https://www.figma.com/api/mcp/asset/b033d253-641a-4da6-9596-2162dc2c8f44";
const img11 = "https://www.figma.com/api/mcp/asset/bd7a7d40-7926-42c4-aebe-0c9eeca02952";
const img12 = "https://www.figma.com/api/mcp/asset/d66bcffc-5c7f-4bae-9c88-6d9e67090432";
const img13 = "https://www.figma.com/api/mcp/asset/f13a2dbe-e571-48ae-adde-f7d10bf41352";
const img14 = "https://www.figma.com/api/mcp/asset/0b5f5cf2-bcb4-4da1-884e-c8f028889a70";
const img15 = "https://www.figma.com/api/mcp/asset/14037170-4cb1-407f-b09e-66ca10106d3d";
const img16 = "https://www.figma.com/api/mcp/asset/a331f32f-b0a4-4a68-a750-054025ae1bd1";
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

export default function Aside() {
  return (
    <div className="bg-[var(--sidebar\/sidebar,rgba(255,255,255,0.5))] content-stretch flex flex-col h-[1083px] items-start relative w-[420px]" data-name="Aside" data-node-id="2143:31510">
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[24px] relative shrink-0 w-full" data-name="Container" data-node-id="2119:17381">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Header" data-node-id="2119:17433">
          <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Bold',sans-serif)] font-[var(--font\/weight\/font-bold,700)] leading-[var(--font\/line-height\/leading-8,32px)] not-italic relative shrink-0 text-[color:var(--secondary-foreground,#374151)] text-[length:var(--text-xl,20px)] tracking-[-0.6px]" data-node-id="2119:17380">
            Company Knowledge
          </p>
          <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2119:17420">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / plus" data-node-id="I2119:17420;6715:46630">
              <div className="absolute inset-[20.83%]" data-name="Vector" data-node-id="I2119:17420;6715:46630;2706:15853">
                <div className="absolute inset-[-7.13%_-7.12%_-7.12%_-7.13%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                  <img alt="" className="block max-w-none size-full" src={img} />
                </div>
              </div>
            </div>
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--primary-foreground,white)] text-[length:var(--text-sm,14px)]" data-node-id="I2119:17420;6715:46629">
              New Project
            </p>
          </div>
        </div>
        <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex flex-col gap-[var(--p-2,0px)] items-start overflow-clip px-[var(--p-3,12px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,24px)] shadow-[var(--shadow\/xs\/layer-1\/x,0px)_var(--shadow\/xs\/layer-1\/y,4px)_var(--shadow\/xs\/layer-1\/blur,8px)_var(--shadow\/xs\/layer-1\/spread,-1px)_var(--shadow\/xs,rgba(0,0,0,0.1))] shrink-0 w-full" data-name="Input" data-node-id="2119:17382">
          <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Regular',sans-serif)] font-[var(--font\/weight\/font-normal,400)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--muted-foreground,#6b7280)] text-[length:var(--text-sm,14px)]" data-node-id="I2119:17382;29740:146740">
            Search projects
          </p>
        </div>
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Filters" data-node-id="2131:13192">
          <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2138:21927">
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--foreground,#1e293b)] text-[length:var(--text-sm,14px)]" data-node-id="I2138:21927;6724:6600">
              All Knowledge
            </p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / chevron-down" data-node-id="I2138:21927;6724:6601">
              <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector" data-node-id="I2138:21927;6724:6601;2706:13883">
                <div className="absolute inset-[-16.63%_-8.31%_-16.62%_-8.31%]" style={{ "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                  <img alt="" className="block max-w-none size-full" src={img1} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--custom\/bg-input-30,white)] border-[var(--border-width\/w-100,1px)] border-[var(--input,#d1d5db)] border-solid content-stretch flex gap-[var(--p-2,8px)] h-[36px] items-center justify-center px-[var(--p-4,16px)] py-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shadow-[var(--shadow\/2xs\/layer-1\/x,0px)_var(--shadow\/2xs\/layer-1\/y,4px)_var(--shadow\/2xs\/layer-1\/blur,8px)_0px_var(--shadow\/2xs,rgba(0,0,0,0.1))] shrink-0" data-name="Button" data-node-id="2131:13194">
            <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic relative shrink-0 text-[color:var(--foreground,#1e293b)] text-[length:var(--text-sm,14px)]" data-node-id="I2131:13194;6724:6600">
              View
            </p>
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / list-filter" data-node-id="I2131:13194;6724:6601">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector" data-node-id="I2131:13194;6724:6601;2706:14251">
                <div className="absolute inset-[-8.31%_-5.54%]" style={{ "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                  <img alt="" className="block max-w-none size-full" src={img2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-[var(--border,#d1d5db)] border-solid border-t content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="projects" data-node-id="2119:17044">
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:5994">
          <div className="absolute bg-[var(--colors\/amber\/600,#d97706)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:5994;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:5994;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:5994;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:5994;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:5994;2138:21162">
                  <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:5994;2138:21162;2706:15081">
                    <div className="absolute inset-[-4.99%_-5.54%]" style={{ "--stroke-0": "rgba(180, 83, 9, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img3} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:5994;2138:21370">
                  Operation Neptune Spear
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:5994;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:5994;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:5994;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:5994;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:5994;2138:21718">
                    <div className="bg-[var(--colors\/amber\/600,#d97706)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database" data-node-id="I2138:5994;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:5994;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
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
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:5994;2138:21729">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:5994;2138:21729;136:1182">
                        Research and Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:5994;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:5994;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:5994;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--custom\/bg-primary-10,rgba(23,23,23,0.05))] border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex flex-col gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:21947">
          <div className="absolute bg-[var(--colors\/red\/600,#dc2626)] bottom-[-1px] left-0 top-0 w-[8px]" data-name="border" data-node-id="I2138:21947;2138:6392" />
          <div className="content-stretch flex gap-[var(--p-4,16px)] items-start relative shrink-0 w-full" data-name="Project Info" data-node-id="I2138:21947;2138:20259">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:21947;2138:21367">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:21947;2138:6232">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:21947;2138:6229">
                  <div className="absolute inset-[16.67%_8.33%]" data-name="Vector" data-node-id="I2138:21947;2138:6229;2706:15911">
                    <div className="absolute inset-[-6.23%_-4.99%]" style={{ "--stroke-0": "rgba(185, 28, 28, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img7} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21947;2138:6233">
                  Potenzialanalyse Daimler Busses
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:21947;2138:6234">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:21947;2138:6234;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img8} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:21947;2138:21888">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21947;2138:21889">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21947;2138:21890">
                    <div className="bg-[var(--colors\/red\/600,#dc2626)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21891">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database" data-node-id="I2138:21947;2138:21891;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:21947;2138:21891;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
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
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21947;2138:21901">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21947;2138:21901;136:1182">
                        Sales
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:21947;2140:5568">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:21947;2140:5568;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:21947;2140:5568;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22037">
          <div className="absolute bg-[var(--colors\/indigo\/600,#4f46e5)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:22037;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22037;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22037;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22037;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:22037;2138:21162">
                  <div className="absolute inset-[8.37%_8.35%_8.34%_8.34%]" data-name="Vector" data-node-id="I2138:22037;2138:21162;2706:13829">
                    <div className="absolute inset-[-4.99%]" style={{ "--stroke-0": "rgba(67, 56, 202, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img9} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22037;2138:21370">
                  Task Force Red Wings
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:22037;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22037;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22037;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22037;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22037;2138:21718">
                    <div className="bg-[var(--colors\/indigo\/600,#4f46e5)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / folder" data-node-id="I2138:22037;2138:21719;6938:80982">
                        <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector" data-node-id="I2138:22037;2138:21719;6938:80982;2706:14503">
                          <div className="absolute inset-[-7.82%_-6.65%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                            <img alt="" className="block max-w-none size-full" src={img10} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22037;2138:21719;135:1174">
                        Project
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22037;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22037;2138:21726">
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22037;2138:21728">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22037;2138:21728;136:1182">
                        Intelligence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22037;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22037;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22037;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22128">
          <div className="absolute bg-[var(--colors\/amber\/600,#d97706)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:22128;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22128;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22128;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22128;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:22128;2138:21162">
                  <div className="absolute inset-[8.33%]" data-name="Vector" data-node-id="I2138:22128;2138:21162;2706:15003">
                    <div className="absolute inset-[-4.99%]" style={{ "--stroke-0": "rgba(180, 83, 9, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img11} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22128;2138:21370">
                  Project Viking Conquest
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:22128;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22128;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22128;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22128;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22128;2138:21718">
                    <div className="bg-[var(--colors\/amber\/600,#d97706)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database" data-node-id="I2138:22128;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22128;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
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
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22128;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22128;2138:21727;136:1182">
                        Equipment Maintenance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22128;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22128;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22128;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:6038">
          <div className="absolute bg-[var(--colors\/lime\/600,#65a30d)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:6038;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:6038;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:6038;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:6038;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:6038;2138:21162">
                  <div className="absolute inset-[12.5%_8.33%_33.33%_8.33%]" data-name="Vector" data-node-id="I2138:6038;2138:21162;2706:14623">
                    <div className="absolute inset-[-7.67%_-4.99%]" style={{ "--stroke-0": "rgba(77, 124, 15, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img12} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:6038;2138:21370">
                  Project Black Hawk Down
                </p>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:6038;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:6038;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:6038;2138:21718">
                    <div className="bg-[var(--colors\/lime\/600,#65a30d)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / folder" data-node-id="I2138:6038;2138:21719;6938:80982">
                        <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector" data-node-id="I2138:6038;2138:21719;6938:80982;2706:14503">
                          <div className="absolute inset-[-7.82%_-6.65%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                            <img alt="" className="block max-w-none size-full" src={img10} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:6038;2138:21719;135:1174">
                        Project
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:6038;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:6038;2138:21726">
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:6038;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:6038;2138:21727;136:1182">
                        Cybersecurity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:6038;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:6038;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:6038;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:21948">
          <div className="absolute bg-[var(--colors\/violet\/600,#7c3aed)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:21948;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:21948;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:21948;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:21948;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:21948;2138:21162">
                  <div className="absolute inset-[8.33%]" data-name="Vector" data-node-id="I2138:21948;2138:21162;2706:15399">
                    <div className="absolute inset-[-4.99%]" style={{ "--stroke-0": "rgba(109, 40, 217, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img13} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21948;2138:21370">
                  Mission Enduring Freedom
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:21948;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:21948;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img8} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:21948;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21948;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21948;2138:21718">
                    <div className="bg-[var(--colors\/violet\/600,#7c3aed)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / folder" data-node-id="I2138:21948;2138:21719;6938:80982">
                        <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector" data-node-id="I2138:21948;2138:21719;6938:80982;2706:14503">
                          <div className="absolute inset-[-7.82%_-6.65%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                            <img alt="" className="block max-w-none size-full" src={img10} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:21948;2138:21719;135:1174">
                        Project
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:21948;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:21948;2138:21726">
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:21948;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:21948;2138:21727;136:1182">
                        Mission Planning
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:21948;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:21948;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:21948;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22129">
          <div className="absolute bg-[var(--colors\/teal\/600,#0d9488)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:22129;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22129;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22129;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22129;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:22129;2138:21162">
                  <div className="absolute bottom-1/4 left-[8.33%] right-[8.33%] top-1/4" data-name="Vector" data-node-id="I2138:22129;2138:21162;2706:14073">
                    <div className="absolute inset-[-8.31%_-4.99%]" style={{ "--stroke-0": "rgba(15, 118, 110, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img14} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22129;2138:21370">
                  Exercise Rolling Thunder
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:22129;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22129;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22129;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22129;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22129;2138:21718">
                    <div className="bg-[var(--colors\/teal\/600,#0d9488)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database" data-node-id="I2138:22129;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22129;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
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
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22129;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22129;2138:21727;136:1182">
                        Weapon Systems
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22129;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22129;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22129;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22038">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:22038;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22038;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22038;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22038;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:22038;2138:21162">
                  <div className="absolute inset-[12.53%_8.34%_12.5%_8.34%]" data-name="Vector" data-node-id="I2138:22038;2138:21162;2706:13779">
                    <div className="absolute inset-[-5.54%_-4.99%]" style={{ "--stroke-0": "rgba(55, 65, 81, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img15} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22038;2138:21370">
                  Operation Anaconda Strike
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:22038;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22038;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img8} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22038;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22038;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22038;2138:21718">
                    <div className="bg-[var(--muted-foreground,#6b7280)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / folder" data-node-id="I2138:22038;2138:21719;6938:80982">
                        <div className="absolute inset-[12.5%_8.33%_16.67%_8.33%]" data-name="Vector" data-node-id="I2138:22038;2138:21719;6938:80982;2706:14503">
                          <div className="absolute inset-[-7.82%_-6.65%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
                            <img alt="" className="block max-w-none size-full" src={img10} />
                          </div>
                        </div>
                      </div>
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--primary-foreground,white)] text-ellipsis" data-node-id="I2138:22038;2138:21719;135:1174">
                        Project
                      </p>
                    </div>
                    <div className="flex flex-row items-center self-stretch">
                      <Separator className="content-stretch flex flex-col gap-[var(--p-0,0px)] h-full items-start p-[var(--p-0,0px)] relative shrink-0 w-0" />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22038;2138:21725">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22038;2138:21726">
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22038;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22038;2138:21727;136:1182">
                        Base Operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22038;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22038;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22038;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
                    <img alt="" className="block max-w-none size-full" src={img6} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-[var(--border,#d1d5db)] border-b border-solid content-stretch flex gap-[var(--p-4,16px)] items-start overflow-clip px-[24px] py-[20px] relative shrink-0 w-full" data-name="Project" data-node-id="2138:22130">
          <div className="absolute bg-[var(--colors\/green\/600,#16a34a)] bottom-[-1px] left-[-8px] top-0 w-[8px]" data-name="border" data-node-id="I2138:22130;2138:21356" />
          <div className="content-stretch flex flex-[1_0_0] gap-[var(--p-4,16px)] items-start min-h-px min-w-px relative self-stretch" data-name="Project Info" data-node-id="I2138:22130;2138:21160">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--p-3,12px)] items-start justify-center min-h-px min-w-px relative" data-name="Project Details" data-node-id="I2138:22130;2138:21368">
              <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Project Header" data-node-id="I2138:22130;2138:21369">
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Project Icon" data-node-id="I2138:22130;2138:21162">
                  <div className="absolute inset-[8.33%]" data-name="Vector" data-node-id="I2138:22130;2138:21162;2706:14465">
                    <div className="absolute inset-[-4.99%]" style={{ "--stroke-0": "rgba(0, 86, 167, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img16} />
                    </div>
                  </div>
                </div>
                <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-5,20px)] not-italic overflow-hidden relative shrink-0 text-[14px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22130;2138:21370">
                  Mission Guardian Angel
                </p>
                <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Star Icon" data-node-id="I2138:22130;2138:37633">
                  <div className="absolute inset-[6.25%_6.25%_10.33%_6.25%]" data-name="shape" data-node-id="I2138:22130;2138:37633;2706:16460">
                    <div className="absolute inset-0" style={{ "--fill-0": "rgba(202, 138, 4, 1)" } as React.CSSProperties}>
                      <img alt="" className="block max-w-none size-full" src={img4} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Project Tags" data-node-id="I2138:22130;2138:21716">
                <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag Container" data-node-id="I2138:22130;2138:21717">
                  <div className="content-stretch flex gap-[9px] items-center relative shrink-0" data-name="Project Tag" data-node-id="I2138:22130;2138:21718">
                    <div className="bg-[var(--primary,#0056a7)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21719">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Lucide Icons / database" data-node-id="I2138:22130;2138:21719;6938:80982">
                        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector" data-node-id="I2138:22130;2138:21719;6938:80982;2706:14985">
                          <div className="absolute inset-[-6.65%_-7.39%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
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
                    <div className="bg-[var(--secondary,#e5e7eb)] content-stretch flex gap-[var(--p-1,4px)] items-center justify-center overflow-clip px-[var(--p-2,8px)] py-[var(--p-0\,5,2px)] relative rounded-[var(--calc(var(--radius)-2px),12px)] shrink-0" data-name="Badge" data-node-id="I2138:22130;2138:21727">
                      <p className="font-[family-name:var(--font\/family\/font-sans,'Inter:Medium',sans-serif)] font-[var(--font\/weight\/font-medium,500)] leading-[var(--font\/line-height\/leading-4,16px)] not-italic overflow-hidden relative shrink-0 text-[12px] text-[color:var(--secondary-foreground,#374151)] text-ellipsis" data-node-id="I2138:22130;2138:21727;136:1182">
                        Ground Forces
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--p-2,0px)] items-center justify-center p-[var(--p-2,8px)] relative rounded-[var(--radius,32px)] shrink-0 size-[36px]" data-name="Button" data-node-id="I2138:22130;2140:5567">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Lucide Icons / ellipsis-vertical" data-node-id="I2138:22130;2140:5567;6724:7781">
                <div className="absolute inset-[16.67%_45.83%]" data-name="Vector" data-node-id="I2138:22130;2140:5567;6724:7781;2706:13617">
                  <div className="absolute inset-[-6.23%_-49.88%]" style={{ "--fill-0": "rgba(30, 41, 59, 1)", "--stroke-0": "rgba(30, 41, 59, 1)" } as React.CSSProperties}>
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