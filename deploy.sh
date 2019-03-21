#!/bin/bash

rm -Rf dist/ docs/
npm run build
cp -R dist docs
