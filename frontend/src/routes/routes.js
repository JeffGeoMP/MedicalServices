import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./ViewMiddleware";
import * as View from "./ViewMapping";

function SwitchRoute() {
    return (
        <Routes>
            <Route path="/login" element={<View.LoginView />}/>
            <Route path="/new/assistance" element={<PrivateRoute><View.NewAssistanceView/></PrivateRoute>} />
            <Route path="/assistance" element={<PrivateRoute><View.AssistanceView/></PrivateRoute>} />
            <Route path="*" element={<View.ErrorView />} />
        </Routes>
    );
}


export default SwitchRoute;