import React from 'react';
import { Mail, Github, Linkedin, MapPin, GraduationCap, Briefcase } from 'lucide-react';

const AboutMe: React.FC = () => {
    return (
        <div className="h-full overflow-y-auto bg-gray-900 text-gray-200 font-sans selection:bg-blue-500/30">

            {/* Hero Section */}
            <div className="relative h-64 bg-gradient-to-r from-blue-900 to-slate-900 flex items-center px-8">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
                <div className="z-10 flex gap-6 items-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 p-1 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                            <span className="text-4xl">👨‍💻</span>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Somnath Paul</h1>
                        <p className="text-xl text-blue-200">Software Engineer & Technical Coordinator</p>
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
                            <a href="mailto:somnathpaul818@gmail.com" className="flex items-center gap-1 hover:text-white transition-colors"><Mail size={14} /> somnathpaul818@gmail.com</a>
                            <span className="flex items-center gap-1"><MapPin size={14} /> Bengaluru, India</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto space-y-12">

                {/* Contact Links */}
                <div className="flex gap-4">
                    <a href="https://linkedin.com/in/somnath-paul01" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-300 rounded hover:bg-blue-600/30 transition-colors">
                        <Linkedin size={18} /> LinkedIn
                    </a>
                    <a href="https://github.com/The-Nitrozeus" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded hover:bg-gray-700/80 transition-colors">
                        <Github size={18} /> GitHub
                    </a>
                </div>

                {/* Summary */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Professional Summary</h2>
                    <p className="leading-relaxed text-gray-300">
                        Technically strong and people-oriented engineering student with experience coordinating teams, supporting onboarding processes,
                        and organizing academic events. Skilled at translating technical concepts into clear communication, assisting stakeholders,
                        and ensuring smooth operational workflows. Interested in roles combining technical understanding with communication, coordination, and problem-solving.
                    </p>
                </section>

                {/* Experience */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
                        <Briefcase size={22} /> Experience
                    </h2>
                    <div className="space-y-8">
                        <div className="relative pl-6 border-l-2 border-blue-500/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                            <h3 className="text-xl font-semibold text-white">Front-End Intern</h3>
                            <p className="text-blue-400 mb-2">Skoolsaver • Jan 2025 - Mar 2025</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                                <li>Collaborated with design and backend teams to align product expectations and deliver functional UI components.</li>
                                <li>Improved usability by incorporating feedback and ensuring a consistent user experience.</li>
                            </ul>
                        </div>

                        <div className="relative pl-6 border-l-2 border-emerald-500/30">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600"></div>
                            <h3 className="text-xl font-semibold text-white">Event Coordinator</h3>
                            <p className="text-emerald-400 mb-2">IEEE Student Chapter</p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                                <li>Organized and facilitated workshops, presentations, and technical sessions delivered by internal and external speakers.</li>
                                <li>Managed event logistics, volunteer teams, and communication among faculty, speakers, and student groups.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
                        <GraduationCap size={22} /> Education
                    </h2>
                    <div>
                        <h3 className="text-lg font-semibold text-white">B.Tech in Information Technology</h3>
                        <p className="text-gray-400">Alliance University (2022 - 2026)</p>
                        <p className="text-sm text-gray-500 mt-1">CGPA: 8.0</p>
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Technical Skills</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Git', 'GitHub', 'Power BI', 'Linux', 'VS Code', 'React', 'Python', 'OpenCV'].map((skill) => (
                            <div key={skill} className="bg-gray-800/50 p-2 rounded text-center text-gray-300 border border-white/5 shadow-sm">
                                {skill}
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutMe;
