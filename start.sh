echo ">>>>>>>>>> git fetch "
git fetch --all
git reset --hard origin/master

sleep 2;

echo ">>>>>>>>>> start nodeJS"
node testConnect.js