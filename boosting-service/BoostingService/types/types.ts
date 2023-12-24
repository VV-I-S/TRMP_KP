import {FC} from 'react'
import {NavigationProp, ParamListBase} from '@react-navigation/native'

export type WithNavigationProps = {
  navigation: NavigationProp<ParamListBase>
}

export type ComponentWithNavigation = FC<WithNavigationProps>
