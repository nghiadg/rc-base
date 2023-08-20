import React from 'react'
import { IIconWrapperProps } from './IconWrapper.types'
import styles from "./IconWrapper.module.css"
import clsx from 'clsx'

export const IconWrapper = ({as: Svg, size = 'sm', iconSize,...props}: IIconWrapperProps) => {
  return (
    <span className={clsx(styles.wrapper, {
        [styles.xs]: size === 'xs',
        [styles.sm]: size === 'sm',
        [styles.lg]: size === 'lg'
    })}>
        <Svg size={iconSize} {...props}/>
    </span>
  )
}
