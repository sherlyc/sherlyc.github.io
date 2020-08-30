console.log("service worker script is loaded");

self.addEventListener('activated', () => {
  console.log("activated, going to request Permission");
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    })
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
    .then(function(permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
})
