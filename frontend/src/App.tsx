import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts";
import Home from "./pages/Home";
import { GameProvider } from "./contexts/GameContext";

const AppContent: React.FC = () => {
  const { isLoading, signUp, logout } = useAuth();

  useEffect(() => {
    logout();

    // Simulate loading state
    const timeout = setTimeout(() => {
      signUp();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        <br />
        <p className="text-gray-900 text-2xl">Signing up...</p>
      </div>
    );
  }

  return <Home />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthProvider>
  );
};

export default App;
