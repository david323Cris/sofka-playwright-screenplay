export const HomePage = {
    barraDeBusqueda: 'input[name="search"]',
    botonBuscar: '#search button',
    // Selector dinámico para el botón de agregar de un producto específico
    botonAgregarAlCarrito: (producto: string) => 
        `//h4/a[text()='${producto}']/ancestor::div[@class='product-thumb']//button[contains(@onclick, 'cart.add')]`,
    botonCarritoHeader: '#cart > button',
    linkViewCart: 'strong i.fa-shopping-cart'
};