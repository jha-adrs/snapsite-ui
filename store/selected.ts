// Responsible for managing the notification tab state
import { create } from 'zustand';
interface SelectedDomainState {
    selectedDomain: string;
    onDomainChange: (domain: string) => void;
}

// TODO: Add resizable sidebar

export const useSelectDomain = create<SelectedDomainState>((set) => ({
    selectedDomain: '',
    onDomainChange: (selectedDomain) => set({ selectedDomain })
}))

interface SelectedLinkState {
    selectedLink: string;
    selectedDomain: string;
    onLinkChange: (link: string) => void;
    onDomainChange: (selectedDomain: string) => void;
}
export const useSelectLink = create<SelectedLinkState>((set) => ({
    selectedLink: '',
    selectedDomain: '',
    onLinkChange: (selectedLink) => set({ selectedLink }),
    onDomainChange: (selectedDomain) => set({ selectedDomain })
}))

