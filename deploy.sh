kubectl create secret generic certs --from-file="./certs/ca_bundle.crt,./certs/certificate.crt,./certs/private.key"
kubectl create -f ./