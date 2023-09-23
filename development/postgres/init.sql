CREATE USER backend WITH PASSWORD 'backend';
CREATE DATABASE backend;
GRANT ALL PRIVILEGES ON DATABASE backend TO backend;
\connect backend
CREATE EXTENSION "uuid-ossp";
ALTER SCHEMA public OWNER TO backend;