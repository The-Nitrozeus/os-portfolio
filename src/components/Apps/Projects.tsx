import React from 'react';
import { FolderGit2, GitBranch } from 'lucide-react';


interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    role: string;
}

const projects: Project[] = [
    {
        id: 'drone',
        title: 'Drone Neutralization System',
        role: 'AI-Based',
        description: 'Designed and implemented a real-time AI-driven detection pipeline using motion tracking and a custom CNN. Explained system behavior and performance to peers and evaluators, translating technical findings into clear insights.',
        tech: ['Python', 'OpenCV', 'CNN', 'Arduino']
    },
    {
        id: 'pipeline',
        title: 'Pipeline Leakage Detection System',
        role: 'Fuzzy Neural Network',
        description: 'Built a leakage detection model achieving 80-85% accuracy using engineered features from sensor data. Presented results using charts and insights, focusing on practical implications and system reliability.',
        tech: ['Python', 'Fuzzy Neural Network', 'Data Analysis']
    }
];

const Projects: React.FC = () => {

    return (
        <div className="h-full bg-slate-900 text-gray-200 font-sans p-8 overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <FolderGit2 className="text-yellow-400" /> Projects Directory
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors group shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <GitBranch size={24} />
                            </div>
                            <span className="text-xs font-mono bg-gray-700 px-2 py-1 rounded text-gray-400">{project.role}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 h-20 overflow-hidden text-ellipsis">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs px-2 py-1 bg-gray-900 rounded border border-white/5 text-gray-300">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
