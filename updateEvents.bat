@echo off
set cur_dir=%~dp0
for /d %%f in ("%cur_dir%\*") do (
    set "flag="
    if "%%f" == "%cur_dir%\auth" set flag=1
    if defined flag start "" cd %%f ^&^& npm run updateEvents ^&^& exit
)