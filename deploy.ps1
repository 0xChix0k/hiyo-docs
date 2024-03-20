$DeployIP = "192.168.8.51"
$DeployUser = "jayanta"

yarn build
rsync -avzHSP ./build/ -e "c:/cwrsync/bin/ssh.exe -i ~/.ssh/id_rsa" ${DeployUser}@${DeployIP}:/cygdrive/d/WebApp/HiyoDoc/wwwroot --delete