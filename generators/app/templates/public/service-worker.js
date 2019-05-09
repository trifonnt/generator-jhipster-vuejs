if (workbox) {
    console.log(`Workbox is loaded`);
	self.skipWaiting()
	self.__precacheManifest = [].concat(self.__precacheManifest || []);
	workbox.precaching.suppressWarnings();
	workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
	self.addEventListener('fetch', function(event){
		console.log("FETCH3")
    	console.log(event.request);
	});

	self.addEventListener('push', function(event) {
	  console.log('Received push');
	  let notificationTitle = 'Hello';
	  const notificationOptions = {
	    body: 'Thanks for sending this push msg.',
	    icon: './images/logo-192x192.png',
	    badge: './images/badge-72x72.png',
	    tag: 'simple-push-demo-notification',
	    data: {
	      url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/',
	    },
	  };

	  if (event.data) {
	    const dataText = event.data.text();
	    notificationTitle = 'Received Payload';
	    notificationOptions.body = `Push data: '${dataText}'`;
	  }

	  event.waitUntil(
	      self.registration.showNotification(
	        notificationTitle, notificationOptions)
  		);
	});

	self.addEventListener('notificationclick', function(event) {
	  event.notification.close();

	  let clickResponsePromise = Promise.resolve();
	  if (event.notification.data && event.notification.data.url) {
	    clickResponsePromise = clients.openWindow(event.notification.data.url);
	  }

	  event.waitUntil(
	      clickResponsePromise,	      
	  );
	});

	self.addEventListener('notificationclose', function(event) {
	  event.waitUntil(
	  	Promise.resolve()
	  );
	});
} 
else {
    console.log(`Workbox didn't load`);
}