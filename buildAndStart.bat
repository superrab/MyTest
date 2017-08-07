@echo on

echo Clean dist/compiled
del dist\compiled /F /Q

echo Building js from ts
call tsc --outDir dist\compiled

echo Starting Node server
node --debug=7000 --inspect dist\compiled\server.js