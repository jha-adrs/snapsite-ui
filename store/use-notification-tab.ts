// Responsible for managing the notification tab state
import { create } from 'zustand';
interface NotificationDrawerState {
    collapsed: boolean;
    onExpand: ()=>void;
    onCollapse: ()=>void;
}

// TODO: Add resizable sidebar

export const useNotificationDrawer = create<NotificationDrawerState>((set)=> ({
    collapsed: true,
    onExpand: ()=> set({collapsed: false}),
    onCollapse: ()=> set({collapsed: true})
}))