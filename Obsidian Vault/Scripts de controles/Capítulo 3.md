
---

### 3.1 - Server Authentication set to Windows Authentication Mode

```sql
SELECT 
    CASE 
        WHEN SERVERPROPERTY('IsIntegratedSecurityOnly') = 1 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status;
```

### 3.2 - Ensure CONNECT permissions on the 'guest' user is Revoked within all SQL Server databases

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @DatabaseName NVARCHAR(128);
DECLARE @ValidationStatus NVARCHAR(5);
DECLARE @ResultTable TABLE (ValidationStatus NVARCHAR(5));

DECLARE db_cursor CURSOR FOR  
SELECT name 
FROM sys.databases 
WHERE name NOT IN ('master','tempdb','msdb');

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @DatabaseName  

WHILE @@FETCH_STATUS = 0  
BEGIN  
    DECLARE @SQL NVARCHAR(MAX) = '
    USE [' + @DatabaseName + '];
    IF EXISTS (
        SELECT 1 
        FROM sys.database_permissions 
        WHERE grantee_principal_id = DATABASE_PRINCIPAL_ID(''guest'') 
        AND state_desc LIKE ''GRANT%'' 
        AND permission_name = ''CONNECT''
    )
    BEGIN
        SELECT ''FALSE'' AS ValidationStatus;
    END
    ELSE
    BEGIN
        SELECT ''TRUE'' AS ValidationStatus;
    END';

    INSERT INTO @ResultTable (ValidationStatus)
    EXEC sp_executesql @SQL;

    FETCH NEXT FROM db_cursor INTO @DatabaseName  
END  

CLOSE db_cursor  
DEALLOCATE db_cursor

-- Ver el resultado final
SELECT CASE 
    WHEN COUNT(*) = SUM(CASE WHEN ValidationStatus = 'TRUE' THEN 1 ELSE 0 END) 
    THEN 'TRUE' 
    ELSE 'FALSE' 
    END AS OverallValidationStatus
FROM @ResultTable;
```

### 3.3 - Ensure 'Orphaned Users' are Dropped From SQL Server Databases

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @DatabaseName NVARCHAR(128);
DECLARE @SQL NVARCHAR(MAX);

-- Declarar la tabla temporal como global
IF OBJECT_ID('tempdb..##ResultTable') IS NOT NULL
    DROP TABLE ##ResultTable;

CREATE TABLE ##ResultTable (DatabaseName NVARCHAR(128), ValidationStatus NVARCHAR(5));

DECLARE db_cursor CURSOR FOR  
SELECT name 
FROM sys.databases;

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @DatabaseName  

WHILE @@FETCH_STATUS = 0  
BEGIN  
    SET @SQL = '
    USE [' + @DatabaseName + '];
    IF EXISTS (
        SELECT dp.type_desc, dp.sid, dp.name as orphan_user_name, 
               dp.authentication_type_desc 
        FROM sys.database_principals AS dp 
        LEFT JOIN sys.server_principals as sp ON dp.sid = sp.sid 
        WHERE sp.sid IS NULL 
        AND dp.authentication_type_desc = ''INSTANCE''
    )
    BEGIN
        INSERT INTO ##ResultTable (DatabaseName, ValidationStatus)
        VALUES (''' + @DatabaseName + ''', ''FALSE'');
    END
    ELSE
    BEGIN
        INSERT INTO ##ResultTable (DatabaseName, ValidationStatus)
        VALUES (''' + @DatabaseName + ''', ''TRUE'');
    END';

    EXEC sp_executesql @SQL;

    FETCH NEXT FROM db_cursor INTO @DatabaseName  
END  

CLOSE db_cursor  
DEALLOCATE db_cursor

-- Ver el estado general
SELECT CASE 
    WHEN COUNT(*) = SUM(CASE WHEN ValidationStatus = 'TRUE' THEN 1 ELSE 0 END) 
    THEN 'TRUE' 
    ELSE 'FALSE' 
    END AS OverallValidationStatus
FROM ##ResultTable;
```

### 3.4 - Ensure SQL Authentication is not used in contained databases

