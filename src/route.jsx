import { createBrowserRouter } from "react-router-dom";
import Base from "./pages/Layout/Base";
import Homepage from "./pages/Homepage/Homepage";
import Liste from "./pages/Mambra/Liste";
import BaseMambra from "./pages/Mambra/BaseMambra";
import Nouveau from "./pages/Mambra/Nouveau";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Base />,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: '/mambra',
                element: <BaseMambra />,
                children: [
                    {
                        path: '/mambra/liste',
                        element: <Liste />,
                    },
                    {
                        path: '/mambra/nouveau',
                        element: <Nouveau />,
                    },
                ]
            },
        ]
    }
]);
