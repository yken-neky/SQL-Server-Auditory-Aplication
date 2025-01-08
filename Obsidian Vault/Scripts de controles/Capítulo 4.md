
---

> [!NOTE] MANUAL
> 4.1 - Ensure 'MUST_CHANGE' Option is set to 'ON' for All SQL Authenticated Logins

### 4.2 - Ensure 'CHECK_EXPIRATION' Option is set to 'ON' for All SQL Authenticated Logins Within the Sysadmin Role

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT l.[name], 'sysadmin membership' AS 'Access_Method'
            FROM sys.sql_logins AS l
            WHERE IS_SRVROLEMEMBER('sysadmin',name) = 1
            AND l.is_expiration_checked <> 1
            UNION ALL
            SELECT l.[name], 'CONTROL SERVER' AS 'Access_Method'
            FROM sys.sql_logins AS l
            JOIN sys.server_permissions AS p
            ON l.principal_id = p.grantee_principal_id
            WHERE p.type = 'CL' AND p.state IN ('G', 'W')
            AND l.is_expiration_checked <> 1
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```

### 4.3 - Ensure 'CHECK_POLICY' Option is set to 'ON' for All SQL Authenticated Logins

```sql
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT name, is_disabled
            FROM sys.sql_logins
            WHERE is_policy_checked = 0
        ) 
        THEN 'FALSE' 
        ELSE 'TRUE' 
    END AS validation_status;
```



