import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteInterface {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteInterface) {
 
  if(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== null)
  {
    return <>{children}</>;
  }

  return(
    <Navigate to="/" replace={true} />
  )
}