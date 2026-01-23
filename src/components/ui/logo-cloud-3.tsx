import { InfiniteSlider } from "./infinite-slider";
import { Sparkles } from "./sparkles";
import { cn } from "../../lib/utils";

type Logo = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
    // Split logos into two rows
    const halfLength = Math.ceil(logos.length / 2);
    const topRowLogos = logos.slice(0, halfLength);
    const bottomRowLogos = logos.slice(halfLength);

    // Cognia Blue Filter (approximate match for #0ea5e9 / #1E40AF)
    const blueFilter = "brightness(0) saturate(100%) invert(32%) sepia(78%) saturate(1637%) hue-rotate(204deg) brightness(96%) contrast(96%)";

    return (
        <div
            {...props}
            className={cn(
                "relative group max-w-6xl mx-auto perspective-1000",
                className
            )}
        >
            {/* The Ribbon Structure */}
            <div className="relative pl-6 pr-16 py-6 transition-all duration-500">
                
                {/* Main Ribbon Face (Visible on Hover) */}
                <div className="absolute inset-0 right-12 bg-gradient-to-r from-blue-50/90 to-blue-100/90 backdrop-blur-md rounded-l-2xl border border-blue-200/50 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 origin-right z-10">
                    {/* Sparkles Background */}
                    <Sparkles
                        density={200}
                        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)]"
                        color="#1E40AF"
                        size={0.8}
                        speed={0.5}
                        opacity={0.6}
                    />
                </div>

                {/* The Fold/Crease (Darker Blue Triangle) */}
                <div 
                    className="absolute top-0 right-12 w-4 h-full bg-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none mix-blend-multiply"
                    style={{ 
                        background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)' 
                    }}
                />

                {/* The Wrapped Tail (Behind) */}
                <div className="absolute top-3 bottom-3 right-0 w-16 bg-blue-200/80 rounded-r-lg border border-blue-300/50 shadow-inner opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 transform translate-x-0 group-hover:-translate-x-2" />

                {/* The Connecting Fold (Triangle at top/bottom corners) */}
                <div className="absolute top-0 right-12 w-4 h-3 bg-blue-800/20 skew-y-12 origin-top-right opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 blur-[1px]" />


                {/* Content Container (Logos) */}
                <div className="relative z-30 flex flex-col gap-4">
                    {/* Top Row */}
                    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <InfiniteSlider gap={50} duration={45}>
                            {topRowLogos.map((logo) => (
                                <img
                                    alt={logo.alt}
                                    className="pointer-events-none h-6 w-auto select-none opacity-60 group-hover:opacity-100 transition-all duration-500"
                                    style={{ filter: blueFilter }}
                                    height={logo.height || "auto"}
                                    key={`logo-top-${logo.alt}`}
                                    loading="lazy"
                                    src={logo.src}
                                    width={logo.width || "auto"}
                                />
                            ))}
                        </InfiniteSlider>
                    </div>
                    
                    {/* Bottom Row - Reverse */}
                    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <InfiniteSlider gap={50} reverse duration={45}>
                            {bottomRowLogos.map((logo) => (
                                <img
                                    alt={logo.alt}
                                    className="pointer-events-none h-6 w-auto select-none opacity-60 group-hover:opacity-100 transition-all duration-500"
                                    style={{ filter: blueFilter }}
                                    height={logo.height || "auto"}
                                    key={`logo-bottom-${logo.alt}`}
                                    loading="lazy"
                                    src={logo.src}
                                    width={logo.width || "auto"}
                                />
                            ))}
                        </InfiniteSlider>
                    </div>
                </div>

            </div>
        </div>
    );
}
