import React from 'react';
import { useOS } from '../../context/OSContext';
import { Terminal as TerminalIcon, User, FolderGit2, Settings } from 'lucide-react';
import Terminal from '../Apps/Terminal';
import AboutMe from '../Apps/AboutMe';
import Projects from '../Apps/Projects';
import SettingsApp from '../Apps/Settings';

const Desktop: React.FC = () => {
    const { openWindow } = useOS();

    const desktopIcons = [
        {
            id: 'terminal',
            title: 'Terminal',
            icon: TerminalIcon,
            component: <Terminal />
        },
        {
            id: 'about',
            title: 'About Me',
            icon: User,
            component: <AboutMe />
        },
        {
            id: 'projects',
            title: 'Projects',
            icon: FolderGit2,
            component: <Projects />
        },
        {
            id: 'settings',
            title: 'Settings',
            icon: Settings,
            component: <SettingsApp />
        },
    ];

    return (
        <div className="absolute inset-0 p-4 flex flex-col items-start gap-4">
            {desktopIcons.map((item) => (
                <button
                    key={item.id}
                    onDoubleClick={() => openWindow(item.id, item.title, item.component, item.icon)}
                    className="group flex flex-col items-center gap-1 w-20 p-2 rounded hover:bg-white/10 focus:bg-white/20 transition-colors cursor-pointer"
                >
                    <div className="w-12 h-12 bg-gray-800/80 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform text-blue-400">
                        <item.icon size={24} />
                    </div>
                    <span className="text-xs text-white font-medium drop-shadow-md">{item.title}</span>
                </button>
            ))}
        </div>
    );
};

export default Desktop;
