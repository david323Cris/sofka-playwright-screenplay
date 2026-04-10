Feature: Compra de productos como invitado
  Como un usuario no registrado
  Quiero buscar y agregar productos al carrito
  Para completar una compra de forma rápida

  Scenario: Comprar MacBook e iPhone exitosamente
    Given que el usuario navega a la tienda de OpenCart
    When busca y agrega el producto "MacBook" al carrito
    And busca y agrega el producto "iPhone" al carrito
    And visualiza el carrito de compras
    And completa el formulario de checkout como invitado
    Then debería ver el mensaje de confirmación "Your order has been placed!"