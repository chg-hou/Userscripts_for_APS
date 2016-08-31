// ==UserScript==
// @name        auto APS fulltext
// @namespace   auto_APS_fulltext
// @include     http://journals.aps.org.libproxy1.nus.edu.sg/*
// @include     http://journals.aps.org.libproxy1.*.edu/*
// @version     1
// @grant       none
// @run-at document-idle
// ==/UserScript==
if (!document.baseURI.endsWith('#fulltext'))
{
  document.querySelector('section.article.fulltext').querySelector('span>i.fi-plus').click();
}
