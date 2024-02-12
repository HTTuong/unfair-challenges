import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DefaultLayout from '~root/layouts/DefaultLayout'
import ChallengesScreen from './DefaultScreen'
import IntroductionScreen from './IntroductionScreen'

export interface IRoutes {
    path: string
    element: React.ReactNode
    Layout?: React.FunctionComponent<any> | React.FC<any>
}

const routesList: IRoutes[] = [
    {
        path: '/',
        element: <IntroductionScreen />,
        Layout: DefaultLayout,
    },
    {
        path: '/challenges',
        element: <ChallengesScreen />,
        Layout: DefaultLayout,
    },
]

export const RoutesList = () => {
    return (
        <Routes>
            {routesList.map((route, idx) => {
                let Element = route.element
                if (route.Layout) {
                    Element = <route.Layout>{Element}</route.Layout>
                }
                return <Route key={route.path} path={route.path} element={Element} />
            })}
        </Routes>
    )
}
