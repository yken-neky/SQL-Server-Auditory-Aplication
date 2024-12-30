
---

### 2.1 - Ad Hoc Distributed Queries

```sql
SELECT 
    CASE 
        WHEN CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'Ad Hoc Distributed Queries';
```

### 2.2 - CLR Enabled

```sql
-- Verificar si existen ensamblados de usuario en las bases de datos
DECLARE @assembly_count INT;

-- Utiliza un cursor para recorrer todas las bases de datos
DECLARE @db_name NVARCHAR(128);
DECLARE db_cursor CURSOR FOR
SELECT name FROM sys.databases WHERE state_desc = 'ONLINE';

OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @db_name;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Construir y ejecutar la consulta dinámica en cada base de datos
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = N'USE [' + @db_name + N'];
                SELECT @assembly_count = COUNT(*) 
                FROM sys.assemblies 
                WHERE is_user_defined = 1;';
    
    EXEC sp_executesql @sql, N'@assembly_count INT OUTPUT', @assembly_count OUTPUT;

    -- Si se encuentran ensamblados de usuario, salir del bucle
    IF @assembly_count > 0
    BEGIN
        BREAK;
    END

    FETCH NEXT FROM db_cursor INTO @db_name;
END

CLOSE db_cursor;
DEALLOCATE db_cursor;

-- Comprobar si se encontraron ensamblados de usuario
IF @assembly_count > 0
BEGIN
    -- Devolver 'FALSE' si 'clr strict security' está habilitado
    SELECT 
        CASE 
            WHEN 
                (SELECT CAST(value AS INT) FROM sys.configurations WHERE name = 'clr strict security') = 1
                AND 
                (SELECT CAST(value_in_use AS INT) FROM sys.configurations WHERE name = 'clr strict security') = 1 
            THEN 'FALSE'
            
            WHEN 
                -- Verificar si 'clr enabled' está deshabilitado
                (SELECT CAST(value AS INT) FROM sys.configurations WHERE name = 'clr enabled') = 0
                AND 
                (SELECT CAST(value_in_use AS INT) FROM sys.configurations WHERE name = 'clr enabled') = 0 
            THEN 'TRUE'
            
            ELSE 'FALSE'
        END AS validation_status;
END
ELSE
BEGIN
    -- Devolver 'NO_USER_ASSEMBLIES' si no se encontraron ensamblados de usuario
    SELECT 'TRUE' AS validation_status;
END

```

### 2.3 - Cross DB Ownership Chaining 

```sql
SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'cross db ownership chaining';
```

### 2.4 - Database Mail XPs

```sql
SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'Database Mail XPs';
```

### 2.5 - Ole Automation Procedures

```sql
SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'Ole Automation Procedures';
```

### 2.6 - Remote Access 

```sql
SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'remote access';
```

### 2.7 - Remote Admin Connections 

```sql
SELECT 
    CASE 
        WHEN CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'remote admin connections'
    AND SERVERPROPERTY('IsClustered') = 0;
```

### 2.8 - Scan For Startup Procs

```sql
SELECT 
    CASE 
        WHEN CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'scan for startup procs';
```

### 2.9 - Trustworthy

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1
            FROM sys.databases
            WHERE is_trustworthy_on = 1
            AND name != 'msdb'
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

> [!NOTE] 
> El 2.10 es manual

### 2.11 - Use non-standard ports

```sql
SELECT 
    CASE 
        WHEN 
            (SELECT value_data FROM sys.dm_server_registry WHERE value_name = 'ListenOnAllIPs') = 1 
            AND 
            (SELECT COUNT(*) FROM sys.dm_server_registry WHERE registry_key LIKE '%IPAll%' AND value_name LIKE '%Tcp%' AND value_data = '1433') > 0 
        THEN 'FALSE'
        WHEN 
            (SELECT value_data FROM sys.dm_server_registry WHERE value_name = 'ListenOnAllIPs') = 0 
            AND 
            (SELECT COUNT(*) FROM sys.dm_server_registry WHERE value_name LIKE '%Tcp%' AND value_data = '1433') > 0
        THEN 'FALSE'
        ELSE 'TRUE'
    END AS validation_status;
```

### 2.12 - Hide Instances

```sql
-- Ejecutar xp_instance_regread para leer el valor del registro
DECLARE @getValue INT;
EXEC master.sys.xp_instance_regread
    @rootkey = N'HKEY_LOCAL_MACHINE',
    @key = N'SOFTWARE\Microsoft\Microsoft SQL Server\MSSQLServer\SuperSocketNetLib',
    @value_name = N'HideInstance',
    @value = @getValue OUTPUT;

-- Verificar si el valor leído es 1
SELECT 
    CASE 
        WHEN @getValue = 1 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status;
```

### 2.13 - Ensure the 'sa' Login Account is set to 'Disabled'

```sql
-- Verificar si existen filas que cumplen con la condición especificada
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1
            FROM sys.server_principals
            WHERE sid = 0x01
            AND is_disabled = 0
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 2.14 - Ensure the 'sa' Login Account has been renamed

```sql
-- Verificar si el nombre devuelto es 'sa'
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM sys.server_principals 
            WHERE sid = 0x01 
            AND name = 'sa'
        )
        THEN 'FALSE'
        ELSE 'TRUE'
    END AS validation_status;
```

### 2.15 - Ensure 'AUTO_CLOSE' is set to 'OFF' on contained databases

```sql
-- Verificar si existen filas que cumplen con la condición especificada
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1
            FROM sys.databases
            WHERE containment <> 0 
            AND is_auto_close_on = 1
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 2.16 - Ensure no login exists with the name 'sa'

```sql
SELECT
	CASE
		WHEN EXISTS (
			SELECT 1 
			FROM sys.server_principals
			WHERE name = 'sa')
		THEN 'FALSE'
		ELSE 'TRUE'
	END AS validation_status;
```


> [!NOTE] 
> El 2.17 es lo mismo que el 2.2 

