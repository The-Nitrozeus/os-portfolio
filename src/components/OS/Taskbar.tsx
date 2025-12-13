import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import clsx from 'clsx';
import StartMenu from './StartMenu';

const Taskbar: React.FC = () => {
    const { windows, activeWindowId, focusWindow, minimizeWindow, accentColor } = useOS();
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    // Use HTMLDivElement for the container ref, but we will handle the button click separately or type it more loosely if needed, 
    // or just use a separate ref for the button if precise typing is desired. 
    // For simplicity here, I'll use a generic ref or just the wrapper div logic.
    const startMenuRef = useRef<HTMLDivElement>(null);

    const getAccentClass = (color: string) => {
        switch (color) {
            case 'purple': return 'bg-purple-600/90 hover:bg-purple-500';
            case 'emerald': return 'bg-emerald-600/90 hover:bg-emerald-500';
            case 'orange': return 'bg-orange-600/90 hover:bg-orange-500';
            case 'pink': return 'bg-pink-600/90 hover:bg-pink-500';
            default: return 'bg-blue-600/90 hover:bg-blue-500';
        }
    };

    const [time, setTime] = useState(new Date());

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close Start Menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
                setStartMenuOpen(false);
            }
        };

        if (startMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [startMenuOpen]);

    return (
        <>
            {/* Start Menu Popup */}
            {startMenuOpen && (
                <div ref={startMenuRef} className="absolute bottom-12 left-0 z-50">
                    <StartMenu onClose={() => setStartMenuOpen(false)} />
                </div>
            )}

            <div className="h-12 bg-gray-900/80 backdrop-blur-md border-t border-white/10 fixed bottom-0 left-0 right-0 flex items-center justify-between px-4 z-40 select-none">

                <div className="flex items-center gap-4">
                    {/* Start Button */}
                    <button
                        // We can attach the ref here too if we want clicks on the button to be considered 'inside' the menu context for closing logic
                        // But actually, the logic `!startMenuRef.current.contains(target)` naturally handles it if the button is NOT inside the ref.
                        // However, we want the button to TOGGLE. If we click the button while open, the outside click handler might fire first?
                        // Let's wrapping both in a parent or just prevent propagation if needed.
                        // Simpler: Just don't put the ref on the button and handle button click explicitly.
                        // BUT, if we click the button to CLOSE, the outside click logic might conflict.
                        // Easy fix: Check if the click target is the button in the effect, OR just put the button INSIDE the ref container effectively by structure? 
                        // Actually, let's keep it simple: Button toggles. Outside click closes.
                        // If I click the button while open, it triggers toggle -> close.
                        // If outside click fires, it closes.
                        // To avoid conflict, commonly the button is part of the "area" or we check explicitly.
                        // Let's try adding a separate ref for the button.
                        className={clsx("p-2 rounded-md transition-colors", getAccentClass(accentColor), startMenuOpen && "brightness-125 ring-2 ring-white/20")}
                        onClick={(e) => {
                            e.stopPropagation();
                            setStartMenuOpen(!startMenuOpen);
                        }}
                    >
                        <div className="grid grid-cols-2 gap-0.5">
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                    </button>

                    {/* Open Windows / Pinned Apps */}
                    <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                        {windows.map(win => (
                            <button
                                key={win.id}
                                onClick={() => win.id === activeWindowId && !win.isMinimized ? minimizeWindow(win.id) : focusWindow(win.id)}
                                className={clsx(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-md transition-all",
                                    win.id === activeWindowId && !win.isMinimized ? "bg-white/10 shadow-inner" : "hover:bg-white/5",
                                    win.isMinimized && "opacity-50"
                                )}
                            >
                                {win.icon ? <win.icon className="w-4 h-4 text-blue-300" /> : <div className="w-4 h-4 bg-gray-500 rounded-sm" />}
                                <span className="text-xs text-white max-w-[100px] truncate hidden sm:block">{win.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* System Tray */}
                <div className="flex items-center gap-4 text-xs text-white">
                    <span>{time.toLocaleDateString()}</span>
                    <span>{formatTime(time)}</span>
                </div>

            </div>
        </>
    );
};

export default Taskbar;
