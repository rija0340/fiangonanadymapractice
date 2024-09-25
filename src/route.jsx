import { createBrowserRouter } from "react-router-dom";
import Base from "./pages/Layout/Base";
import Homepage from "./pages/Homepage/Homepage";
import ListeMambra from "./pages/Mambra/ListeMambra";
import BaseMambra from "./pages/Mambra/BaseMambra";
import Nouveau from "./pages/Mambra/Nouveau";
import Edit from "./pages/Mambra/Edit";
import Delete from "./pages/Mambra/Delete";
import NewFamille from "./pages/Mambra/NewFamille";
import EditFamille from "./pages/Mambra/EditFamille";

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
                        path: '/mambra/liste-mambra',
                        element: <ListeMambra />,
                    },
                    {
                        path: '/mambra/nouveau',
                        element: <Nouveau />,
                    },
                    {
                        path: '/mambra/nouvelle-famille',
                        element: <NewFamille />,
                    },
                    {
                        path: '/mambra/:id/edit',
                        element: <Edit />,
                    },
                    {
                        path: '/mambra/:id/delete',
                        element: <Delete />,
                    },
                    {
                        path: '/mambra/famille/:id/edit',
                        element: <EditFamille />,
                    },
                ]
            },
        ]
    }
]);
