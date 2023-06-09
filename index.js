/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

module.exports = (opts) => {
  return {
    postcssPlugin: 'postcss-transformselectors',
    Rule(rule) {
      if (!opts.replace && !opts.transform) return;

      if (opts.replace) {
        for (let {search, replace} of opts.replace) {
          if (typeof search === 'string') {
            // always replace globally for strings
            search = new RegExp(search, 'g');
          }

          rule.selector = rule.selector.replace(search, replace);
        }
      }

      if (typeof opts.transform === 'function') {
        rule.selector = opts.transform(rule.selector, rule);
      }
    }
  };
};

module.exports.postcss = true;
