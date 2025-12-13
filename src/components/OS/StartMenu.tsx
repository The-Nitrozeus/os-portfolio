import React, { useState } from 'react';
import { Search, Terminal, User, FolderGit2, Settings, Power } from 'lucide-react';
import { useOS } from '../../context/OSContext';
import AboutMe from '../Apps/AboutMe';
import Projects from '../Apps/Projects';
import TerminalApp from '../Apps/Terminal';
import SettingsApp from '../Apps/Settings';
import clsx from 'clsx';

interface StartMenuProps {
    onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
    const { openWindow } = useOS();
    const [searchTerm, setSearchTerm] = useState('');

    const apps = [
        { id: 'terminal', title: 'Terminal', icon: Terminal, component: <TerminalApp /> },
        { id: 'about', title: 'About Me', icon: User, component: <AboutMe /> },
        { id: 'projects', title: 'Projects', icon: FolderGit2, component: <Projects /> },
        { id: 'settings', title: 'Settings', icon: Settings, component: <SettingsApp /> },
    ];

    const filteredApps = apps.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAppClick = (app: typeof apps[0]) => {
        openWindow(app.id, app.title, app.component, app.icon);
        onClose();
    };

    return (
        <div className="absolute bottom-12 left-4 w-80 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-50 text-white animate-in slide-in-from-bottom-2 duration-200">
            {/* Search Bar */}
            <div className="p-4 border-b border-white/5">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search apps..."
                        className="w-full bg-gray-800/50 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            {/* App Grid */}
            <div className="p-4 grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto">
                {filteredApps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => handleAppClick(app)}
                        className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group"
                    >
                        <div className={clsx("p-2 rounded-lg transition-colors group-hover:scale-110 duration-200",
                            // Simple accent color application for icon background if wanted, staying neutral for now
                            "bg-gray-800"
                        )}>
                            <app.icon size={24} className="text-gray-200" />
                        </div>
                        <span className="text-xs text-center text-gray-300 truncate w-full">{app.title}</span>
                    </button>
                ))}
                {filteredApps.length === 0 && (
                    <div className="col-span-4 text-center text-gray-500 py-8 text-sm">
                        No apps found
                    </div>
                )}
            </div>

            {/* User Profile / Power */}
            <div className="bg-gray-800/80 p-4 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                            <span className="text-xs">SP</span>
                        </div>
                    </div>
                    <span className="text-sm font-medium">Somnath Paul</span>
                </div>
                <button className="p-2 hover:bg-white/10 rounded-md text-red-400 transition-colors">
                    <Power size={18} />
                </button>
            </div>
        </div>
    );
};

export default StartMenu;
