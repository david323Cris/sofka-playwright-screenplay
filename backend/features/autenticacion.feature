Feature: Pruebas de Autenticación Demoblaze
  Como Ingeniero de Calidad
  Quiero validar las entradas y salidas de los servicios de registro y login
  Para asegurar la robustez del sistema

  Scenario: Crear un nuevo usuario en signup
    Given que el usuario tiene un nombre de usuario único y clave "sofka123"
    When envía una solicitud de registro
    Then el código de respuesta es 200
    And la respuesta no debería contener un mensaje de error

  Scenario: Intentar crear un usuario ya existente
    Given que el usuario intenta registrarse con "user_existente" y clave "sofka123"
    When envía una solicitud de registro
    Then el código de respuesta es 200
    And el cuerpo de la respuesta debería decir "This user already exist."

  Scenario: Usuario y password correcto en login
    Given que el usuario tiene credenciales válidas
    When envía una solicitud de inicio de sesión
    Then el código de respuesta es 200
    And la respuesta debería contener el campo "Auth_token"

  Scenario: Usuario y password incorrecto en login
    Given que el usuario intenta loguearse con "user_existente" y clave "clave_erronea"
    When envía una solicitud de inicio de sesión
    Then el código de respuesta es 200
    And el cuerpo de la respuesta debería decir "Wrong password."