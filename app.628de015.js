!function t(n,r,e){function o(u,c){if(!r[u]){if(!n[u]){var l="function"==typeof require&&require;if(!c&&l)return l(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var s=r[u]={exports:{}};n[u][0].call(s.exports,function(t){var r=n[u][1][t];return o(r||t)},s,s.exports,t,n,r,e)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<e.length;u++)o(e[u]);return o}({1:[function(t,n,r){"use strict";function e(t,n,r){return(0,l.h)("twitter",null,t)}function o(t,n){return function(r,e){return(0,l.h)("dash-list",null,n(t,r,e))}}function i(t,n){var r=t.i,e=n.mutation;return f[void 0===r?"undefined":c(r)](r,e)}function u(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return(0,l.h)("website",null,n?(0,l.h)("t",null,t):void 0,(0,l.h)("iframe",{src:t,frameborder:0}))}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=t("preact-cycle");window.Notification.requestPermission(),document.body.addEventListener("drop",function(t){return console.log("drop",t),t.preventDefault(),t.stopPropagation(),!1}),setTimeout(function(){return new Notification("test")},5e3);var f={string:function(t){return t},function:function(t){return{Websites:{},Twitter:function(n){return(0,l.h)("twitter",null,u("https://twitter.com/"+t(n)))},Github:function(n){return(0,l.h)("github",null,u("https://github.com/"+t(n)))},reddit:function(n){return(0,l.h)("reddit",null,u("http://old.reddit.com/"+t(n)))},p2pRocks:function(t){return(0,l.h)("p2p-rocks",null,u("https://p2p.rocks"))},dashTwitter:o("twitter-blakelapierre",e),block:function(t){return(0,l.h)("block",null,u("http://localhost:4444"))}}[t.name](t)}};new WebSocket("ws://"+window.location.hostname+":3333/lists/").addEventListener("message",function(t){console.log(t)}),(0,l.render)(function(t,n){var r=t.list;n.mutation;return(0,l.h)("dash",null,r.map(function(t){return(0,l.h)(i,{i:t})}))},{list:[function(){},function(){},function(){},function(){}]},document.body)},{"preact-cycle":"preact-cycle"}]},{},[1]);