@echo on

echo Building js from ts
call tsc --outDir dist

echo Starting Node server
node dist\server.js