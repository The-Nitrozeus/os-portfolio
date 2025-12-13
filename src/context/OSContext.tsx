import React, { createContext, useContext, useState, type ReactNode, useCallback } from 'react';

export interface WindowState {
    id: string;
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
    component: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    isMaximized: boolean;
    zIndex: number;
}

interface OSContextType {
    windows: WindowState[];
    activeWindowId: string | null;
    wallpaper: string;
    accentColor: string;
    setWallpaper: (url: string) => void;
    setAccentColor: (color: string) => void;
    openWindow: (id: string, title: string, component: React.ReactNode, icon?: React.ComponentType) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    maximizeWindow: (id: string) => void;
    restoreWindow: (id: string) => void;
    focusWindow: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [windows, setWindows] = useState<WindowState[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [maxZIndex, setMaxZIndex] = useState(1);
    const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');
    const [accentColor, setAccentColor] = useState('blue');

    const focusWindow = useCallback((id: string) => {
        setActiveWindowId(id);
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id ? { ...win, zIndex: maxZIndex + 1, isMinimized: false } : win
            )
        );
        setMaxZIndex((prev) => prev + 1);
    }, [maxZIndex]);

    const openWindow = useCallback((id: string, title: string, component: React.ReactNode, icon?: React.ComponentType) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === id);
            if (existing) {
                focusWindow(id);
                return prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w);
            }
            const newWindow: WindowState = {
                id,
                title,
                icon,
                component,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                zIndex: maxZIndex + 1,
            };
            return [...prev, newWindow];
        });
        setActiveWindowId(id);
        setMaxZIndex((prev) => prev + 1);
    }, [maxZIndex, focusWindow]);

    const closeWindow = useCallback((id: string) => {
        setWindows((prev) => prev.filter((win) => win.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((win) => (win.id === id ? { ...win, isMinimized: true } : win))
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const maximizeWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((win) => (win.id === id ? { ...win, isMaximized: true, isMinimized: false } : win))
        );
        focusWindow(id);
    }, [focusWindow]);

    const restoreWindow = useCallback((id: string) => {
        setWindows((prev) =>
            prev.map((win) => (win.id === id ? { ...win, isMaximized: false, isMinimized: false } : win))
        );
        focusWindow(id);
    }, [focusWindow]);

    return (
        <OSContext.Provider
            value={{
                windows,
                activeWindowId,
                wallpaper,
                accentColor,
                setWallpaper,
                setAccentColor,
                openWindow,
                closeWindow,
                minimizeWindow,
                maximizeWindow,
                restoreWindow,
                focusWindow,
            }}
        >
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
};
