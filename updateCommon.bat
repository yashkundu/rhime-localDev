@echo off
set cur_dir=%~dp0
for /d %%f in ("%cur_dir%\*") do if not "%%f" == "%cur_dir%\discovery" if not "%%f" == "%cur_dir%\client" if not "%%f" == "%cur_dir%\common" if not "%%f" == "%cur_dir%\userGraphView" if not "%%f" == "%cur_dir%\recommendation" start "" cd %%f ^&^& npm run updateCommon ^&^& exit