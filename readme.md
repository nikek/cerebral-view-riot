# Cerebral mixin for Riot
*Connects Riot tags to the necessary Cerebral state and signals*

## Usage
1. **Connect cerebral and riot through a mixin**  
Import the function exposed by `cerebral-view-riot`, it's our mixin creator/factory.
After preparing your cerebral controller you pass it to the mixin creator.

  ```js
  import Controller from 'cerebral'
  import Model from 'cerebral-model-baobab'
  import createMixin from 'cerebral-view-riot'

  const controller = Controller(Model({}))

  // global mixin - affects all tags directly
  riot.mixin(createMixin(controller))

  // named mixin - tags need to opt in with this.mixin('cerebral')
  riot.mixin('cerebral', createMixin(controller))
  ```

2. **Listen on state and trigger signals in your tags**  
Your tags now have `this.connectCerebral` available. With this method we can specify the state we want to append to `this` using paths. `connectCerebral` will start listening to changes on that state and run `this.update` whenever it changes.  
We can also specify signals we want available in our tag. You reach signals with paths too, but as the second argument to `connectCerebral`.

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

      /* We now have
       * this.list referencing state.thingsModule.list
       * this.highlight referencing state.getSignals().thingsModule.highlight
       */
    </script>
  </thing-list>
  ```
