# Usar una imagen base de Node.js
FROM node:17

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Copiar el resto de los archivos del proyecto
COPY . .

# Instalar las dependencias
RUN npm install

RUN npm run build

FROM nginx

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY conf.d /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# RUN serve -s build

# Exponer el puerto 3000
# EXPOSE 3000

# Comando para iniciar la aplicación
# CMD ["npm", "start"]

# CMD ["serve", "-s", "build"]
