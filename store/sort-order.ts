import { create } from "zustand";

export enum SortOrderType {
    AtoZ = "AtoZ",
    ZtoA = "ZtoA",
    Newest = "Newest",
    Oldest = "Oldest"
}

interface SortOrderState {
    sortOrder: SortOrderType;
    setSortOrder: (sortOrder: SortOrderType)=>void;
}

// TODO: Persist this in local storage
export const useDomainSortOrder = create<SortOrderState>((set)=> ({
    sortOrder: SortOrderType.Newest,
    setSortOrder: (sortOrder)=> set({sortOrder})
}))