if [ "$USE_LOCAL_BROWSER" = true ] ;
then
  echo 'Running smoke test using a local browsers'
  npm run e2e:local-browsers
else
  echo 'Running smoke test using browserstack'
  npm run e2e:bs-browsers
fi
