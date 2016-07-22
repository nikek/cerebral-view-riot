module.exports = function(controller) {
  return {
    connectCerebral: function (statePaths, signalPaths) {
      var tag = this

      // Attach signals to tag
      if(signalPaths) {
        Object.keys(signalPaths).forEach(function(key) {
          tag[key] = controller.getSignals(signalPaths[key])
        })
      }

      // Attach state and update tag on state changes
      if(statePaths) {
        var updateState = function() {
          var shouldUpdate = false

          Object.keys(statePaths).forEach(function(key) {
            var newState = controller.get(statePaths[key])
            if (tag[key] !== newState) {
              tag[key] = newState
              shouldUpdate = true
            }
          })

          if(shouldUpdate) {
            tag.update()
          }
        }

        // Setup state listener and cleanup logic
        controller.on('change', updateState)
        tag.on('unmount', function() {
          controller.removeListener('change', updateState)
        })

        // Init
        updateState()
      }
    }
  }
}
