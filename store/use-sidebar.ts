import { create } from 'zustand';
export interface SidebarState {
    collapsed: boolean;
    onExpand: ()=>void;
    onCollapse: ()=>void;
}

// TODO: Add resizable sidebar

export const useSidebar = create<SidebarState>((set)=> ({
    collapsed: false,
    onExpand: ()=> set({collapsed: false}),
    onCollapse: ()=> set({collapsed: true})
}))