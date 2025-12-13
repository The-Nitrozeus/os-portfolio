import React from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useOS, type WindowState } from '../../context/OSContext';
import clsx from 'clsx';

interface WindowProps {
    window: WindowState;
}

const Window: React.FC<WindowProps> = ({ window }) => {
    const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow } = useOS();
    const dragControls = useDragControls();

    const isMaximized = window.isMaximized;

    if (window.isMinimized) return null;

    return (
        <motion.div
            drag={!isMaximized}
            dragMomentum={false}
            dragListener={false}
            dragControls={dragControls}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                width: isMaximized ? '100vw' : 800,
                height: isMaximized ? '100vh' : 600,
                x: isMaximized ? 0 : undefined,
                y: isMaximized ? 0 : undefined,
                top: isMaximized ? 0 : 100, // naive positioning
                left: isMaximized ? 0 : 100,
                position: 'absolute'
            }}
            style={{ zIndex: window.zIndex }}
            className={clsx(
                "bg-gray-900/90 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl overflow-hidden flex flex-col",
                isMaximized ? "rounded-none h-full w-full inset-0" : ""
            )}
            onMouseDown={() => focusWindow(window.id)}
        >
            {/* Window Header */}
            <div
                className="h-10 bg-white/5 border-b border-white/10 flex items-center justify-between px-3 select-none cursor-default"
                onPointerDown={(e) => {
                    if (!isMaximized) dragControls.start(e)
                }}
            >
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-300">{window.title}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }} className="p-1 hover:bg-white/10 rounded"><Minus size={14} /></button>
                    <button onClick={(e) => { e.stopPropagation(); isMaximized ? restoreWindow(window.id) : maximizeWindow(window.id); }} className="p-1 hover:bg-white/10 rounded">
                        {isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }} className="p-1 hover:bg-red-500/80 rounded hover:text-white"><X size={14} /></button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 text-gray-200">
                {window.component}
            </div>
        </motion.div>
    );
};


// Wait, I can't pass controls easily without prop drilling. 
// A better pattern: The parent motion.div has `dragControls={controls}` and `dragListener={false}`.
// The header receives `controls` as prop and calls `controls.start(e)`.
export default Window;
