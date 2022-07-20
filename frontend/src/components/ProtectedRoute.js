import React from "react";
import { Routes, Navigate, Route } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, children, path }) {
  return (
    <Routes>
      <Route path={path} element={loggedIn ? children : <Navigate to='/sign-in' />} />
    </Routes>
  );
}
