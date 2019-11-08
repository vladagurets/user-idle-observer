## User IDLE Observer
This lib allows you to track user inactivity time.

### Configs
  - **fireCbOn**: array with IDLE times
  - **cb**: callback that will triger on one of IDLE time from fireCbOn

### Example
```javascript
import IDLEObserver from 'user-idle-observer';

IDLEObserver({
  fireCbOn: [500, 1550, 4000],
  cb: ({idle}) =>  { console.log(`User IDLE ${idle}ms`) }
})
```