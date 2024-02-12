import React from 'react'

export default function DefaultLayout(props: { children: React.ReactNode }) {
    return <div className='bg-slate-100'>{props.children}</div>
}
