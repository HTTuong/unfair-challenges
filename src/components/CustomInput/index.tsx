import { HTMLInputTypeAttribute, useCallback } from 'react'
import { TextField, OutlinedInput } from '@mui/material'
import { ErrorMessage, Field } from 'formik'

interface ICustomInputProps {
    name: string
    label: string
    style: 'TextField' | 'OutlinedInput'
    className: string
    type?: HTMLInputTypeAttribute | undefined
}

CustomInput.defaultProps = {
    label: '',
    className: '',
    style: 'TextField',
}

export default function CustomInput(props: ICustomInputProps) {
    const CustomInputField = useCallback(
        (customProps: any) => {
            const { field, form } = customProps
            const { name } = field
            const { errors, touched } = form

            switch (props.style) {
                case 'TextField':
                    return (
                        <div className='flex flex-col mb-2'>
                            <TextField
                                {...field}
                                margin='normal'
                                variant='outlined'
                                label={props.label}
                                type={props.type}
                                error={Boolean(errors[name] && touched[name])}
                                className={props.className}
                            />
                            <ErrorMessage name={name}>
                                {(msg) => <div className='text-red-600 text-sm pl-1'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                    )
                case 'OutlinedInput':
                    return (
                        <div className='flex flex-col mb-2'>
                            <OutlinedInput
                                {...field}
                                type={props.type}
                                label={props.label}
                                error={Boolean(errors[name] && touched[name])}
                                className={props.className}
                            />
                            <ErrorMessage name={name}>
                                {(msg) => <div className='text-red-600 text-sm pl-1'>{msg}</div>}
                            </ErrorMessage>
                        </div>
                    )
            }
        },
        [props.className, props.label, props.style, props.type],
    )

    const { name, ...otherProps } = props
    const fieldName = `${name}`

    return <Field name={fieldName} component={CustomInputField} {...otherProps} />
}
