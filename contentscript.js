// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var siteConfig = {};
const predicate = (configItem, url) => {
  if (configItem.re) {
    const re = new RegExp(configItem.re);
    return re.test(url);
  }
  if (!configItem.url) return false;
  return url.includes(configItem.url);
}

const isEmpty = (obj) => {
  if (!obj) return false;
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

try {
  chrome.storage.managed.get('config', function (data) {
    let config = [];
    if (typeof data['config'] == 'string' && data['config'].includes('[') && data['config'].includes(']')) {
      config = JSON.parse(data['config']);
    } else if (Array.isArray(data['config'])) {
      config = data['config'];
    }
    else {
      config.push(data['config']);
    }

    const currentUrl = window.location.href;
    siteConfig = config.find(e => predicate(e, currentUrl));
    console.log('siteConfig', siteConfig);
  })
} catch (e) {
  console.log(e);
}


const observer = new MutationObserver(function () {
  if (isEmpty(siteConfig)) {
    observer.disconnect();
    return;
  };
  siteConfig.html.forEach(html => {
    const items = document.querySelectorAll(html)
    if (items) {
      items.forEach(item => {
        item.remove();
      })
      if (!siteConfig.continual) {
        observer.disconnect();
      }
    }
  })
})

observer.observe(
  document,
  { subtree: true, childList: true }
);


