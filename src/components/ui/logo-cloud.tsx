'use client'

import { cn } from "../../lib/utils";

type Logo = {
  name: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos?: Logo[];
};

const defaultLogos: Logo[] = [
  { name: "Stripe" },
  { name: "Amazon" },
  { name: "Slack" },
  { name: "Google" },
  { name: "Microsoft" },
  { name: "Salesforce" },
  { name: "IBM" },
  { name: "Oracle" },
];

export function LogoCloud({ className, logos = defaultLogos, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative",
        className
      )}
      {...props}
    >
      {/* Glass card container matching hero aesthetic */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.03)] p-8 md:p-10">
        {/* Logo grid */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14 lg:gap-x-16">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="group relative"
            >
              <span 
                className="text-base md:text-lg font-bold tracking-tight text-slate-300 group-hover:text-slate-500 transition-all duration-500 font-serif cursor-default select-none"
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoCloud;
