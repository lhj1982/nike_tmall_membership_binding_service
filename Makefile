#!/usr/bin/env bash
APP = tmallnikemembership
STAGE=test
REGION=eu-west-1
DEPLOYSTORAGESTACKNAME = $(APP)-$(STAGE)-deploy-storage
BESTACKNAME = $(APP)-$(STAGE)-be
PROFILE=james

.PHONY: tmallnikemembership
wengy:
	@echo "tmallnikemembership"

.PHONY: deploy
deploy:
	mkdir -p dist
	aws cloudformation package --template-file cloudformation/cloudformation.yml --s3-bucket $(DEPLOYSTORAGESTACKNAME) --s3-prefix deploy-package --output-template-file dist/cf.yml --profile $(PROFILE)
	aws cloudformation deploy --template-file dist/cf.yml \
	--stack-name $(BESTACKNAME) \
	--region ${REGION} \
	--parameter-overrides \
	App=$(APP) \
	Stage=$(STAGE) \
	Region=$(REGION) \
	--capabilities CAPABILITY_IAM \
	--profile $(PROFILE)
	@echo "Successfully deployed."

