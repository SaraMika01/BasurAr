import mysql.connector

mydb = mysql.connector.connect( host="localhost", user="root",
                               password="1234") mycursor = mydb.cursor() mycursor.execute("CREATE DATABASE BasurAr")

mycursor.execute("CREATE TABLE initUs (IdUS INTEGER PRYMARY KEY AUTOINCREMENT, NameUs VARCHAR(225), Email VARCHAR(100), Password VARCHAR(8))")

sql = "INSERT INTO InitUs (NameUs, Email, Password) VALUES (%s,%s)" val = ("juancito2021", "juan@gmail.com", "hoola") mycursor.execute(sql, val) mydb.commit()

mycursor.execute("CREATE TABLE PersonalData (ID INTEGER PRYMARY KEY AUTOINCREMENT, NameUs VARCHAR(225), Name VARCHAR(50), Apellido VARCHAR(50), Edad INT NOT NULL, Ciudad VARCHAR(100) Email VARCHAR(100), Password VARCHAR(8))")

sql = "INSERT INTO PersonalData (NameUs, Name, Apellido, Edad, Ciudad, Email, Password) VALUES (%s,%s)" val = ("juancito2021", "juan@gmail.com", "hoola") mycursor.execute(sql, val) mydb.commit()