if [ "$USE_LOCAL_BROWSER" = true ] ;
then
  echo 'Running smoke test using a local chrome'
  npm run e2e
else
  echo 'Running smoke test using browserstack'
  npm run e2e:top-browsers
fi
