# Use uma imagem base do Maven para compilar o projeto
FROM maven:3.9.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copie o arquivo pom.xml e as dependências
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copie o restante do código e compile o projeto
COPY src ./src
RUN mvn package -DskipTests

# Use uma imagem base do OpenJDK para rodar o aplicativo
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copie o JAR gerado para o contêiner
COPY --from=build /app/target/currencyconverter-backend-0.0.1-SNAPSHOT.jar app.jar

# Exponha a porta do backend
EXPOSE 8080

# Comando para rodar o aplicativo
ENTRYPOINT ["java", "-jar", "app.jar"]