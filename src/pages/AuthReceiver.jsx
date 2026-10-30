import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const AuthReceiver = () => {
  const { token, userData } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthHandoff = () => {
      try {
        // Validate token exists
        if (!token) {
          console.error("No token provided");
          navigate("/register/start", { replace: true });
          return;
        }

        // Save token to localStorage
        localStorage.setItem("mall-token", token);

        // Parse and save user data if provided
        if (userData) {
          try {
            const parsedUserData = JSON.parse(decodeURIComponent(userData));
            localStorage.setItem("mallUserInfo", JSON.stringify(parsedUserData));
          } catch (error) {
            console.error("Failed to parse user data:", error);
            // Continue anyway - token is the important part
          }
        }

        // Determine target destination based on current route
        const isDashboardRoute = location.pathname.startsWith("/auth/dashboard/");
        const targetRoute = isDashboardRoute ? "/dashboard" : "/";

        // Navigate to target route with replace to scrub URL
        navigate(targetRoute, { replace: true });
      } catch (error) {
        console.error("Auth handoff error:", error);
        navigate("/register/start", { replace: true });
      }
    };

    handleAuthHandoff();
  }, [token, userData, navigate, location]);

  // Show loading state while processing
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    </div>
  );
};

export default AuthReceiver;
