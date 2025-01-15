-- Usa la base de datos
USE DjangoDatabase;
GO

-- Crea la tabla Control_Scripts
CREATE TABLE Control_Scripts (
    id NVARCHAR(MAX),
    control_type NVARCHAR(MAX),
    query_sql NVARCHAR(MAX),
    control_script_id_id NVARCHAR(MAX)
);
GO

-- Insertar datos en Control_Scripts
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('1', 'automatic', 'SELECT 
        CASE 
            WHEN CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0 
            THEN ''TRUE'' 
            ELSE ''FALSE'' 
        END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''Ad Hoc Distributed Queries'';', '1');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('2', 'automatic', '-- Verificar si existen ensamblados de usuario en las bases de datos
    DECLARE @assembly_count INT;

    -- Utiliza un cursor para recorrer todas las bases de datos
    DECLARE @db_name NVARCHAR(128);
    DECLARE db_cursor CURSOR FOR
    SELECT name FROM sys.databases WHERE state_desc = ''ONLINE'';

    OPEN db_cursor;
    FETCH NEXT FROM db_cursor INTO @db_name;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Construir y ejecutar la consulta dinámica en cada base de datos
        DECLARE @sql NVARCHAR(MAX);
        SET @sql = N''USE ['' + @db_name + N''];
                    SELECT @assembly_count = COUNT(*) 
                    FROM sys.assemblies 
                    WHERE is_user_defined = 1;'';

        EXEC sp_executesql @sql, N''@assembly_count INT OUTPUT'', @assembly_count OUTPUT;

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
        -- Devolver ''FALSE'' si ''clr strict security'' está habilitado
        SELECT 
            CASE 
                WHEN 
                    (SELECT CAST(value AS INT) FROM sys.configurations WHERE name = ''clr strict security'') = 1
                    AND 
                    (SELECT CAST(value_in_use AS INT) FROM sys.configurations WHERE name = ''clr strict security'') = 1 
                THEN ''FALSE''

                WHEN 
                    -- Verificar si ''clr enabled'' está deshabilitado
                    (SELECT CAST(value AS INT) FROM sys.configurations WHERE name = ''clr enabled'') = 0
                    AND 
                    (SELECT CAST(value_in_use AS INT) FROM sys.configurations WHERE name = ''clr enabled'') = 0 
                THEN ''TRUE''

                ELSE ''FALSE''
            END AS validation_status;
    END
    ELSE
    BEGIN
        -- Devolver ''NO_USER_ASSEMBLIES'' si no se encontraron ensamblados de usuario
        SELECT ''TRUE'' AS validation_status;
    END;', '2');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('3', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '3');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('4', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '4');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('5', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '5');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('6', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '6');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('7', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '7');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('8', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '8');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('9', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '9');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('10', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '10');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('11', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '11');
INSERT INTO Control_Scripts (id, control_type, query_sql, control_script_id_id) VALUES ('12', 'automatic', 'SELECT 
    CASE 
        WHEN 
            CAST(value AS INT) = 0 AND CAST(value_in_use AS INT) = 0
        THEN ''TRUE'' 
        ELSE ''FALSE'' 
    END AS validation_status
    FROM 
        sys.configurations 
    WHERE 
        name = ''cross db ownership chaining'';', '12');

GO
