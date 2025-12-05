import mysql.connector

# CONEXIÓN A LA BASE DE DATOS
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="registro_usuarios"
    )


# REGISTRAR USUARIO
def registrar_usuario():
    print("\n--- REGISTRAR USUARIO ---")
    
    nombre = input("Nombre: ")
    email = input("Email: ")
    password = input("Contraseña: ")
    edad = input("Edad: ")
    ciudad = input("Ciudad: ")

    conexion = conectar()
    cursor = conexion.cursor()

    query = """
        INSERT INTO usuarios (nombre, email, password, edad, ciudad)
        VALUES (%s, %s, %s, %s, %s)
    """
    datos = (nombre, email, password, edad, ciudad)

    cursor.execute(query, datos)
    conexion.commit()

    print("\nUsuario registrado con éxito.\n")

    cursor.close()
    conexion.close()


# INICIAR SESIÓN
def iniciar_sesion():
    print("\n--- INICIO DE SESIÓN ---")
    email = input("Email: ")
    password = input("Contraseña: ")

    conexion = conectar()
    cursor = conexion.cursor()

    query = "SELECT id, nombre FROM usuarios WHERE email = %s AND password = %s"
    cursor.execute(query, (email, password))
    resultado = cursor.fetchone()

    if resultado:
        print(f"\nBienvenido {resultado[1]} (ID: {resultado[0]})\n")
    else:
        print("\nCredenciales incorrectas.\n")

    cursor.close()
    conexion.close()


# CONSULTAR USUARIO POR ID
def consultar_usuario():
    print("\n--- CONSULTAR USUARIO ---")
    user_id = input("ID del usuario: ")

    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE id = %s", (user_id,))
    resultado = cursor.fetchone()

    if resultado:
        print("\nDatos del usuario:")
        print(resultado)
    else:
        print("\nNo existe un usuario con ese ID.")

    cursor.close()
    conexion.close()


# MODIFICAR DATOS DEL USUARIO (Edad y Ciudad)
def modificar_usuario():
    print("\n--- MODIFICAR DATOS ---")
    user_id = input("ID del usuario: ")

    nueva_edad = input("Nueva edad: ")
    nueva_ciudad = input("Nueva ciudad: ")

    conexion = conectar()
    cursor = conexion.cursor()

    query = """
        UPDATE usuarios
        SET edad = %s, ciudad = %s
        WHERE id = %s
    """

    cursor.execute(query, (nueva_edad, nueva_ciudad, user_id))
    conexion.commit()

    print("\nDatos modificados correctamente.\n")

    cursor.close()
    conexion.close()


# MODIFICAR CONTRASEÑA
def modificar_password():
    print("\n--- CAMBIAR CONTRASEÑA ---")
    user_id = input("ID del usuario: ")
    nueva_pass = input("Nueva contraseña: ")

    conexion = conectar()
    cursor = conexion.cursor()

    query = "UPDATE usuarios SET password = %s WHERE id = %s"
    cursor.execute(query, (nueva_pass, user_id))
    conexion.commit()

    print("\nContraseña actualizada.\n")

    cursor.close()
    conexion.close()


# ELIMINAR USUARIO
def eliminar_usuario():
    print("\n--- ELIMINAR USUARIO ---")
    user_id = input("ID del usuario: ")

    conexion = conectar()
    cursor = conexion.cursor()

    cursor.execute("DELETE FROM usuarios WHERE id = %s", (user_id,))
    conexion.commit()

    print("\nUsuario eliminado correctamente.\n")

    cursor.close()
    conexion.close()


# MENÚ PRINCIPAL
def menu():
    while True:
        print("\n========= MENÚ PRINCIPAL =========")
        print("1. Registrar usuario")
        print("2. Iniciar sesión")
        print("3. Consultar usuario")
        print("4. Modificar datos")
        print("5. Cambiar contraseña")
        print("6. Eliminar usuario")
        print("7. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            registrar_usuario()
        elif opcion == "2":
            iniciar_sesion()
        elif opcion == "3":
            consultar_usuario()
        elif opcion == "4":
            modificar_usuario()
        elif opcion == "5":
            modificar_password()
        elif opcion == "6":
            eliminar_usuario()
        elif opcion == "7":
            print("¡Hasta pronto!")
            break
        else:
            print("Opción inválida. Intente de nuevo.\n")


# EJECUCIÓN
if __name__ == "__main__":
    menu()

