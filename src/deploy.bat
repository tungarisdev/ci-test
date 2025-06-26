@echo off
set REPO_OWNER=tungarisdev
set REPO_NAME=ci-test
set ARTIFACT_NAME=app-war
set TOKEN=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
set DOWNLOAD_DIR=D:\deploy\artifact
set TOMCAT_WEBAPPS_PATH=D:\Tomcat\apache-tomcat-10.1.25\webapps

echo === LAY RUN ID MOI NHAT ===
for /f "usebackq tokens=*" %%i in (`curl -s -H "Authorization: token %TOKEN%" https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/actions/runs ^| jq ".workflow_runs[0].id"`) do set RUN_ID=%%i

echo === LAY ARTIFACT URL ===
for /f "usebackq tokens=*" %%i in (`curl -s -H "Authorization: token %TOKEN%" https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/actions/runs/%RUN_ID%/artifacts ^| jq -r ".artifacts[] | select(.name==\"%ARTIFACT_NAME%\") | .archive_download_url"`) do set ARTIFACT_URL=%%i

echo === TAI ARTIFACT ===
mkdir "%DOWNLOAD_DIR%" 2>nul
cd /d "%DOWNLOAD_DIR%"
curl -L -H "Authorization: token %TOKEN%" %ARTIFACT_URL% -o artifact.zip

echo === GIAI NEN ===
tar -xf artifact.zip

echo === TIM WAR FILE VA COPY ===
for /r %%f in (*.war) do (
    copy /Y "%%f" "%TOMCAT_WEBAPPS_PATH%\ci-testt.war"
)

echo === WAR DA COPY. ===
REM Bạn có thể restart Tomcat bằng cách gọi service, nếu có cài:
REM net stop Tomcat10 && net start Tomcat10
echo === KHOI DONG TOMCAT ===
call D:\Tomcat\apache-tomcat-10.1.25\bin\shutdown.bat
timeout /t 3 >nul
call D:\Tomcat\apache-tomcat-10.1.25\bin\startup.bat

echo === DEPLOY HOAN TAT ===
pause

