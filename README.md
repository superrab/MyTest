Test javascript application.

Server serves up index.html which then uses ajax to replace the container of this page. Subsequent calls instantiate
classes which know what elements in the html to replace and then do so when calling render() with an optional callback afterRender().