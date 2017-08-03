@echo on

echo Clean dist/compiled
del dist\compiled /F /Q

echo Building js from ts
call tsc --outDir dist\compiled

echo Starting Node server
node dist\server.js