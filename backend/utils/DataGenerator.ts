export const DataGenerator = {
    generarUsuarioUnico: () => {
        // Genera algo como: testuser_171234567890
        return `testuser_${Date.now()}`; 
    }
};
