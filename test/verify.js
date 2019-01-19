const methods = {}
;['head', 'options', 'get', 'post', 'put', 'del', 'patch', 'all'].forEach((key) => {
  methods[key] = function(path) {
    console.log({
      methods: key,
      path: path
    })
    return {
      methods: key,
      path: path
    }
  }
})

methods['head']('/users')