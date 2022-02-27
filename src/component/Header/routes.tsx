import Auth from "../../container/Auth/Auth";


export interface RoutesLink {
    component: JSX.Element,
    path: string,
}

const routes: RoutesLink[] = [
    {
        component: <Auth />,
        path: ''
    }
]
