# Client-Side Prototype Pollution Tools

## Match rules for Burp Software Version Reporter extension

Match rules that passively detect vulnerable libraries even in minified JS code.

**Rules:** [match_rules/match-rules.tab](/match_rules/match-rules.tab)  
**Extension:** [Software Version Reporter](https://portswigger.net/bappstore/ae62baff8fa24150991bad5eaf6d4d38)

![Screenshot at 08-56-42](https://user-images.githubusercontent.com/3295867/132972901-d60e742e-a4ad-4759-a079-4f96b870e4b1.png)

## Prototype Checker

JS script that highlights custom fields in prototypes and constructors that can be useful in exploiting Prototype Pollution.

**Script:** [prototype_checker/prototype_checker.js](/prototype_checker/prototype_checker.js)  
**Script Gadget Example:** TODO

![Screenshot at 18-34-30](https://user-images.githubusercontent.com/3295867/132973030-42b61f1c-f25d-451c-a034-1788d2fb0ff9.png)