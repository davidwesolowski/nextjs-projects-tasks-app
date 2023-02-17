'use client';

import Link from "next/link"
import { Settings, User, Grid, Calendar } from 'react-feather';
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const ICONS = { Settings, User, Grid, Calendar };

export const SidebarLink = ({ link }) => {
    const pathname = usePathname();
    const isActive = pathname === link.link;
    
    const Icon = ICONS[link.icon];

    return (
        <Link href={link.link}>
            <Icon size={40} className={clsx('stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out', isActive ? 'stroke-violet-600' : '')} />
        </Link>
    )
}