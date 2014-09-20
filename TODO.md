# TODO

- [ ] include lodash node_modules to coverage and extract or use individual packages from lodash
- [ ] minify everything but mogger on build gulp task
- [ ] include all interception mode like https://github.com/saitodisse/meteor-todomvc-auth/blob/master/client/mogger-start/enable-mogger.js in Mogger

- [x] Break tests on many files

 * Creation
    + Tracer constructor must exist
    + ColorfulLogger dependency exists
    + can use other logger dependencies

 * Tracing
    + can trace a function
    + trace only functions that I want
    + store each traced function on targets

 * Configuration
    + global disabled
    + global disabled after
    + local disabled
    + will not log every function that starts with /ignore/
    + can add a customized beforeFunction
    + global configurations for css and size
    + show arguments inside a group
    + only show relevant arguments

 * Pause
    + show pause after some time
    + two logs but one pause only

 * Interceptors
    + interceptors will log arguments
    + global interceptors
    + local interceptors wins/overlaps global interceptors
    + several interceptors can be configured

 * SurrogateTargets
    + global surrogateTargets allow strings to define local targets
    + surrogateTargets can have multiples targets

## Colorful Logger
 + namespaces/regions (rpad) (ok)
 + multiples regions at the same line (ok)
 + limit size (ok)
 + can disable CSS (ok)
 + set color automatically (ok)
 + log inside groups: groupCollapsed(groupName, groupColor) and groupEnd (ok)
 + set ignore regex patterns (ok)

## Mogger
 + onCall (ok)
 + surrogateTargetsSource will be an array of objects


 + onReturn
 + onThrow
 + send a counter so that you will know what return have a corresponding call
