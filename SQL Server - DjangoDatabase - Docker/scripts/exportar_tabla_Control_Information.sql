-- Crea la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DjangoDatabase')
BEGIN
    CREATE DATABASE DjangoDatabase;
END
GO

-- Usa la base de datos
USE DjangoDatabase;
GO

-- Crea la tabla Control_Information
CREATE TABLE Control_Information (
    id NVARCHAR(MAX),
    idx NVARCHAR(MAX),  -- Renombrar la columna 'index' a 'idx' para evitar conflictos con palabras reservadas
    name NVARCHAR(MAX),
    chapter NVARCHAR(MAX),
    description NVARCHAR(MAX),
    impact NVARCHAR(MAX),
    good_config NVARCHAR(MAX),
    ref NVARCHAR(MAX),
    bad_config NVARCHAR(MAX)
);
GO

-- Insertar datos en Control_Information
-- Capítulo 2 (16 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '1', '1', 
    'La configuración del servidor "Ad Hoc Distributed Queries" se encuentra deshabilitada.', '2', 
    'La habilitación de consultas distribuidas ad hoc permite a los usuarios consultar datos y ejecutar declaraciones sobre fuentes de datos externas. Esta funcionalidad debe estar deshabilitada', 
    'Esta función se puede utilizar para acceder de forma remota y explotar vulnerabilidades en SQL remoto Instancias de servidor y para ejecutar funciones no seguras de Visual Basic para Application', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/ad-hoc-distributed-queries-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '2', '2', 
    'La configuración del servidor "CLR Enabled" se encuentra deshabilitada.', '2', 
    'La opción clr enabled especifica si SQL Server puede ejecutar ensamblados de usuario.', 
    'Al habilitar el uso de ensamblados CLR, se amplía la superficie expuesta a ataques de SQL Server y se coloca en riesgo de ensamblajes inadvertidos y malintencionados. Si los ensamblados CLR están en uso, es posible que sea necesario rediseñar las aplicaciones para eliminarlos su uso antes de deshabilitar esta configuración. Alternativamente, algunas organizaciones pueden permitir esta configuración debe estar habilitada 1 para los ensamblados creados con el conjunto de permisos SAFE, pero no permitir ensamblados creados con el permiso UNSAFE y EXTERNAL_ACCESS más riesgoso establece.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/t-sql/statements/create-assembly-transact-sql', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '3', '3', 
    'La configuración del servidor "Cross DB Ownership Chaining" se encuentra deshabilitada ', '2', 
    'La opción de "cross db ownership chaining" controla la propiedad "cross db ownership chaining" entre todas las bases de datos a nivel de instancia (o servidor).', 
    'Cuando está habilitada, esta opción permite que un miembro del rol db_owner en una base de datos obtenga acceso a los objetos propiedad de un login en cualquier otra base de datos, causando un divulgación de información. Cuando sea necesario, el encadenamiento de propiedad entre bases de datos solo debe estar habilitado para las bases de datos específicas que lo requieran en lugar de en el nivel de instancia para todos los bases de datos mediante el comando "ALTER DATABASE<database_name>SET DB_CHAINING ON". Esta opción no se puede cambiar en las bases de datos del sistema: "master", "model" o "tempdb".', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/cross-db-ownership-chaining-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '4', '4', 
    'La configuración del servidor "Database Mail XPs" se encuentra deshabilitada ', '2', 
    'La opción "database mail XPs" de datos controla la capacidad de generar y transmitir correo electrónico mensajes de SQL Server.', 
    'Al deshabilitar la opción "database mail XPs", se reduce la superficie de SQL Server, se elimina un vector de ataque DOS y canal para exfiltrar datos desde el servidor de base de datos a un anfitrión.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/database-mail/database-mail', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '5', '5', 
    'La configuración del servidor "Ole Automation Procedures" se encuentra deshabilitada ', '2', 
    'La opción "OLE automation procedures" controla si los objetos de automatización OLE se pueden crear instancias dentro de lotes de Transact-SQL. Estos se almacenan de forma extendida procedimientos que permiten a los usuarios de SQL Server ejecutar funciones externas a SQL Server.', 
    'Habilitar esta opción aumentará la superficie expuesta a ataques de SQL Server y permitirá a los usuarios ejecutar funciones en el contexto de seguridad de SQL Server', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/ole-automation-procedures-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '6', '6', 
    'La configuración del servidor "Remote Access" se encuentra deshabilitada ', '2', 
    'Habilitar esta opción aumentará la superficie expuesta a ataques de SQL Server y permitirá a los usuarios ejecutar funciones en el contexto de seguridad de SQL Server.', 
    'Se puede abusar de la funcionalidad para lanzar un ataque de denegación de servicio (DoS) a distancia servidores mediante la descarga del procesamiento de consultas en un destino. Por Microsoft: Esta característica se eliminará en la próxima versión de Microsoft SQL Server. No utilice esta característica en nuevos trabajos de desarrollo y modifique las aplicaciones que actualmente utilice esta función lo antes posible. En su lugar, use sp_addlinkedserver.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-remote-access-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '7', '7', 
    'La configuración del servidor "Remote Admin Connections" se encuentra deshabilitada ', '2', 
    'La opción de conexiones de administrador remoto controla si una aplicación cliente en un equipo remoto puede usar la conexión de administrador dedicado (DAC)', 
    'La conexión de administrador dedicado (DAC) permite a un administrador acceder a un servidor para ejecutar funciones de diagnóstico o instrucciones Transact-SQL, o para solucionar problemas problemas en el servidor, incluso cuando el servidor está bloqueado o se ejecuta en un estado anormal y no responde a una conexión de Motor de base de datos de SQL Server. En un escenario de clúster, es posible que el administrador no haya iniciado sesión en el mismo nodo que está actualmente alojando la instancia de SQL Server y, por lo tanto, se considera "remoto". Por lo tanto, la configuración debe estar habilitada (1) para los clústeres de conmutación por error de SQL Server; de lo contrario, debe estar deshabilitado (0), que es el valor predeterminado.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/remote-admin-connections-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '8', '8', 
    'La configuración del servidor "Scan For Startup Procs" se encuentra deshabilitada ', '2', 
    'La opción examinar procesos de inicio, si está habilitada, hace que SQL Server busque y ejecute automáticamente todos los procedimientos almacenados que están configurados para ejecutarse al iniciar el servicio', 
    'La aplicación de este control reduce la amenaza de que una entidad aproveche estos recursos para fines malintencionados. Establecer Scan for Startup Procedures en 0 evitará ciertos seguimientos de auditoría y otros procedimientos almacenados de supervisión de uso común desde el reinicio en el inicio. Adicionalmente la replicación requiere que esta configuración esté habilitada (1) y cambiará automáticamente el ajuste si es necesario', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-the-scan-for-startup-procs-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '9', '9', 
    'La propiedad de bases de datos "Trustworthy" se encuentra deshabilitada ', '2', 
    'La opción de base de datos TRUSTWORTHY permite que los objetos de la base de datos accedan a objetos de otros bases de datos en determinadas circunstancias.', 
    'Provee protección contra ensamblados de CLR maliciosos o procedimientos extendidos.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/trustworthy-database-property', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '10', '10', 
    'Protocolos innecesarios de SQL Server están deshabilitados', '2', 
    'SQL Server admite los protocolos de memoria compartida, canalizaciones con nombre y TCP/IP. Sin embargo SQL Server debe configurarse para usar el mínimo requerido en función de la necesidades de la organización', 
    'El uso de menos protocolos minimiza la superficie expuesta a ataques de SQL Server y, en algunos casos, puede protegerlo de ataques remotos', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/enable-or-disable-a-server-network-protocol', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '11', '11', 
    'SQL Server está configurado para no usar puertos estándares', '2', 
    'Si se instala, a una instancia predeterminada de SQL Server se le asignará un puerto predeterminado de TCP:1433 para la comunicación TCP/IP. Los administradores también pueden configurar manualmente instancias para usar TCP:1433 para la comunicación. TCP:1433 es un servidor SQL ampliamente conocido port y esta asignación de puerto debe cambiarse. En un escenario de varias instancias, cada a la instancia se le debe asignar su propio puerto TCP/IP dedicado.', 
    'El uso de un puerto no predeterminado ayuda a proteger la base de datos de ataques dirigidos al puerto predeterminado. Cambiar el puerto predeterminado forzará que el DAC (Conexión de administrador dedicado) sea escucha en un puerto aleatorio. Además, podría hacer aplicaciones benignas, como la aplicación firewalls, requieren una configuración especial. En general, debe establecer un puerto estático para uso coherente por parte de las aplicaciones, incluidos los firewalls, en lugar de utilizar puertos dinámicos que se elegirán aleatoriamente en cada inicio de SQL Server.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '12', '12', 
    'La opción de "Hide Instance" está habilitada en instancias de producción de SQL Server', '2', 
    'Las instancias de SQL Server no agrupadas dentro de entornos de producción deben ser designado como oculto para evitar anuncios por parte del servicio Explorador de SQL Server.', 
    'La designación de instancias de SQL Server de producción como ocultas conduce a una instalación porque no se pueden enumerar. Sin embargo, las instancias agrupadas pueden quebrar si se selecciona esta opción. Este método solo evita que la instancia aparezca en la red. Si la instancia está oculto (no expuesto por el Explorador SQL), entonces las conexiones deberán especificar el servidor y puerto para conectarse. No impide que los usuarios se conecten al servidor si conocen el nombre de la instancia y el puerto. Si oculta una instancia con nombre en clúster, es posible que el servicio de clúster no pueda conectarse al SQL Server. Consulte la referencia de documentación de Microsoft.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/hide-an-instance-of-sql-server-database-engine', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '13', '13', 
    'Logueos al servidor con cuenta "sa" deshabilitados', '2', 
    'La cuenta "sa" es una cuenta de SQL Server ampliamente conocida y, a menudo, muy utilizada con privilegios de administrador del sistema. Este es el inicio de sesión original creado durante la instalación y siempre tiene el principal_id=1 y el sid=0x01. No es una buena práctica de seguridad codificar aplicaciones o scripts para usar la cuenta sa. Sin embargo, si esto se ha hecho, deshabilitar la cuenta sa evitará que los scripts y aplicaciones de autenticarse en el servidor de bases de datos y ejecutar las tareas requeridas o funciones.', 
    'La aplicación de este control reduce la probabilidad de que un atacante ejecute ataques de fuerza bruta contra un principio conocido.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-login-transact-sql', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '14', '14', 
    'Cuenta de acceso "sa" ha sido renombrada.', '2', 
    'La cuenta sa es un inicio de sesión de SQL Server ampliamente conocido y, a menudo, ampliamente utilizado con privilegios de administrador del sistema. El sa login es el inicio de sesión original creado durante la instalación y siempre tiene principal_id=1 y sid=0x01', 
    'Es más difícil lanzar ataques de adivinación de contraseñas y de fuerza bruta contra el "sa" si no se conoce el nombre. No es una buena práctica de seguridad codificar aplicaciones o scripts para usar la cuenta de acceso "sa". Sin embargo, si esto se ha hecho, cambiar el nombre del inicio de sesión sa evitará que los scripts y aplicaciones de autenticarse en el servidor de bases de datos y ejecutar las tareas requeridas o funciones.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '15', '15', 
    '"AUTO_CLOSE" está deshabilitada en bases de datos contenidas', '2', 
    'AUTO_CLOSE determina si una base de datos determinada se cierra o no después de una conexión termina. Si se habilita, las conexiones posteriores a la base de datos dada requerirán que se proceda a reabrir la base de datos y reconstruyan las cachés de procedimientos relevantes.', 
    'Dado que la autenticación de los usuarios de las bases de datos contenidas se produce dentro de la base de datos, no en el nivel de servidor/instancia, la base de datos debe abrirse cada vez para autenticar un usuario. La apertura/cierre frecuente de la base de datos consume servidor adicional recursos y puede contribuir a una denegación de servicio.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/databases/security-best-practices-with-contained-databases', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '16', '16', 
    'No existen cuentas de acceso bajo el nombre "sa".', '2', 
    'El inicio de sesión sa (por ejemplo, principal) es un servidor SQL Server ampliamente conocido y, a menudo, ampliamente utilizado cuenta. Por lo tanto, no debe haber un inicio de sesión llamado sa incluso cuando el "sa" original se ha cambiado el nombre de inicio de sesión (principal_id = 1)', 
    'La aplicación de este control reduce la probabilidad de que un atacante ejecute ataques fuerza bruta contra un nombre principal notorio', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');

-- Capítulo 3 (13 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '17', '17', 
    'Propiedad "Server Authentication" definida como "Windows Authentication Mode"', '3', 
    'Usa la autenticación de Windows para validar los intentos de conexión', 
    'Windows proporciona un mecanismo de autenticación más sólido que la autenticación de SQL Server.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/server-properties-security-page', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '18', '18', 
    'Permisos de CONNECT en el usuario "invitado" sean revocado en todas las bases de datos de SQL Server', '3', 
    'Quite el derecho del usuario invitado a conectarse a las bases de datos de SQL Server, excepto para master, msdb, tempdb.', 
    'Un inicio de sesión asume la identidad del usuario invitado cuando un inicio de sesión tiene acceso a SQL Server pero no tiene acceso a una base de datos a través de su propia cuenta y la base de datos ha una cuenta de usuario invitado. La revocación del permiso CONNECT para el usuario invitado garantizará que un inicio de sesión no puede acceder a la información de la base de datos sin acceso explícito para hacerlo.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/policy-based-management/guest-permissions-on-user-databases', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '19', '19', 
    'Usuarios huérfanos removidos de las bases de datos de SQL Server', '3', 
    'Un usuario de base de datos para el que el inicio de sesión de SQL Server correspondiente no está definido o es definido incorrectamente en una instancia de servidor no puede iniciar sesión en la instancia y se hace referencia a como huérfano y debe eliminarse.', 
    'Los usuarios huérfanos deben eliminarse para evitar un posible uso indebido de esos usuarios rotos en cualquier sentido.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/sql-server/failover-clusters/troubleshoot-orphaned-users-sql-server', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '20', '20', 
    'SQL Authentication no está siendo usada en bases de datos contenidas', '3', 
    'Las bases de datos independientes no aplican reglas de complejidad de contraseñas para usuarios SQL Authenticated', 
    'La ausencia de una política de contraseñas aplicada puede aumentar la probabilidad de que se produzca un credencial que se establece en una base de datos contenida. Si bien las bases de datos contenidas proporcionan flexibilidad para reubicar bases de datos en diferentes instancias y diferentes entornos, esto debe equilibrarse con la consideración de que no existe ningún mecanismo de directiva de contraseñas para los usuarios autenticados de SQL en bases de datos contenidas.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/databases/security-best-practices-with-contained-databases', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '21', '21', 
    'Cuenta "MSSQL Service" de SQL Server no es administrador', '3', 
    'La cuenta de servicio y/o el SID de servicio utilizado por el servicio MSSQLSERVER para un valor predeterminado instancia o <InstanceName> servicio de una instancia con nombre no debe ser miembro de el grupo Administrador de Windows, ya sea directa o indirectamente (a través de un grupo). Esto también significa que la cuenta conocida como LocalSystem (también conocida como NT AUTHORITY/SYSTEM) debe no se utilizará para el servicio MSSQL, ya que esta cuenta tiene privilegios superiores a los de SQL a los que el servicio de servidor requiere.', 
    'La herramienta SQL Server Configuration Manager siempre se debe usar para cambiar la cuenta de servicio de SQL Server. Esto asegurará que la cuenta tenga los datos necesarios privilegios. Si el servicio necesita acceso a recursos distintos del estándar de Microsoft directorios y registro definidos, es posible que sea necesario conceder permisos adicionales por separado de esos recursos.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '22', '22', 
    'Cuenta "SQLAgent Service" de SQL Server no es administrador', '3', 
    'La cuenta de servicio y/o el SID de servicio utilizado por el servicio SQLSERVERAGENT para un default instance o el servicio SQLAGENT$<InstanceName> para una instancia con nombre debe no ser miembro del grupo de administradores de Windows, ya sea directa o indirectamente (a través de un grupo). Esto también significa que la cuenta conocida como LocalSystem (también conocida como NT AUTHORITY/SYSTEM) no se debe utilizar para el servicio SQLAGENT, ya que esta cuenta tiene privilegios superiores a los que requiere el servicio SQL Server.', 
    'La herramienta SQL Server Configuration Manager siempre se debe usar para cambiar la cuenta de servicio de SQL Server. Esto asegurará que la cuenta tenga los datos necesarios privilegios. Si el servicio necesita acceso a recursos distintos de los directorios y el registro estándar definidos por Microsoft, es posible que sea necesario conceder permisos adicionales por separado de esos recursos.Si utiliza la función de reinicio automático, el servicio SQLAGENT debe ser un administrador.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '23', '23', 
    'Cuenta "Full-Text Service" de SQL Server no es administrador', '3', 
    'La cuenta de servicio y/o el SID de servicio utilizado por el servicio MSSQLFDLauncher para un instancia predeterminada o servicio MSSQLFDLauncher$<InstanceName> para una instancia con nombre no debe ser miembro del grupo de administradores de Windows, ya sea directa o indirectamente (a través de un grupo). Esto también significa que la cuenta conocida como LocalSystem (también conocida como NT AUTHORITY/SYSTEM) no debe utilizarse para el servicio de texto completo, ya que esta cuenta tiene privilegios superiores a los que requiere el servicio SQL Server.', 
    'La herramienta SQL Server Configuration Manager siempre se debe usar para cambiar el cuenta de servicio de SQL Server. Esto asegurará que la cuenta tenga los datos necesarios privilegios. Si el servicio necesita acceso a recursos distintos de los directorios y el registro estándar definidos por Microsoft, es posible que sea necesario conceder permisos adicionales por separado de esos recursos', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '24', '24', 
    'Solo están permitidos los privilegios por defecto definidos por Microsoft en el rol "public" del servidor', '3', 
    '"public" es un rol de servidor fijo especial que contiene todos los inicios de sesión. A diferencia de otras funciones de servidor fijas, los permisos se pueden cambiar para el rol público. De acuerdo con el principio de privilegios, el rol de servidor público no debe usarse para conceder permisos en el servidor ya que estos serían heredados por todos los usuarios.', 
    'Todos los inicios de sesión de SQL Server pertenecen al rol público y no se pueden quitar de este rol. Por lo tanto, los permisos otorgados a este rol estarán disponibles para todos los inicios de sesión, a menos que se hayan denegado explícitamente a inicios de sesión específicos o roles de servidor definidos por el usuario', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/server-level-roles', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '25', '25', 
    'Los grupos BUILTIN de Windows no son inicios de sesión SQL', '3', 
    'Antes de SQL Server 2008, el grupo BUILTIN/Administrators se agregaba como un grupo SQL de inicio de sesión del servidor con privilegios de administrador del sistema durante la instalación de forma predeterminada. Prácticas recomendadas promover la creación de un grupo de nivel de Directorio Activo que contenga personal de DBA aprobado cuentas y el uso de este grupo de AD controlado como inicio de sesión con privilegios de administrador del sistema. El grupo AD debe especificarse durante la instalación de SQL Server y el grupo Por lo tanto, el grupo BUILTIN/Administrators no tendría necesidad de ser un inicio de sesión.', 
    'Los grupos BUILTIN (Administrators, Everyone, Authenticated Users, Guests, etc.) por lo general, contienen miembros muy amplios que no cumplirían con las mejores prácticas de asegurarse de que solo los usuarios necesarios hayan tenido acceso a una instancia de SQL Server. Estos grupos no se deben usar para ningún nivel de acceso a una instancia de base de datos del motor SQL Server.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/server-level-roles#permissions-of-fixed-server-roles', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '26', '26', 
    'Grupos locales de Windows no son inicios de sesión SQL', '3', 
    'Los grupos locales de Windows no deben ser usados como incios de sesión para instancias de SQL Server.', 
    'Permitir grupos locales de Windows como inicios de sesión SQL proporciona una laguna en la que cualquier persona con derechos de administrador de nivel de sistema operativo (y sin derechos de SQL Server) podría agregar usuarios a la carpeta grupos locales de Windows y, por lo tanto, se otorgan a sí mismos o a otros acceso al servidor SQL Server instancia.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/authentication-access/server-level-roles#permissions-of-fixed-server-roles', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '27', '27', 
    'Rol "public" en la base de datos de sistema "msdb" no tiene permisos para acceder a los proxys de los SQL Agent', '3', 
    'El rol de base de datos "public" contiene todos los usuarios de la base de datos "msdb". Los proxies de SQL Agent definen un contexto de seguridad en el que se puede ejecutar un paso de trabajo.', 
    'La concesión de acceso a los servidores proxy del Agente SQL para el rol "public" permitiría a todos los usuarios utilizar el proxy que puede tener altos privilegios. Esto probablemente rompería el principio de privilegios mínimos.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-US/sql/ssms/agent/create-a-sql-server-agent-proxy', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '28', '28', 
    'Rol "SYSADMIN" se limita a tareas administrativas o Cuentas integradas', '3', 
    'El rol SYSADMIN es el rol a nivel de servidor con privilegios más altos en el motor de bases de datos de SQL Server. Además, por diseño, a las cuentas integradas se les concede permiso de forma predeterminada para esto de nivel de servidor diseñado por Microsoft para que el motor de base de datos funcione según lo esperado. Las siguientes cuentas virtuales/SID de servicio son miembros predeterminados de SYSADMIN: NT SERVICESQLWriter NT SERVICEWinmgmt NT SERVICEMSSQLSERVER (usado por el servicio del motor de base de datos SQL) NT SERVICESQLSERVERAGENT (utilizado por el Servicio del Agente SQL) Esto significa que el servicio cuenta para el Motor de base de datos SQL y el Agente SQL no necesita, y no debe tener, sus cuentas de servicio específicas agregado al grupo SYSADMIN por separado, ya que no es necesario.', 
    'Esto reducirá en gran medida la superficie de ataque, ya que solo se podrán acceder a cuentas limitadas y específicas. se le ha otorgado el rol de administrador del sistema. Por lo tanto, los atacantes no pueden entrar en el sistema de base de datos con cuentas privilegiadas.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-windows-service-accounts-and-permissions', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '29', '29', 
    'Miembros limitados en el rol de administrador en la base de datos "msdb"', '3', 
    'Basado en el diseño de Microsoft, una cuenta con DB_OWNER puede elevar los permisos a SYSADMIN', 
    'MSDB debe configurarse con la marca TRUSTWORTHY ON para que funcione correctamente. Si el TRUSTWORTHY se establece en ON, y si el propietario de la base de datos es miembro de un que tiene credenciales administrativas, como el grupo sysadmin (por ejemplo, el grupo SA Login), el propietario de la base de datos puede crear y ejecutar ensamblados que pueden poner en peligro la instancia de SQL Server, así como ejecutar código para elevar sus privilegios a SYSADMIN', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/trustworthy-database-property?view=sql-server-ver16', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');

-- Capítulo 4 (3 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '30', '30', 
    'Opción "MUST_CHANGE" habilitada para todos los inicios de sesión SQL autenticados', '4', 
    'Siempre que esta opción se establezca en ON, SQL Server solicitará una contraseña actualizada la primera vez que se utiliza el inicio de sesión nuevo o modificado.', 
    'Forzar un cambio de contraseña después de un restablecimiento o la creación de un nuevo inicio de sesión evitará que el administradores de cuentas o cualquier persona que acceda a la contraseña inicial por el uso indebido del inicio de sesión SQL creado sin que se note.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-login-transact-sql', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '31', '31', 
    'Opción "CHECK_EXPIRATION" habilitada para todos los inicios de sesión SQL autenticados con el rol de SYSADMIN', '4', 
    'Aplica la misma directiva de expiración de contraseñas que se usa en Windows a las contraseñas usadas dentro de SQL Server', 
    'Garantizar que los inicios de sesión de SQL cumplan con la política de contraseñas seguras aplicada por Windows Server Benchmark garantizará las contraseñas para los inicios de sesión SQL con privilegios de sysadmin se cambian con frecuencia para ayudar a evitar el compromiso a través de un ataque de fuerza bruta. CONTROL SERVER es un permiso equivalente a sysadmin y los inicios de sesión con ese también se debe requerir permiso para tener contraseñas que caduquen', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/password-policy?view=sql-server-ver15', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '32', '32', 
    'Opción "CHECK_POLICY" habilitada para todos los inicios de sesión SQL autenticados', '4', 
    'Aplica la misma directiva de complejidad de contraseñas que se usa en Windows a las contraseñas usadas dentro de SQL Server.', 
    'Asegúrese de que las contraseñas de inicio de sesión autenticadas de SQL cumplan con la política de contraseñas seguras aplicados por Windows Server Benchmark para que no puedan verse comprometidos fácilmente a través de un ataque de fuerza bruta.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/password-policy', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');

-- Capítulo 5 (4 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '33', '33', 
    'Número máximo de archivos de registro de errores es mayor o igual a 12', '5', 
    'Los archivos de registro de errores de SQL Server deben protegerse contra pérdidas. Se debe hacer una copia de seguridad de los archivos de registro antes de que se sobrescriban. Conservar más registros de errores ayuda a evitar pérdidas frecuentes reciclaje antes de que se puedan realizar copias de seguridad.', 
    'El registro de errores de SQL Server contiene información importante sobre los principales eventos del servidor y información de intento de inicio de sesión también.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/scm-services-configure-sql-server-error-logs', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '34', '34', 
    'Configuración de servidor "Default Trace Enabled" habilitada', '5', 
    'El seguimiento predeterminado proporciona un registro de auditoría de la actividad de la base de datos, incluidas las creaciones de cuentas, elevación de privilegios y ejecución de comandos DBCC.', 
    'El seguimiento predeterminado proporciona información de auditoría valiosa sobre las actividades relacionadas con la seguridad en el servidor.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/default-trace-enabled-server-configuration-option', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '35', '35', 
    'Auditorías de inicio de sesión establecidas para "failed logins"', '5', 
    'Esta configuración registrará los intentos de autenticación fallidos para los inicios de sesión de SQL Server en SQL Server Errorlog. Esta es la configuración predeterminada de SQL Server.Históricamente, esta configuración ha estado disponible en todas las versiones y ediciones de SQL Server. Antes de la disponibilidad de SQL Server Audit, este era el único mecanismo proporcionado para la captura de inicios de sesión (exitosos o fallidos).', 
    'Como mínimo, queremos asegurarnos de que se capturen los inicios de sesión fallidos para detectar si un adversario está intentando forzar las contraseñas o intentar acceder a un SQL Server incorrectamente.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/server-properties-security-page', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '36', '36', 
    'Auditoría de SQL Server establecida para capturar ambos, inicios de sesión fallidos y exitosos', '5', 
    'SQL Server Audit es capaz de capturar inicios de sesión y escritura erróneos y correctos a uno de estos tres lugares: el registro de eventos de la aplicación, el registro de eventos de seguridad o el archivo sistema. Lo usaremos para capturar cualquier intento de inicio de sesión en SQL Server, así como cualquier intento de cambiar la directiva de auditoría, los cambios en las pertenencias a roles privilegiados y los cambios a la configuración del servidor. Esto también servirá como una segunda fuente para registrar inicios de sesión fallidos', 
    'Al utilizar Auditoría en lugar de la configuración tradicional en la pestaña Seguridad para capturar inicios de sesión exitosos, reducimos el ruido en el ERRORLOG. Esto lo mantiene más pequeño y más fácil de leer para los administradores de bases de datos que intentan solucionar problemas con SQL Server. Además, el objeto Audit puede escribir en el registro de eventos de seguridad, aunque esto requiere operar Configuración del sistema. Esto proporciona una opción adicional para almacenar los eventos de inicio de sesión, especialmente en conjunto con un SIEM.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/create-a-server-audit-and-server-audit-specification', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');

-- Capítulo 6 (2 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '37', '37', 
    'Las entradas realizadas por el usuario desde la aplicación o la base de datos están sanitizadas', '6', 
    'Valide siempre la entrada del usuario recibida de un cliente de base de datos o aplicación por tipo de prueba, longitud, formato y rango antes de transmitirlo al servidor de bases de datos.', 
    'La desinfección de la entrada del usuario minimiza drásticamente el riesgo de inyección SQL. La desinfección de la entrada del usuario puede requerir cambios en el código de la aplicación o en la sintaxis de los objetos de la base de datos. Estos cambios pueden requerir que las aplicaciones o bases de datos se desconecten temporalmente. Cualquier cambio en TSQL o en el código de la aplicación debe probarse exhaustivamente en las pruebas antes de la implementación en producción.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://owasp.org/www-community/attacks/SQL_Injection', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '38', '38', 
    '"CLR Assembly Permission Set" establecido como "SAFE_ACCESS" en todos los ensamblados CLR', '6', 
    'Si se establecen los conjuntos de permisos de ensamblado CLR en SAFE_ACCESS, se dificultarán los ensamblados de acceder a recursos externos del sistema, como archivos, red, variables de entorno, o el registro.', 
    'Los ensamblados con conjuntos de permisos EXTERNAL_ACCESS o UNSAFE se pueden utilizar para tener acceso a áreas sensibles del sistema operativo, robar y/o transmitir datos y alterar el estado y otras medidas de protección del sistema operativo Windows subyacente.Los ensamblados creados por Microsoft (is_user_defined = 0) se excluyen de esta comprobación, ya que son necesarios para la funcionalidad general del sistema', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/clr-integration/security/clr-integration-code-access-security', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');

-- Capítulo 7 (5 Controles)
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '39', '39', 
    'Claves de algoritmos de cifrado simétrico establecidas en "AES_128" o mayor en bases de datos no relacionadas con el sistema', '7', 
    'De acuerdo con los procedimientos recomendados de Microsoft, solo las opciones del algoritmo AES de SQL Server, AES_128, AES_192, y AES_256, deben usarse para un algoritmo de cifrado de clave simétrica.', 
    'Elimina el uso de algoritmos débiles y obsoletos que pueden poner a un sistema en un nivel más alto en riesgo de que un atacante rompa la clave. Los datos cifrados no se pueden comprimir, pero los datos comprimidos se pueden cifrar. Si usted utiliza la compresión, debe comprimir los datos antes de cifrarlos.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-symmetric-key-transact-sql', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '40', '40', 
    'Tamaño de clave asimétrica esté establecido en mayor o igual que 2048 en bases de datos no relacionadas con el sistema', '7', 
    'Los procedimientos recomendados de Microsoft recomiendan usar al menos un algoritmo de cifrado de 2048 bits para claves asimétricas.', 
    'Un nivel de bits más alto puede dar lugar a un rendimiento más lento, pero reduce la probabilidad de que se produzca un atacante rompa la llave.Los datos cifrados no se pueden comprimir, pero los datos comprimidos se pueden cifrar. Si usted utiliza la compresión, debe comprimir los datos antes de cifrarlos.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/t-sql/statements/alter-asymmetric-key-transact-sql', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '41', '41', 
    'Las salvas de las bases de datos están encriptadas', '7', 
    'Las bases de datos pueden contener datos confidenciales. Las copias de seguridad de estos datos permiten que los datos se transmitan fácilmente cuando se migre la información de la empresa y los entornos seguros. El cifrado de la copia de seguridad hace que el acceso a los datos mucho más difíciles', 
    'Una copia de seguridad de una base de datos expuesta accidentalmente a Internet o transmitida fuera de un lugar seguro se puede restaurar fácilmente en un servidor SQL Server en cualquier lugar y su contenido puede ser descubierto.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-US/sql/relational-databases/security/encryption/choose-an-encryption-algorithm', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '42', '42', 
    'La encriptación de la red está configurada y habilitada', '7', 
    'La configuración y habilitación del cifrado de red garantiza el tráfico entre la aplicación y el sistema de base de datos está encriptado. Esto garantizará el cumplimiento de la seguridad estándares como PCI DSS, que es necesario si las conexiones se realizan a través de un red.El cifrado de red se puede configurar en SQL Server con certificados autofirmados o certificados TLS.', 
    'El cifrado de red garantizará que los datos transmitidos a través de la red estén protegidos, por lo que los atacantes no pueden filtrar contraseñas ni datos confidenciales. Esto protege contra el hombre en el ataque intermedio y los ataques de rastreo de red para exfiltrar los datos transmitidos entre el sistema de bases de datos y las aplicaciones.', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/configure-sql-server-encryption', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
INSERT INTO Control_Information (id, idx, name, chapter, description, impact, good_config, ref, bad_config) VALUES (
    '43', '43', 
    'Las bases de datos están cifradas con TDE', '7', 
    'Asegúrese de que las bases de datos de usuario estén cifradas mediante el cifrado de datos transparente (TDE). Las copias de seguridad de las bases de datos cifradas con TDE también se cifran automáticamente.', 
    'Un archivo de datos, un archivo de registro o una copia de seguridad de la base de datos expuestos accidentalmente a Internet o transmitidos fuera de un entorno seguro se puede copiar/restaurar fácilmente en un servidor SQL en cualquier lugar y sus contenidos descubiertos', 
    'Este parámetro se encuentra configurado de forma correcta en su servidor.', 
    'https://learn.microsoft.com/en-us/sql/relational-databases/security/encryption/transparent-data-encryption', 
    'Este parámetro se encuentra configurado de forma incorrecta en su servidor.');
GO
