# Тестовое задание.

Бэкэнд на Spring MVC + Tomcat + Hibernate
Фронтэнд на Angular

К сожалению, не все еще успел доделать (особенно внешний вид :) ) не совсем понятны сроки, до какой даты, можно отправлять задание, боюсь опоздать. Буду "пушить" по мере дальнейшей доработки.

## Для запуска backend'а

Скрипт для создания демо-базы в файле /backend/CreateDemoTable.sql
Настройки подключения к БД в файле /backend/src/main/resources/db.properties
Перейти в папку /backend, выполнить mvn tomcat7:run-war

## Для запуска frontend'а

В основной папке проекта выполнить: ng serve --open
Почему-то через https://stackblitz.com не запускается, еще разбираюсь почему. Ругется:
Error in 7.1.4/bundles/compiler.umd.js (2497:21)
Can't resolve all parameters for ApplicationModule: (?).


