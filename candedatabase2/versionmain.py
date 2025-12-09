import mysql.connector

def conectar():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="eliminacion_y_modif_datos_de_usuario"
    )

def modificar_usuario():
    print("\n--- MODIFICAR DATOS ---")
    user_id = input("ID del usuario: ")

    nuevo_telefono = input("Nuevo teléfono: ")
    nueva_direccion = input("Nueva dirección: ")

    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = """
            UPDATE usuarios
            SET telefono = %s, direccion = %s
            WHERE id = %s
        """

        cursor.execute(query, (nuevo_telefono, nueva_direccion, user_id))
        conexion.commit()

        if cursor.rowcount == 0:
            print("\n❌ No se encontró el usuario.\n")
        else:
            print("\nDatos modificados correctamente.\n")

    except Exception as e:
        print("Error:", e)

    finally:
        cursor.close()
        conexion.close()


def modificar_password():
    print("\n--- CAMBIAR CONTRASEÑA ---")
    user_id = input("ID del usuario: ")
    nueva_pass = input("Nueva contraseña: ")

    try:
        conexion = conectar()
        cursor = conexion.cursor()

        query = "UPDATE usuarios SET password = %s WHERE id = %s"
        cursor.execute(query, (nueva_pass, user_id))
        conexion.commit()

        if cursor.rowcount == 0:
            print("\n❌ No existe un usuario con ese ID.\n")
        else:
            print("\nContraseña actualizada.\n")

    except Exception as e:
        print("Error:", e)

    finally:
        cursor.close()
        conexion.close()


def eliminar_usuario():
    print("\n--- ELIMINAR USUARIO ---")
    user_id = input("ID del usuario: ")

    try:
        conexion = conectar()
        cursor = conexion.cursor()

        cursor.execute("DELETE FROM usuarios WHERE id = %s", (user_id,))
        conexion.commit()

        if cursor.rowcount == 0:
            print("\n❌ Usuario no encontrado.\n")
        else:
            print("\nUsuario eliminado correctamente.\n")

    except Exception as e:
        print("Error:", e)

    finally:
        cursor.close()
        conexion.close()


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


if __name__ == "__main__":
    menu()
