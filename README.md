## User IDLE Observer
This lib allows you to track user inactivity time.


### Configs
  - **idleTime**: user inactivity time in ms _// by default 2000ms_,
  - **cb**: callback that will triger after idleTime of user's IDLE _// by default console.log_,
  - **listeners**: event of user interactions _// by default ["mousemove", "mousedown", "keydown", "scroll", "touchstart"]_


### API
- **destroy**: will destroy observer instance


### Example
#### CommonJS
```javascript
import IDLEObserver from 'user-idle-observer';

var observer = IDLEObserver({
  idleTime: 5000,
  cb: function (time) { console.log(`User was innactive for ${time}ms`) },
  listeners: ["mousemove", "mousedown", "keydown"]
})
```

#### AMD
```javascript
define(['user-idle-observer'] , function (IDLEObserver) {
  var observer = IDLEObserver({
    idleTime: 5000,
    cb: function (time) { console.log(`User was innactive for ${time}ms`) },
    listeners: ["mousemove", "mousedown", "keydown"]
  })
});
```

#### Gobal scope
```javascript
<script src='.../user-idle-observer.js'></script>
<script>
  var observer = window.userIDLEObserver({
    idleTime: 5000,
    cb: function (time) { console.log(`User was innactive for ${time}ms`) },
    listeners: ["mousemove", "mousedown", "keydown"]
  });
</script>
```