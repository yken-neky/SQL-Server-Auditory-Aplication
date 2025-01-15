
---

### 7.1 - Ensure 'Symmetric Key encryption algorithm' is set to 'AES_128' or higher in non-system databases

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @key_count INT;

-- Utiliza un cursor para recorrer todas las bases de datos
DECLARE @db_name NVARCHAR(128);
DECLARE db_cursor CURSOR FOR
SELECT name 
FROM sys.databases 
WHERE database_id > 4;

OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @db_name;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Construir y ejecutar la consulta dinámica en cada base de datos
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = N'USE [' + @db_name + N'];
                SELECT @key_count = COUNT(*)
                FROM sys.symmetric_keys
                WHERE algorithm_desc NOT IN (''AES_128'',''AES_192'',''AES_256'')
                AND db_id() > 4;';
    
    EXEC sp_executesql @sql, N'@key_count INT OUTPUT', @key_count OUTPUT;

    -- Si se encuentran claves simétricas con algoritmos no permitidos, salir del bucle
    IF @key_count > 0
    BEGIN
        BREAK;
    END

    FETCH NEXT FROM db_cursor INTO @db_name;
END

CLOSE db_cursor;
DEALLOCATE db_cursor;

-- Comprobar si se encontraron claves con algoritmos no permitidos
IF @key_count > 0
BEGIN
    SELECT 'FALSE' AS validation_status;
END
ELSE
BEGIN
    SELECT 'TRUE' AS validation_status;
END
```

### 7.2 - Ensure Asymmetric Key Size is set to 'greater than or equal to 2048' in non-system databases (Automated

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @key_count INT;

-- Utiliza un cursor para recorrer todas las bases de datos
DECLARE @db_name NVARCHAR(128);
DECLARE db_cursor CURSOR FOR
SELECT name 
FROM sys.databases 
WHERE database_id > 4;

OPEN db_cursor;
FETCH NEXT FROM db_cursor INTO @db_name;

WHILE @@FETCH_STATUS = 0
BEGIN
    -- Construir y ejecutar la consulta dinámica en cada base de datos
    DECLARE @sql NVARCHAR(MAX);
    SET @sql = N'USE [' + @db_name + N'];
                SELECT @key_count = COUNT(*)
                FROM sys.asymmetric_keys
                WHERE key_length < 2048;';
    
    EXEC sp_executesql @sql, N'@key_count INT OUTPUT', @key_count OUTPUT;

    -- Si se encuentran claves asimétricas con longitud menor a 2048, salir del bucle
    IF @key_count > 0
    BEGIN
        BREAK;
    END

    FETCH NEXT FROM db_cursor INTO @db_name;
END

CLOSE db_cursor;
DEALLOCATE db_cursor;

-- Comprobar si se encontraron claves con longitud menor a 2048
IF @key_count > 0
BEGIN
    SELECT 'FALSE' AS validation_status;
END
ELSE
BEGIN
    SELECT 'TRUE' AS validation_status;
END
```

### 7.3 - Ensure Database Backups are Encrypted

```sql
SELECT 
    CASE 
        WHEN NOT EXISTS (
            SELECT 1
            FROM msdb.dbo.backupset b
            INNER JOIN sys.databases d ON b.database_name = d.name
            WHERE b.key_algorithm IS NULL 
            AND b.encryptor_type IS NULL 
            AND d.is_encrypted = 0
        )
        THEN 'TRUE'
        ELSE 'FALSE'
    END AS validation_status;
```

### 7.4 - Ensure Network Encryption is Configured and Enabled

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM sys.dm_exec_connections 
            WHERE encrypt_option = 'FALSE'
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 7.5 - Ensure Databases are Encrypted with TDE

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM sys.databases 
            WHERE database_id > 4 
            AND is_encrypted != 1
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

---

> [!DONE]

