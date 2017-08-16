# egeiro

A dive into [senecajs](http://senecajs.org).

### Three core features of senecajs
* Pattern matching:
  Use patterns to incrementally add new microservices to your system.
* Transport independence:<br/>
  Seneca provides you with transport independence because your business logic does not need <br/>
  to know how messages are transported or which service will get them. This is specified in <br/>
  the service setup code or configuration. 
* Componentisation:


### Terms

* `inbound message(s)`:  
* `action pattern`: the pattern provided in seneca.add(pattern, action).
  Set of action patterns. A seneca plugin is a set of action patterns.
* define action
  use seneca.add to add new action pattern to Seneca instance.

### seneca.add(pattern, action)
Method adds a new action pattern to the Seneca instance. It has two parameters:<br/>
* `pattern`: The property pattern to match in any JSON messages that the Seneca instance receives.<br/>
  [jsonic](https://github.com/rjrodger/jsonic) string which gets parsed into JSON object. 
* `action`: the function to execute when a pattern matches a message.<br/>
  **function (msg, respond) {}** has two parameters:
  - `msg`: the matching inbound message (provided as a plain object).
  - `respond`: a callback function that you use to provide a response to the message.<br/>  
     The respond function is a callback with the standard **error**, **result** signature.


### seneca.act(msg, response_callback)
Sends a message to a service.
* `msg`: the message object. Seneca inspects the property pattern of the message.  If
  a match is found, the action associated with the pattern gets executed. 
* `response_callback`: A function that receives the message response, if any.
  **function (err, result) {}** has two parameters.
  - **chaining calls to microsivices**<br/>
    Seneca allows for you chain calls to microservices.  Chained calls are executed in order, 
    but not in series, so their results could come back in any order.

### pattern matching
What happens if you add both patterns to the same system? How does Seneca choose which one to use? 
The more specific pattern always wins. In other words, the pattern with the highest number of matching attributes has precedence.

* Action patterns can call other action patterns to do their work.

### seneca.wrap(pin, action)
* `pin`: A pattern that matches other patterns (it “pins” them). <br/>
  The pin role:math matches the patterns role:math,cmd:sum and role:math,cmd:product that are registered with Seneca. <br/>
  [math.js](https://github.com/senecajs-attic/getting-started/blob/master/math.js)
* `action`: action extension function. 

### plugins
A Seneca plugin is just a set of action patterns. A plugin can have a name, which is used to annotate logging entries. <br/>
Plugins can be given a set of options to control their behavior.<br/>
Plugins provide a mechanism for executing initialization functions in the correct order. <br/>
For example, you want your database connection to be established before you try to read data from the database.



### seneca.use(plugin, options)
* `plugin`: plugin definition function or plugin name.
* `options`: options object for the plugin. 

### plugin logging
`node plugin-file.js --seneca.log.all`
`node plugin-file.js --seneca.log.all | grep plugin-name`

### plugin initialization
To initialize a plugin, you add a special action pattern: `init:<plugin-name>`. <br/>
This action pattern is called in sequence for each plugin. The init function must call its <br/>
respond callback without errors. If plugin initialization fails, then Seneca exits the Node.js process. <br/>
You want your microservices to fail fast (and scream loudly) when there’s a problem. <br/>
All plugins must complete initialization before any actions are executed.<br/> 
See [seneca getting-started guide](http://senecajs.org/getting-started/) for example.

### tree
Sometimes useful to see visual tree of the patterns and any overrides.
`node math-tree.js --seneca.print.tree`


## create micro services

### seneca.listen()
Creates a microservice with `seneca.listen()`.

### seneca.client()
Talk to services with `seneca.client`.

Default settings for the client and server (communicate via HTTP over port 10101)
Both `seneca.client` and `seneca.listen` accept the following parameters:
* `port`: optional integer; port number. 
* `host`: optional string; host IP address.
* `spec`: optional object; full specification object.


### seneca entity 

seneca-mongo-store calls below function in the init.
seneca.store is decorated in the seneca-entity plugin. See source for details.
seneca.store.init(seneca, opts, store)

Explored the ORM seneca setup.  It is interesting but feels like it does not fit with penseur.
seneca-mongo-store is cool would be neat to do a rethinkdb store.  But, in the end the benefits
of having it stored with seneca do not seem to be that great yet. Why not just create a penseur
object store it in a module. Then, use it wherever you want in the application.
Plus, having penseur coupled to seneca also seems counter productive.  Personally, prefer
to store all db queries in there own module. Keep db connections unique to that module. 
Then, the module can be used in any application without special stuff like seneca.


