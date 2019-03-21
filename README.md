# CSS-Inliner

> A javascript command line tool for inlining css code directly inside html file.<br>
> It can search in included css files in html and also inline them <br>
> This tool can be very useful when writing a mail template where only inline css are supported


### Installation

> Install your package globally

```shell
$ npm install -g css-inline
```

### Usage
---
> You can use it directly by providing the source file and the target file
```shell
$ css-inline source-file target-file
```
> e.g
#### style.css

```css
.box{
    width: 500px;
    height: 500px;
    background-color: blue;
}
a{
    color:red;
}
a:hover{
    color: blue;
}
```
## email-template.html
```html
<html>
<head>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <a>Welcome</a>
    <div class="box">

    </div>
</body>
</html>
```
> Run the following commannd to inline the html file
```shell
$ css-inline email-template.html email-template-inlined.html
```
## Output  email-template-inlined.html
```html
<html>
<head>
    <style>
        a:hover{
            color:blue !important
        }
    </style>
</head>
<body>
    <a style="color:red">Welcome</a>
    <div class="box" style="width:500px;height:500px;background-color:blue">

    </div>
</body>
</html>
```


### Clone

- Clone this repo to your local machine using `https://github.com/israelalagbe/CSS-Inliner.git`
