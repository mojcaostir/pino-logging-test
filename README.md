# Pino Logging test

This an example app to showcase [Pino](https://github.com/pinojs/pino) testing.

Before running the test we compile an example app. 
In the test we spawn a new child process for example app to be executed.
Example app produces logs as stdout stream. 
We are listening for new `data` events and test if the logs meet our requirements in the test.
