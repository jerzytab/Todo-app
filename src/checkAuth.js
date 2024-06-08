const checkAuth = async () => {
    try {
        const response = await fetch('http://localhost/backend/authenticate.php', {
            method: 'GET',
            credentials: 'include', // Aby upewnić się, że sesje są prawidłowo obsługiwane
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export default checkAuth;