```sql
DECLARE @DatabaseName NVARCHAR(128);
DECLARE @SQL NVARCHAR(MAX);
DECLARE @OverallValidationStatus NVARCHAR(5) = 'TRUE';
DECLARE @ValidationStatus NVARCHAR(5);

DECLARE db_cursor CURSOR FOR  
SELECT name 
FROM sys.databases;

OPEN db_cursor  
FETCH NEXT FROM db_cursor INTO @DatabaseName  

WHILE @@FETCH_STATUS = 0  
BEGIN  
    SET @SQL = N'
    USE [' + @DatabaseName + '];
    IF EXISTS (
        SELECT 1
        FROM sys.database_principals
        WHERE name NOT IN (''dbo'',''Information_Schema'',''sys'',''guest'')
        AND type IN (''U'',''S'',''G'')
        AND authentication_type = 2
    )
    BEGIN
        SELECT @ValidationStatus = ''FALSE'';
    END
    ELSE
    BEGIN
        SELECT @ValidationStatus = ''TRUE'';
    END';

    EXEC sp_executesql @SQL, N'@ValidationStatus NVARCHAR(5) OUTPUT', @ValidationStatus OUTPUT;

    IF @ValidationStatus = 'FALSE'
    BEGIN
        SET @OverallValidationStatus = 'FALSE';
    END

    FETCH NEXT FROM db_cursor INTO @DatabaseName  
END  

CLOSE db_cursor  
DEALLOCATE db_cursor

-- Ver el estado general
SELECT @OverallValidationStatus AS OverallValidationStatus;
```

> [!NOTE] MANUAL 
> 3.5 - Ensure the SQL Server’s MSSQL Service Account is Not an Administrator

> [!NOTE] MANUAL
> 3.6 - Ensure the SQL Server’s SQLAgent Service Account is Not an Administrator

> [!NOTE] MANUAL
> 3.7 -  Ensure the SQL Server’s Full-Text Service Account is Not an Administrator

### 3.8 - Ensure only the default permissions specified by Microsoft are granted to the public server role

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM master.sys.server_permissions
            WHERE (grantee_principal_id = SUSER_SID(N'public') AND state_desc LIKE 'GRANT%')
            AND NOT (state_desc = 'GRANT' AND [permission_name] = 'VIEW ANY DATABASE' AND class_desc = 'SERVER')
            AND NOT (state_desc = 'GRANT' AND [permission_name] = 'CONNECT' AND class_desc = 'ENDPOINT' AND major_id = 2)
            AND NOT (state_desc = 'GRANT' AND [permission_name] = 'CONNECT' AND class_desc = 'ENDPOINT' AND major_id = 3)
            AND NOT (state_desc = 'GRANT' AND [permission_name] = 'CONNECT' AND class_desc = 'ENDPOINT' AND major_id = 4)
            AND NOT (state_desc = 'GRANT' AND [permission_name] = 'CONNECT' AND class_desc = 'ENDPOINT' AND major_id = 5)
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 3.9 - Ensure Windows BUILTIN groups are not SQL Logins

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT pr.[name], pe.[permission_name], pe.[state_desc]
            FROM sys.server_principals pr
            JOIN sys.server_permissions pe
            ON pr.principal_id = pe.grantee_principal_id
            WHERE pr.name LIKE 'BUILTIN%'
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 3.10 - Ensure Windows local groups are not SQL Logins

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT pr.[name] AS LocalGroupName, pe.[permission_name], pe.[state_desc]
            FROM sys.server_principals pr
            JOIN sys.server_permissions pe
            ON pr.[principal_id] = pe.[grantee_principal_id]
            WHERE pr.[type_desc] = 'WINDOWS_GROUP'
            AND pr.[name] LIKE CAST(SERVERPROPERTY('MachineName') AS NVARCHAR) + '%'
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 3.11 - Ensure the public role in the msdb database is not granted access to SQL Agent proxies

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT sp.name AS proxyname
            FROM msdb.dbo.sysproxylogin spl
            JOIN msdb.sys.database_principals dp
            ON dp.sid = spl.sid
            JOIN msdb.dbo.sysproxies sp
            ON sp.proxy_id = spl.proxy_id
            WHERE dp.principal_id = USER_ID('public')
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 3.12 - Ensure the 'SYSADMIN' Role is Limited to Administrative or Built-in Accounts

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT DISTINCT(name), type_desc
            FROM master.sys.server_principals
            WHERE IS_SRVROLEMEMBER ('sysadmin',name) = 1
            AND name NOT IN (
                'NT SERVICE\SQLWriter',
                'NT SERVICE\Winmgmt',
                'NT SERVICE\MSSQLSERVER',
                'NT SERVICE\SQLSERVERAGENT'
            )
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 3.13 - Ensure membership in admin roles in MSDB database is limited

```sql
SELECT 
    CASE 
        WHEN (
            SELECT count(*) 
            FROM sys.databases AS db, sys.database_role_members AS drm 
            INNER JOIN sys.database_principals AS r 
            ON drm.role_principal_id = r.principal_id 
            INNER JOIN sys.database_principals AS m 
            ON drm.member_principal_id = m.principal_id 
            WHERE r.name IN ('db_owner', 'db_securityadmin', 'db_ddladmin', 'db_datawriter') 
            AND m.name <> 'dbo' 
            AND db.database_id = 3
        ) > 0 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

