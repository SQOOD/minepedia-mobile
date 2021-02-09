import create from 'zustand'
import * as SecureStore from 'expo-secure-store'

const useStore = create(set => ({
  increasePopulation: async () => set(state => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))

export default useStore