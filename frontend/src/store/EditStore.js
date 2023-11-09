import { create } from "zustand"

export const useEditStore = create((set) => ({
    editMode: false,
    toggleEditMode: () => set((state) => ({
        editMode: !state.editMode
    })),
    editedList : {},
    setEditedList: () => set({ editedList: {} }), 
    editPost : (val) => 
        set(() => ({
            editedList: {
                id : val.id,
                title: val.title,
                category: val.category,
                image: val.image,
                content: val.content
            }
        }))
 
}))
