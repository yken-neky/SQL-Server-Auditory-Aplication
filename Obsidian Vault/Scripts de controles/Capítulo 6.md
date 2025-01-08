
---

> [!NOTE] MANUAL
> 6.1 - Ensure Database and Application User Input is Sanitized

### 6.2 - Ensure 'CLR Assembly Permission Set' is set to 'SAFE_ACCESS' for All CLR Assemblies

USE <database_name>;
GO

SET NOCOUNT ON;
SET ANSI_WARNINGS OFF;

DECLARE @RowsCount INT;
DECLARE @SafeAccessCount INT;

-- Verificar si se devuelven filas
SELECT @RowsCount = COUNT(*)
FROM sys.assemblies
WHERE is_user_defined = 1 AND name <> 'Microsoft.SqlServer.Types';

-- Verificar si las filas devueltas tienen 'SAFE_ACCESS' en 'permission_set_desc'
SELECT @SafeAccessCount = COUNT(*)
FROM sys.assemblies
WHERE is_user_defined = 1 AND name <> 'Microsoft.SqlServer.Types'
AND permission_set_desc = 'SAFE_ACCESS';

-- Realizar la validación y devolver el resultado final
SELECT 
    CASE 
        WHEN @RowsCount > 0 
        AND @SafeAccessCount = @RowsCount 
        THEN 'TRUE' 
        ELSE 'FALSE' 
    END AS validation_status;


