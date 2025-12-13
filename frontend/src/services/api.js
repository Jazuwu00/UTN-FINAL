
export const getCurrentUser = async () => {
  const res = await fetch('http://localhost:3000/session/current', {
    credentials: 'include' 
  });
  return res.json();
};
