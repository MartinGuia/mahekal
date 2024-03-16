# Establecer la imagen base de Nginx
FROM nginx:alpine

# Copiar los archivos estáticos de la aplicación React al directorio de Nginx
COPY build/ /usr/share/nginx/html

# Copiar el archivo de configuración de Nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]