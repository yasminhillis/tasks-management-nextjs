'use client'
import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Sidebar(){
    const [isExpanded, setIsExpanded] = useState(true)
    const navItems = [
        {label: 'Projects', icon: 'folder_open', collapsedIcon: 'grid_view', href:'#'},
        {label: 'Project Epics', icon: 'account_tree', collapsedIcon: 'account_tree', href:'#'},
        {label: 'Project Tasks', icon: 'checklist', collapsedIcon: 'checklist', href:'#'},
        {label: 'Project Members', icon: 'group', collapsedIcon: 'group', href:'#'},
        {label: 'Project Details', icon: 'info', collapsedIcon: 'info', href:'#'}
    ]
    return <div className={`flex flex-col justify-between h-full ${isExpanded ? 'w-[224px]' : 'w-[70px]'}`}>
        <div>
            <header className="pl-7 pb-8 mt-4 pr-4 backdrop-blur-md">
                <Logo isExpanded={isExpanded} />
            </header>
            
            <div className={`px-4 ${isExpanded ? 'max-w-[224px]' : 'px-0'}`}>
                {navItems.map(item => 
                        <Link key={item.label} className={`flex items-center py-[10px] cursor-pointer text-sm font-medium focus:bg-white focus:text-[#003D9B] transition-colors rounded-sm hover:text-primary-container ${isExpanded ? 'px-3 gap-2' : 'justify-center px-0'}`} href={item.href}>
                            {isExpanded ? <span className="material-symbols-outlined">{item.icon}</span> : <span className="material-symbols-outlined">{item.collapsedIcon}</span>}
                            {isExpanded && <span>{item.label}</span>}
                        </Link>
                )}
            </div>
            
        </div>
        <div className='text-sm font-sans font-medium flex flex-col'>
            <div className={`text-slate-900 flex items-center gap-2 px-7 py-[10px] hover:text-slate-600 transition-colors cursor-pointer ${isExpanded ? '' : 'rotate-180'}`} onClick={() => setIsExpanded(prev => !prev)}>
                <span className="material-symbols-outlined">
                    chevron_left
                </span>
                {isExpanded && <div>Collapse</div>}
            </div>


            <div className='text-[#BA1A1A] flex items-center gap-2 px-7 py-[10px] hover:text-[#f96363] transition-colors cursor-pointer' >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    logout
                </span>
                {isExpanded && <div>Logout</div>}
            </div>
        </div>
    </div>
}