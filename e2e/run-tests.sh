for i in ${BROWSERS_TO_TEST}
do
	echo "Running test for $i"
	npm run e2e:"$i" || exit 1
done
