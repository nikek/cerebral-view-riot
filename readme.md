# Cerebral mixin for Riot
*Connects Riot tags to the necessary Cerebral state and signals*

## Usage
### 1. Connect cerebral and riot through a mixin
`cerebral-view-riot` gives you a mixin factory. To create the mixin it needs the cerebral controller. When you have the mixin register it with [riot.mixin](http://riotjs.com/guide/#mixins).

  ```js
  import Controller from 'cerebral'
  import Model from 'cerebral-model-baobab'
  import createMixin from 'cerebral-view-riot'

  const controller = Controller(Model({}))

  // global mixin - affects all tags directly
  riot.mixin(createMixin(controller))
  ```

### 2. Listen on state and trigger signals in your tags
All tags now have `this.connectCerebral`. Pass it an object where the keys are property names you want to populate on the tag scope and the value being a state path. `connectCerebral` will start listening to changes on that state. On changes it will repopulate the tag and run `this.update`.  
You reach signals the same way, just pass a second argument object to `connectCerebral`.

  ```html
  <thing-list>
    <ul>
      <li each="thing in list" onclick={highlight}>thing.name</li>
    </ul>

    <script>
      this.connectCerebral({
        list: ['thingsModule', 'list']
      }, {
        highlight: ['thingsModule', 'highlight']
      })
    </script>
  </thing-list>
  ```
  We now have:  
  `this.list` updated from `controller.get().thingsModule.list` on change + this.update()
  `this.highlight` referencing `controller.getSignals().thingsModule.highlight`
