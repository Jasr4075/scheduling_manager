# Scheduling Manager

Siga los pasos a continuación para configurarlo correctamente.

## Instrucciones de Instalación

1. Ejecute el siguiente comando para instalar las dependencias:

    ```bash
    npm install
    ```

2. Cree un archivo `.env` en la raíz del proyecto con el siguiente contenido:

    ```env
    POSTGRES_DB=scheduling-manager
    POSTGRES_USERNAME=postgres
    POSTGRES_PASSWORD=1172
    POSTGRES_HOST=localhost

    # TOKEN_KEY=
    ```

    Asegúrese de proporcionar los valores correctos para la base de datos PostgreSQL.

3. Configure la clave del token en la variable `TOKEN_KEY` en el archivo `.env`. Puede dejarla vacía por ahora o proporcionar un valor según sea necesario.

## Ejecución de la Aplicación

Una vez que haya completado la instalación y configuración, puede iniciar la aplicación con el siguiente comando:

```bash
npm run dev
