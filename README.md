# -CelestiaPayForBlobServer
node.js server for CelestiaPayForBlobUI

This is a Express.js server-side application for submitting Celestia PayForBlob Transactions built using Javascript and Keplr for authentication on frontend side. It allows users to do submit PFB via their Light Nodes.

Getting Started To run this application locally, follow these steps:

Clone this repository to your local machine using git clone https://github.com/bertugkara/CelestiaPayForBlobServer.git Navigate to the project directory using "cd CelestiaPayForBlobServer".

Edit the "constants.js" file change the celestia wallet address to the address which is installed and funded on your node. You will use that wallet address to pay transaction fees. You have to sign message on frontend-side with the same wallet to prove that you are the owner of it.
https://github.com/bertugkara/CelestiaPayForBlobUI.git (frontend).

Install the dependencies using "npm install"

Start the development server using "node index.js"
