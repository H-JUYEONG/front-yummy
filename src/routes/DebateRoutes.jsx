import { Routes, Route } from "react-router-dom";
import React from "react";
import UserDebateList from "../features/debate/UserDebateList";
import UserDebateInsert from "../features/debate/UserDebateInsert";
import UserDebateView from "../features/debate/UserDebateView";
import UserDebateEdit from "../features/debate/UserDebateEdit";


const DebateRoutes = () => {
    return (
        <Routes>
            <Route path='/board' element={<UserDebateList />} />
            <Route path='/debateinsert' element={<UserDebateInsert />} />
            <Route path='/debateview/:debateId' element={<UserDebateView />} />
            <Route path='/debateedit/:debateId' element={<UserDebateEdit />} />
        </Routes>
    );
};

export default DebateRoutes;
