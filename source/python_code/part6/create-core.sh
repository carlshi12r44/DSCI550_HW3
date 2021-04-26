#!/bin/bash

CMD='cd /home/Solr/solr-5.3.1/ && ./bin/solr create_core -c fraud_emails_test'
docker exec -it docker_memex-geoparser_1 bash -c "$CMD"

