import {create} from 'zustand'
import {persist }from 'zustand/middleware'

let actionStore= (set)=>({
    action:'HomeComp',
    updateAction:(action)=>set((state)=>({action:action})),

})

actionStore= persist(actionStore,{name:'action_store'})

export const useActionStore= create(actionStore)