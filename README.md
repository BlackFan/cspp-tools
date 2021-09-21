# Client-Side Prototype Pollution Tools

## Match rules for Burp Software Version Reporter extension

Match rules that passively detect vulnerable libraries even in minified JS code.

**Rules:** [match_rules/match-rules.tab](/match_rules/match-rules.tab)  
**Extension:** [Software Version Reporter](https://portswigger.net/bappstore/ae62baff8fa24150991bad5eaf6d4d38)

<img src="https://user-images.githubusercontent.com/3295867/132972901-d60e742e-a4ad-4759-a079-4f96b870e4b1.png" width="70%">

## Prototype Checker

JS script that highlights custom fields in prototypes and constructors that can be useful in exploiting Prototype Pollution.

**Script:** [prototype_checker/prototype_checker.js](/prototype_checker/prototype_checker.js)  
**Script Gadget Example:** [script.aculo.us XSS Script Gadget](https://github.com/BlackFan/client-side-prototype-pollution/blob/master/gadgets/scriptaculous.md)

![Screenshot at 18-34-30](https://user-images.githubusercontent.com/3295867/132973030-42b61f1c-f25d-451c-a034-1788d2fb0ff9.png)

## Burp pollute.js

[pollute.js](https://github.com/securitum/research/tree/master/r2020_prototype-pollution) is a script that highlights access to uninitialized properties using code instrumentation.
By adding a small script to it, you can replace all Burp Proxy HTTP responses with modified code.

### Install

* Install [pollute.js](burp_pollute/server/) dependencies
* Setup webserver to run pollute.js using [pollute.php](burp_pollute/server/pollute.php) (or write your own wrapper)
* Customize your link in [POLLUTE_JS](burp_pollute/extension/BurpExtender.java#L10)
* Build Burp Suite extension

Now you can setup logging conditions in pollute.js [PREAMBLE](burp_pollute/server/pollute.js#L13-L31). For example, to search for **DOM Clobbering** gadgets, 
replace 
  
`obj instanceof Object`  
  
with  
  
`(obj instanceof Window || obj instanceof Document)`
  
If you want to log access to properties only after **Prototype Pollution** has already triggered, add the condition  
  
`typeof Object.prototype[1337] != 'undefined'`  
  
and call the page with  
  
`?__proto__[1337]=xxx`