/* eslint-disable no-console */

import { register } from 'register-service-worker'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function subscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {

        // Contact the third party push server. Which one is contacted by
        // pushManager is  configured internally in the browser, so we don't
        // need to worry about browser differences here.
        //
        // When .subscribe() is invoked, a notification will be shown in the
        // user's browser, asking the user to accept push notifications from
        // <yoursite.com>. This is why it is async and requires a catch.
        serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BO8tcqhK_bND6zQd-lKk6qrfP-iEkwk3mdKMIY_5kpxFrfkZAT3LxDG6OkKUyeFU9FatAFqBc3xGC0ee_2jFAJM")

        }).then(function (subscription) {

            // Update the server state with the new subscription
            return sendSubscriptionToServer(subscription);
        })
        .catch(function (e) {
            if (Notification.permission === 'denied') {
                console.warn('Permission for Notifications was denied');
            } else {
                console.error('Unable to subscribe to push.', e);
            }
        });
    });
}

/**
 * Step four: Send the generated subscription object to our server.
 */
function sendSubscriptionToServer(subscription) {

    // Get public key and user auth from the subscription object
    var key = subscription.getKey ? subscription.getKey('p256dh') : '';
    var auth = subscription.getKey ? subscription.getKey('auth') : '';

    // This example uses the new fetch API. This is not supported in all
    // browsers yet.
    return fetch('http://127.0.0.1:9090/push/subscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endpoint: subscription.endpoint,
            // Take byte[] and turn it into a base64 encoded string suitable for
            // POSTing to a server over HTTP
            key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
            auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
        })
    });
}


if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
          console.warn('Notifications aren\'t supported.');
          return;
      }

      // Check if user has disabled notifications
      // If a user has manually disabled notifications in his/her browser for 
      // your page previously, they will need to MANUALLY go in and turn the
      // permission back on. In this statement you could show some UI element 
      // telling the user how to do so.
      if (Notification.permission === 'denied') {
          console.warn('The user has blocked notifications.');
          return;
      }

      // Check is push API is supported
      if (!('PushManager' in window)) {
          console.warn('Push messaging isn\'t supported.');
          return;
      }

      navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {

          // Get the push notification subscription object
          serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription) {

              // If this is the user's first visit we need to set up
              // a subscription to push notifications
              if (!subscription) {
                  subscribe();

                  return;
              }

              // Update the server state with the new subscription
              sendSubscriptionToServer(subscription);
          })
          .catch(function(err) {
              // Handle the error - show a notification in the GUI
              console.warn('Error during getSubscription()', err);
          });
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
