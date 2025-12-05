import mysql.connector

# CONEXIÓN A LA BASE DE DATOS
def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="eliminacion_y_modif_datos_de_usuario"
    )

# -------------------------------------
# MODIFICAR DATOS DEL USUARIO
# -------------------------------------
def modificar_usuario():
    print("\n--- MODIFICAR DATOS ---")
    user_id = input("ID del usuario: ")

    nuevo_telefono = input("Nuevo teléfono: ")
    nueva_direccion = input("Nueva dirección: ")

    conexion = conectar()
    cursor = conexion.cursor()

    query = """
        UPDATE usuarios
        SET telefono = %s, direccion = %s
        WHERE id = %s
    """

    cursor.execute(query, (nuevo_telefono, nueva_direccion, user_id))
    conexion.commit()

    print("\nDatos modificados correctamente.\n")

    cursor.close()
    conexion.close()

# -------------------------------------
# MODIFICAR CONTRASEÑA
# -------------------------------------
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

# -------------------------------------
# ELIMINAR USUARIO
# -------------------------------------
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

# -------------------------------------
# Menú principal
# -------------------------------------
def menu():
    while True:
        print("\n========= MENÚ PRINCIPAL =========")
        print("1. Modificar datos")
        print("2. Cambiar contraseña")
        print("3. Eliminar usuario")
        print("4. Salir")

        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            modificar_usuario()
        elif opcion == "2":
            modificar_password()
        elif opcion == "3":
            eliminar_usuario()
        elif opcion == "4":
            print("¡Hasta pronto!")
            break
        else:
            print("Opción inválida. Intente de nuevo.\n")