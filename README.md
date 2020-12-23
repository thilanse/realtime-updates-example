## Real time updates

This is an example project which demonstrates the possiblity of using socket io to push data from server to client.

To run this project use the following command inside the realtime-updates-example directory:

```
docker-compose up --build
```

Now visit http://localhost:3000/ to see the site.

Click the POST button to make a post request to the server.
The server creates a random data point and emits the new data to the client.
The client listens to the event and displays the new data point on the graph.
