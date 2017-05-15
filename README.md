# stock-data-provider-server

An example stock data provider server which proxies request to google finance just to avoid CORS issue.

# Deploy

Use docker image anandanand84/stock-data-provider to deploy. It requires your certificates to be mounted on the /certs directory

# Kubernetes

To Deploy in kuberenets just put your certs in the certs folder and run deploy.sh
