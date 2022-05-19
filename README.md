# Zappar for A-Frame Examples
This repository contains an AR example using the Zappar SDK for A-Frame.

For more information, check out the package page for [Zappar for A-Frame](https://www.npmjs.com/package/@zappar/zappar-aframe) (@zappar/zappar-aframe).

## Preview
​
Scan the QR code below using your native camera app or QR code reader to view the example:
​
![Preview QR Code"](preview-qr-code.png)

## Prerequisites

To get started you'll want to print out the example target images, `example-tracking-image.png` and `BusinessCard.png`.


## Trying the Examples

Due to browser restrictions surrounding use of the camera, you must use HTTPS to access the HTML files, even if doing so locally from your computer. You can use the [ZapWorks command-line tool](https://www.npmjs.com/package/@zappar/zapworks-cli) to serve a folder over HTTPS for access on your local computer, like this:
```
zapworks serve .
```

The command also lets you serve the folder for access by other devices on your local network, like this:
```
zapworks serve . --lan
```

Once this is running, open the link that's output on the console and tap the different HTML files to try the examples. If you'd like to try on a mobile device, ensure it's on the same local network as your computer, then visit the appropriate link in the console output.
