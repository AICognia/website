'use client';
import { cn } from '@/src/lib/utils';
import { useRef, useEffect, useState, useId } from 'react';

type InfiniteSliderProps = {
    children: React.ReactNode;
    gap?: number;
    duration?: number;
    durationOnHover?: number;
    direction?: 'horizontal' | 'vertical';
    reverse?: boolean;
    speed?: number;
    speedOnHover?: number;
    className?: string;
};

export function InfiniteSlider({
    children,
    gap = 16,
    duration = 25,
    durationOnHover,
    direction = 'horizontal',
    reverse = false,
    className,
}: InfiniteSliderProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [copies, setCopies] = useState(3);
    const uniqueId = useId().replace(/:/g, '');

    useEffect(() => {
        if (!scrollerRef.current || !contentRef.current) return;

        const content = contentRef.current;
        const scroller = scrollerRef.current.parentElement;

        if (!scroller) return;

        // Get the width of one set of content
        const contentWidth = content.offsetWidth;
        const viewportWidth = scroller.offsetWidth;

        // Calculate how many copies we need to ensure seamless scrolling
        // Need enough to fill viewport + one extra set for the seamless loop
        const copiesNeeded = Math.max(3, Math.ceil((viewportWidth * 2) / contentWidth) + 2);

        setCopies(copiesNeeded);
    }, [children]);

    const animationName = `infinite-scroll-${uniqueId}`;

    return (
        <div className={cn('overflow-hidden', className)}>
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes ${animationName} {
                        from { transform: translateX(0); }
                        to { transform: translateX(calc(-100% / ${copies} - ${gap / copies}px)); }
                    }
                `
            }} />
            <div
                ref={scrollerRef}
                className="flex w-max"
                style={{
                    gap: `${gap}px`,
                    flexDirection: direction === 'horizontal' ? 'row' : 'column',
                    animation: `${animationName} ${duration}s linear infinite`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {Array.from({ length: copies }).map((_, i) => (
                    <div
                        key={i}
                        ref={i === 0 ? contentRef : undefined}
                        className="flex shrink-0"
                        style={{ gap: `${gap}px` }}
                        aria-hidden={i > 0 ? true : undefined}
                    >
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}
