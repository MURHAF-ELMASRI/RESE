import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../state/store'

export const useAppDispatch = ()=>useDispatch<AppDispatch>()
