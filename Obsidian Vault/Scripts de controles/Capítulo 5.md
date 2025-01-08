
---

### 5.1 - Ensure 'Maximum number of error log files' is set to greater than or equal to '12'

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
    DECLARE @NumErrorLogs int;
    DECLARE @RegReadCmd NVARCHAR(4000);
    SET @RegReadCmd = ''EXEC master.sys.xp_instance_regread N''''HKEY_LOCAL_MACHINE'''', N''''Software\Microsoft\MSSQLServer\MSSQLServer'''', N''''NumErrorLogs'''', @NumErrorLogs OUTPUT'';
    EXEC sp_executesql @RegReadCmd, N''@NumErrorLogs int OUTPUT'', @NumErrorLogs OUTPUT;

    IF ISNULL(@NumErrorLogs, -1) = -1 OR ISNULL(@NumErrorLogs, -1) >= 12
    BEGIN
        SELECT ''TRUE'' AS ValidationStatus;
    END
    ELSE
    BEGIN
        SELECT ''FALSE'' AS ValidationStatus;
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

### 5.2 - Ensure 'Default Trace Enabled' Server Configuration Option is set to '1'

```sql
SELECT 
    CASE 
        WHEN CAST(value AS INT) = 1 AND CAST(value_in_use AS INT) = 1 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status
FROM 
    sys.configurations 
WHERE 
    name = 'default trace enabled';
```

### 5.3 - Ensure 'Login Auditing' is set to 'failed logins'

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @AuditLevel NVARCHAR(100);

-- Ejecutar la consulta y almacenar el resultado en una tabla temporal
CREATE TABLE #AuditLevelResult (ConfigName NVARCHAR(255), ConfigValue NVARCHAR(255));
INSERT INTO #AuditLevelResult
EXEC xp_loginconfig 'audit level';

-- Almacenar el valor del resultado en una variable
SELECT @AuditLevel = ConfigValue FROM #AuditLevelResult WHERE ConfigName = 'audit level';

-- Realizar la validación y devolver el resultado final
SELECT 
    CASE 
        WHEN @AuditLevel = 'failure' 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS ValidationStatus;

-- Limpiar la tabla temporal
DROP TABLE #AuditLevelResult;
```

> [!WARNING] IMPORTANT
> Manejar que en el caso de este control, valores como **failure** o **all** podrían llegar a ser correctos. Todo depende del enfoque de las políticas de seguridad que se apliquen. 

### 5.4 - Ensure 'SQL Server Audit' is set to capture both 'failed' and 'successful logins'

```sql
SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @AuditEnabled NVARCHAR(1);
DECLARE @AuditSpecEnabled NVARCHAR(1);
DECLARE @AuditedResultSuccess NVARCHAR(1);
DECLARE @AuditedResultFailure NVARCHAR(1);

-- Verificar si Audit Enabled está activo
SELECT @AuditEnabled = 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Y' 
        ELSE 'N' 
    END
FROM sys.server_audits
WHERE is_state_enabled = 1;

-- Verificar si Audit Specification Enabled está activo
SELECT @AuditSpecEnabled = 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Y' 
        ELSE 'N' 
    END
FROM sys.server_audit_specifications
WHERE is_state_enabled = 1;

-- Verificar si audited_result incluye 'success'
SELECT @AuditedResultSuccess = 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Y' 
        ELSE 'N' 
    END
FROM sys.server_audit_specification_details
WHERE audited_result = 'SUCCESS';

-- Verificar si audited_result incluye 'failure'
SELECT @AuditedResultFailure = 
    CASE 
        WHEN COUNT(*) > 0 THEN 'Y' 
        ELSE 'N' 
    END
FROM sys.server_audit_specification_details
WHERE audited_result = 'FAILURE';

-- Devolver el resultado final
SELECT 
    CASE 
        WHEN @AuditEnabled = 'Y'
        AND @AuditSpecEnabled = 'Y'
        AND @AuditedResultSuccess = 'Y'
        AND @AuditedResultFailure = 'Y'
        THEN 'TRUE'
        ELSE 'FALSE'
    END AS validation_status;
```

 

