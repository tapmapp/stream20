export const authenticateBoard = (boardSerialToken, password): Promise<void> => {
    // password auth, JWT
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Board authenticated');
            resolve();
        }, 3000);
    });
}