#!/bin/bash

_init(){
    mkdir -p /tmp/app/
    # git pull
    # npm install
    pkg="app-webapp"
    ps -ef|grep ${pkg}|grep -v grep|awk '{print $2}'|xargs kill -9
}


_dev(){
    _init
    npm run dev > /tmp/app/${pkg}.log 2>&1 &
}


_test(){
    _init
    npm run test > /tmp/app/${pkg}.log 2>&1 &
}

_prod(){
    _init
    npm run build
    npm run start  > /tmp/app/${pkg}.log 2>&1 &
}

case "$1" in
    dev)
        _dev
        ;;
    test)
        _test
        ;;
    prod)
        _prod
        ;;
    *)
        echo $"Usage: $0 {dev|test|prod}"
        exit 2
esac

exit 0



