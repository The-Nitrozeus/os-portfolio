import React from 'react';
import { useOS } from '../../context/OSContext';
import Window from './Window';
import Taskbar from './Taskbar';
import Desktop from './Desktop';

const WindowManager: React.FC = () => {
    const { windows, wallpaper } = useOS();

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-700" style={{ backgroundImage: `url('${wallpaper}')` }}>

            {/* Desktop Icons */}
            <Desktop />

            {/* Active Windows */}
            {windows.map((win) => (
                <Window key={win.id} window={win} />
            ))}

            {/* Taskbar */}
            <Taskbar />
        </div>
    );
};

export default WindowManager;
