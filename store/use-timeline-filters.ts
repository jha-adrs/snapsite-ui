// Responsible for managing the notification tab state
import { links_timing } from '@prisma/client';
import { create } from 'zustand';
interface UseTimelineFiltersState {
    timing: links_timing;
    onTimingChange: (timing: links_timing) => void;
    timeRangeStart: Date;
    onTimeRangeStartChange: (timeRangeStart: Date) => void;
    timeRangeEnd: Date;
    onTimeRangeEndChange: (timeRangeEnd: Date) => void;

}

// TODO: Add resizable sidebar

export const useSelectDomain = create<UseTimelineFiltersState>((set) => ({
    timing: "DAILY",
    onTimingChange: (timing) => set({ timing }),
    timeRangeStart: new Date(),
    onTimeRangeStartChange: (timeRangeStart) => set({ timeRangeStart }),
    timeRangeEnd: new Date(),
    onTimeRangeEndChange: (timeRangeEnd) => set({ timeRangeEnd }),
}))


