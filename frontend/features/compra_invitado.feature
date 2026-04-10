# language: es
Característica: Flujo de compra como invitado en OpenCart
  Como usuario cliente
  Quiero agregar productos al carrito y hacer checkout como invitado
  Para poder finalizar mi compra sin necesidad de registrarme

  Escenario: Realizar una compra exitosa de dos productos como invitado
    Dado que Cristhian entra a la tienda de OpenCart
    Cuando agrega "MacBook" al carrito
    Y agrega "iPhone" al carrito
    Y visualiza el carrito de compras
    Y completa el checkout como invitado con sus datos de envío
    Entonces la compra debe finalizar con el mensaje "Your order has been placed!"