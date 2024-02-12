import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Formik, Form } from 'formik'

interface IFormComponentProps {
    onSubmit: (...params: any) => any
    initialValues: object
    validationSchema: object
    children?: React.ReactNode
    className?: string
}

interface IFormMethod {
    submit: () => void
    reset: () => void
}

const FormComponent = forwardRef((props: IFormComponentProps, ref) => {
    const formRef = useRef<any>(null)

    useImperativeHandle(
        ref,
        (): IFormMethod => ({
            submit: () => {
                if (formRef.current?.handleSubmit) {
                    formRef.current.handleSubmit()
                }
            },
            reset: () => {
                if (formRef.current?.handleReset) {
                    formRef.current.handleReset()
                }
            },
        }),
    )

    return (
        <Formik
            initialValues={props.initialValues}
            validationSchema={props.validationSchema}
            onSubmit={props.onSubmit}
            innerRef={formRef}
        >
            {() => <Form className={props.className}>{props.children}</Form>}
        </Formik>
    )
})

export default FormComponent
