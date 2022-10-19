@echo off
set cur_dir=%~dp0
for /d %%f in ("%cur_dir%\*") do if not "%%f" == "%cur_dir%\common" if not "%%f" == "%cur_dir%\discovery" start "" cd %%f ^&^& npm run updateDiscovery ^&^& exit