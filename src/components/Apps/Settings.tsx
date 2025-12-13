import React from 'react';
import { useOS } from '../../context/OSContext';
import { Image, Palette, Check } from 'lucide-react';
import clsx from 'clsx';

const wallpapers = [
    { id: 'neon', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', name: 'Neon Cyberpunk' },
    { id: 'mountains', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop', name: 'Alpine Mountains' },
    { id: 'abstract', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop', name: 'Fluid Abstract' },
    { id: 'space', url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2000&auto=format&fit=crop', name: 'Deep Space' },
];

const accentColors = [
    { id: 'blue', color: 'bg-blue-600', name: 'Ocean Blue' },
    { id: 'purple', color: 'bg-purple-600', name: 'Royal Purple' },
    { id: 'emerald', color: 'bg-emerald-600', name: 'Forest Green' },
    { id: 'orange', color: 'bg-orange-600', name: 'Sunset Orange' },
    { id: 'pink', color: 'bg-pink-600', name: 'Neon Pink' },
];

const Settings: React.FC = () => {
    const { wallpaper, setWallpaper, accentColor, setAccentColor } = useOS();

    return (
        <div className="h-full bg-gray-900 text-gray-200 font-sans p-8 overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

            {/* Wallpaper Section */}
            <section className="mb-12">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Image size={20} /> Desktop Wallpaper
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {wallpapers.map((wp) => (
                        <button
                            key={wp.id}
                            onClick={() => setWallpaper(wp.url)}
                            className={clsx(
                                "relative aspect-video rounded-lg overflow-hidden border-2 transition-all group",
                                wallpaper === wp.url ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-transparent hover:border-white/20"
                            )}
                        >
                            <img src={wp.url} alt={wp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-white font-medium">{wp.name}</span>
                            </div>
                            {wallpaper === wp.url && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                                    <Check size={12} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Accent Color Section */}
            <section>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Palette size={20} /> System Accent Color
                </h2>
                <div className="flex flex-wrap gap-4">
                    {accentColors.map((acc) => (
                        <button
                            key={acc.id}
                            onClick={() => setAccentColor(acc.id)}
                            className={clsx(
                                "flex flex-col items-center gap-2 group",

                            )}
                        >
                            <div className={clsx(
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                                acc.color,
                                accentColor === acc.id ? "ring-4 ring-white/20 scale-110" : "group-hover:scale-105"
                            )}>
                                {accentColor === acc.id && <Check size={20} className="text-white" />}
                            </div>
                            <span className={clsx(
                                "text-xs",
                                accentColor === acc.id ? "text-white font-medium" : "text-gray-500"
                            )}>{acc.name}</span>
                        </button>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Settings;
