if [ "$USE_LOCAL_BROWSER" = true ] ;
then
  echo 'Running smoke test using a local browsers'
  npm run e2e:local-chrome & npm run e2e:local-firefox
else
  echo 'Running smoke test using browserstack'
  npm run e2e:top-browsers
fi
