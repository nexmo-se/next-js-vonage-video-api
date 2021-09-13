import OT from '@opentok/client';
import { useEffect } from 'react';

const apiKey = '';
const sessionId = '';
const token = '';

export default function Opentok() {
  function handleError(error) {
    if (error) {
      console.error(error);
    }
  }

  function initializeSession() {
    const session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function streamCreated(event) {
      const subscriberOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };
      session.subscribe(
        event.stream,
        'subscriber',
        subscriberOptions,
        handleError
      );
    });

    session.on('sessionDisconnected', function sessionDisconnected(event) {
      console.log('You were disconnected from the session.', event.reason);
    });

    // initialize the publisher
    const publisherOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    const publisher = OT.initPublisher(
      'publisher',
      publisherOptions,
      handleError
    );

    // Connect to the session
    session.connect(token, function callback(error) {
      if (error) {
        handleError(error);
      } else {
        // If the connection is successful, publish the publisher to the session
        session.publish(publisher, handleError);
      }
    });
  }

  useEffect(() => {
    initializeSession();
  }, []);
  return (
    <div id="videos">
      <div id="publisher"></div>
      <div id="subscriber"></div>
      <style jsx>{`
        #videos {
          position: relative;
          width: 100%;
          height: 100%;
          margin-left: auto;
          margin-right: auto;
          display: flex;
        }

        #subscriber {
          width: 360px;
          height: 240px;
        }

        #publisher {
          width: 360px;
          height: 240px;
        }
      `}</style>
    </div>
  );
}
