export const useLogout = () => {
  const logout = () => {
    window.location.assign(
      'https://api-gateway.dev.sport-unite.it-mentor.space/logout',
    );
  };

  return { logout };
};
