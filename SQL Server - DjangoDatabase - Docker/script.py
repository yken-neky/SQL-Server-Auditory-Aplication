import csv

# Archivo CSV de entrada y archivo SQL de salida
csv_file = 'InsideDB_App_controls_scripts.csv'
sql_file = 'exportar_tabla_Control_Scripts.sql'

# Nombre de la tabla en SQL Server
table_name = 'Control_Scripts'

with open(csv_file, 'r', encoding='utf-8') as csvfile, open(sql_file, 'w', encoding='utf-8') as sqlfile:
    reader = csv.reader(csvfile)
    headers = next(reader)  # Obtener la primera fila como encabezados

    # Escribir encabezado del archivo SQL
    sqlfile.write(f"USE TuBaseDeDatos;\nGO\n")
    sqlfile.write(f"CREATE TABLE {table_name} (\n")
    for header in headers:
        sqlfile.write(f"    {header} NVARCHAR(MAX),\n")
    sqlfile.write(");\nGO\n")

    # Escribir inserciones
    for row in reader:
        values = ', '.join([f"'{value}'" for value in row])
        sqlfile.write(f"INSERT INTO {table_name} ({', '.join(headers)}) VALUES ({values});\n")
    sqlfile.write("GO\n")
