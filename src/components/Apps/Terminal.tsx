import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { User, FolderGit2 } from 'lucide-react';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Settings from './Settings';

interface FileSystem {
    [key: string]: { type: 'file' | 'dir'; content?: string };
}

// Simple in-memory file system
const initialFileSystem: FileSystem = {
    '~': { type: 'dir' },
    '~/projects': { type: 'dir' },
    '~/about.txt': { type: 'file', content: 'Somnath Paul\nSoftware Engineer & Technical Coordinator\n\nExperience:\n- Skoolsaver (Frontend Intern)\n- IEEE Student Chapter (Event Coordinator)\n\nContact: somnathpaul818@gmail.com' },
    '~/resume.txt': { type: 'file', content: 'Somnath Paul\n----------------\nSoftware Engineer & Technical Coordinator\nFrontend Developer • Software Engineer • AI/ML Engineer\n\nEducation:\nB.Tech IT - Alliance University (CGPA 8.0)\n\nSkills:\nGit, GitHub, Power BI, Linux, VS Code, Python, OpenCV, CNN\n\nProjects:\n1. Drone Neutralization System (AI-Based)\n2. Pipeline Leakage Detection System' },
    '~/projects/drone-system': { type: 'file', content: 'Drone Neutralization System (AI-Based)\nTech: Python, OpenCV, CNN, Arduino\n\nDesigned and implemented a real-time AI-driven detection pipeline using motion tracking and a custom CNN.' },
    '~/projects/leakage-detection': { type: 'file', content: 'Pipeline Leakage Detection System\nTech: Python, Fuzzy Neural Network\n\nBuilt a leakage detection model achieving 80-85% accuracy using engineered features from sensor data.' },
    '~/skills.txt': { type: 'file', content: '- Frontend: React, Tailwind CSS\n- AI/ML: Python, OpenCV, CNN\n- Tools: Git, VS Code, Linux, Power BI' },
};

const Terminal: React.FC = () => {
    const { openWindow } = useOS();
    const [history, setHistory] = useState<string[]>(['Welcome to OS Terminal v1.0', "Type 'help' for available commands."]);
    const [input, setInput] = useState('');
    const [cwd, setCwd] = useState('~');
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (cmd: string) => {
        const args = cmd.trim().split(' ');
        const command = args[0].toLowerCase();
        const newHistory = [...history, `${cwd} $ ${cmd}`];

        switch (command) {
            case 'help':
                setHistory([
                    ...newHistory,
                    'Available commands:',
                    '  ls [dir]    - List directory contents',
                    '  cd [dir]    - Change directory',
                    '  cat [file]  - Read file content',
                    '  clear       - Clear terminal',
                    '  open [app]  - Open an application (about, projects)',
                    '  whoami      - Display current user',
                ]);
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'ls':
                // initial simple implementation
                // Filter keys that start with cwd + / or are direct children
                // For simplicity, just handling current directory for files
                const files = Object.keys(initialFileSystem)
                    .filter(path => {
                        if (path === cwd) return false;
                        if (path.startsWith(cwd)) {
                            // Check if it's a direct child
                            const rel = path.substring(cwd.length + 1);
                            return !rel.includes('/');
                        }
                        return false;
                    })
                    .map(path => path.split('/').pop());

                if (files.length > 0) {
                    setHistory([...newHistory, files.join('  ')]);
                } else {
                    setHistory([...newHistory, '']);
                }
                break;
            case 'cd':
                const target = args[1];
                if (!target || target === '~') {
                    setCwd('~');
                } else if (target === '..') {
                    // naive parent logic
                    const parts = cwd.split('/');
                    if (parts.length > 1) {
                        parts.pop();
                        setCwd(parts.join('/') || '~'); // fallback if empty
                    }
                } else {
                    const newPath = cwd === '~' ? `~/${target}` : `${cwd}/${target}`;
                    if (initialFileSystem[newPath] && initialFileSystem[newPath].type === 'dir') {
                        setCwd(newPath);
                    } else {
                        setHistory([...newHistory, `cd: ${target}: No such directory`]);
                    }
                }
                break;
            case 'cat':
                const file = args[1];
                if (!file) {
                    setHistory([...newHistory, 'cat: usage: cat [file]']);
                } else {
                    const filePath = cwd === '~' ? `~/${file}` : `${cwd}/${file}`;
                    if (initialFileSystem[filePath] && initialFileSystem[filePath].type === 'file') {
                        setHistory([...newHistory, initialFileSystem[filePath].content || '']);
                    } else {
                        setHistory([...newHistory, `cat: ${file}: No such file`]);
                    }
                }
                break;
            case 'whoami':
                setHistory([...newHistory, 'guest']);
                break;
            case 'open':
                const app = args[1];
                if (app === 'about') {
                    openWindow('about', 'About Me', <AboutMe />, User);
                    setHistory([...newHistory, `Opening ${app}...`]);
                } else if (app === 'projects') {
                    openWindow('projects', 'Projects', <Projects />, FolderGit2);
                    setHistory([...newHistory, `Opening ${app}...`]);
                } else if (app === 'settings') {
                    openWindow('settings', 'Settings', <Settings />, User); // Reusing User icon or should accept any
                    setHistory([...newHistory, `Opening ${app}...`]);
                } else {
                    setHistory([...newHistory, `open: application '${app}' not found`]);
                }
                break;
            case '':
                setHistory(newHistory);
                break;
            default:
                setHistory([...newHistory, `command not found: ${command}`]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <div className="h-full bg-black text-green-400 font-mono text-sm p-2 flex flex-col" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-auto" ref={scrollRef}>
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}
            </div>
            <div className="flex items-center">
                <span className="mr-2 text-blue-400">{cwd} $</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none border-none text-green-400"
                    autoFocus
                />
            </div>
        </div>
    );
};

export default Terminal;
