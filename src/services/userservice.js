export const Login = async (username, password) => {
    try {
      const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await response.json();
      if (data.length > 0) {
        return data[0]; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };


  