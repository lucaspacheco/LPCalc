# Simple Calculator
Vanilla JS calculator created as sample code. Highly customizable, you can input from both mouse and keyboard (when calc is <code>:focus</code>) and perform addtion, subtraction, multiplication, division and exponentiation (power) operations.

### Demo
Visit the [Demo](http://lucaspacheco.com.br/LPCalc/) page.

## Getting started
The main goal is to provide a plugin that can integrate to your projects. That way none of CSS files are mandatory, only the JS, so you can customize one your own. 
Here is a example:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>LPCalc</title>
  </head>
  <body>
    <aside data-calc="true">
    </aside>
    <script src="../dist/lpcalc.min.js"></script>
    <script>(function(){
      var calc = new LPCalc("[data-calc='true']");
      })();</script>
  </body>
</html>
```
For a minimal visual demonstration/initial setup I've shipped one optional file. If you rather get this base instead of starting from scratch, use this setup:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>LPCalc</title>
    <link href="../dist/lpcalc.min.css" rel="stylesheet">
  </head>
  <body>
    <aside data-calc="true">
    </aside>
    <script src="../dist/lpcalc.min.js"></script>
    <script>(function(){
      var calc = new LPCalc("[data-calc='true']");
      })();</script>
  </body>
</html>
```
## Customizing
Even the structure is optional. If you want to create your own layout, just use <code>data-*</code> for each piece of the calc.:

* <code>data-calc-input</code> for the main input
* <code>data-calc-history</code> for the history of operations
* <code>data-calc-controls</code> nav wraps the operations and num-pad
* <code>data-calc-operations</code> ul wraps operations
* <code>data-calc-numpad</code> ul wraps digits
* <code>data-operation-add</code> button of addtion
* <code>data-operation-sub</code> button of subtraction
* <code>data-operation-mul</code> button of multiplication
* <code>data-operation-div</code> button of division 
* <code>data-operation-exp</code> button of exponentiation (power)
* <code>data-operation-clr</code> button of clear
* <code>data-operation-res</code> button of result
* <code>data-digit-*</code> button for digit ex: data-digit-1, data-digit-2, data-digit-3, etc...
* <code>data-digit-.</code> button for decimal marker
