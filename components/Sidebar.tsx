import { SidebarLink } from "./SidebarLink";
import { Card } from './Card'

const LINKS = [
    {
        label: 'Home', icon: 'Grid', link: '/home',
    },
    {
        label: 'Calendar', icon: 'Calendar', link: '/calendar',
    },
    {
        label: 'Profile', icon: 'User', link: '/profile',
    },
    {
        label: 'Settings', icon: 'Settings', link: '/settings',
    }
]

export const Sidebar = () => {
    return (
        <Card className='h-full w-40 flex flex-col items-center justify-center gap-12 flex-wrap'>
            {
                LINKS.map((link) => (
                    <SidebarLink key={link.label} link={link}/>
                ))
            }
        </Card>
    );
}