function FooConstructor() {
  this.value = "bar";
  this.method = function() {
    console.log("Pretty cool.");
  };
}

function BarConstructor() {
    if (this instanceof BarConstructor) {
        this.barMethod = function() {
            console.log("Not cool.");
        };
        this.barProp = "foo!";
    }
    else {
        return new BarConstructor();
    }
}

function SimpleObject() {
    this.collection = []
    this.each = function(func) {
        for (var i = 0; i < this.collection.length; i++) {
            func(this.collection[i], i);
        }
    }
}

SimpleObject.each = function(coll, func) {
    for (var i = 0; i < coll.length; i++) {
        func(coll[i], i);
    }
}

function JQueryObject(collection) {
    this.collection = collection;
    this.length = this.collection.length;
    this.idx = function(index) {
        return this.collection[index];
    }
    this.each = function(func) {
        for (var i = 0; i < this.collection.length; i++) {
            func(this.collection[i], i);
        }
    }
    this.hasClass = function(class_name) {
        classes = this.collection[0].className.split(' ');
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] === class_name) {
                return true;
            }
        }
        return false;
    }
}

function jQuery(selector) {
    if (selector[0] === ".") {
        return new JQueryObject(document.getElementsByClassName(selector.slice(1)));
    } else if (selector[0] === '#') {
        return new JQueryObject(document.getElementById(selector.slice(1)))
    } else if (selector instanceof HTMLElement) {
        return new JQueryObject([selector]);
    } else {
        return new JQueryObject(document.getElementsByTagName(selector));
    }
}

function $(selector) {
    return jQuery(selector);
}
