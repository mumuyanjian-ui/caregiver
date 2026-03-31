@echo off
cd /d "C:\Users\hy251\Desktop\个人文件\小黄工作室\AI开发\CodeX"
git add -A
git commit -m "自动更新: %date% %time%" 2>nul
git push origin main