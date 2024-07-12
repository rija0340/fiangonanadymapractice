import { createBrowserRouter } from "react-router-dom";
import Base from "./pages/Layout/Base";
import Homepage from "./pages/Homepage/Homepage";
import Mambra from "./pages/Mambra/Mambra";

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
                element: <Mambra />
            },
        ]
    }
]);
