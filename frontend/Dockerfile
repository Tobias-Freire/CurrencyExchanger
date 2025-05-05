# Use uma imagem base do Node.js para construir o projeto
FROM node:18 AS build
WORKDIR /app

# Copie os arquivos de configuração e instale as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copie o restante do código e construa o projeto
COPY . ./
RUN npm run build

# Use uma imagem base do Nginx para servir o frontend
FROM nginx:1.25
WORKDIR /usr/share/nginx/html

# Remova os arquivos padrão do Nginx e copie os arquivos do build
RUN rm -rf ./*
COPY --from=build /app/build ./

# Exponha a porta do frontend
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]