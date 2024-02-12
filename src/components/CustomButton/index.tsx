import React from 'react'

type TButton = 'button' | 'a'

interface ICustomButtonProps {
    type: 'button' | 'link'
    style: 'default' | 'border' | 'custom'
    className?: string
    title: string
    IconRight?: React.FC<{ className: string }>
    IconLeft?: React.FC<{ className: string }>
    href?: string
    submit?: boolean
    onClick?: () => any
}

interface IButtonProps {
    [stringName: string]: any
}

CustomButton.defaultProps = {
    type: 'button',
    style: 'default',
    title: 'Click',
}

export default function CustomButton(props: ICustomButtonProps) {
    const { type, style, className, title, href, onClick, submit, ...otherProps } = props
    let Comp: TButton = 'button'

    const buttonProps: IButtonProps = {
        onClick,
        ...otherProps,
    }

    if (type === 'link') {
        Comp = 'a'
        buttonProps.href = href
    }
    if (submit) {
        buttonProps.type = 'submit'
    }

    const classNameButton = style === 'default' ? 'bg-blue-400 text-white ' : ''

    return (
        <Comp className={`${classNameButton} ${className}`} {...buttonProps}>
            {props.IconLeft && <props.IconLeft className='mr-2' />}
            {title}
            {props.IconRight && <props.IconRight className='ml-2' />}
        </Comp>
    )
}
