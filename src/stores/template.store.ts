import { create } from "zustand";

interface ITemplateStore {
  count: number;
  inc: () => void;
}

const useStore = create<ITemplateStore>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));
