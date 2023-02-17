import { GlassPane } from "@/components/GlassPane";
import { Sidebar } from "@/components/Sidebar";

import '@/styles/global.css';

export default function DashboardRootLayout({ children }) {
    return (
        <html lang="en">
            <head />
            <body className={'h-screen w-screen p-6 candy-mesh'}>
                <GlassPane className={'w-full h-full flex items-center'}>
                    <Sidebar />
                    {children}
                </GlassPane>
                <div id='modal'></div>
            </body>
        </html>
    )
}