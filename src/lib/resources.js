// export const DATA = [
//   {
//     name: "MongoDB",
//     categories: [
//       {
//         category: "NoSQL Tools",
//         topics: [
//           {
//             name: "Core Operations",
//             subtopics: [
//               { name: "how to create a collection?" },
//               { name: "how to create queries? insert/update/delete" },
//               { name: "conditional operators" },
//               { name: "limit, sort, group" },
//               { name: "how to join 2 collections?" },
//               { name: "aggregation" },
//             ],
//           },
//           {
//             name: "Indexing and Optimization",
//             subtopics: [
//               { name: "what are indexes?" },
//               { name: "when should we normalize the data in MongoDB" },
//               { name: "sharding" },
//               { name: "replication" },
//             ],
//           },
//           {
//             name: "Backup and Recovery",
//             subtopics: [{ name: "how to backup or restore?" }],
//           },
//           {
//             name: "Caching and Search",
//             subtopics: [
//               { name: "caching solutions (Redis)" },
//               { name: "caching solutions (Memcached, etc)" },
//               { name: "full text search (Elasticsearch...)" },
//             ],
//           },
//           {
//             name: "Theory",
//             subtopics: [{ name: "CAP theorem" }],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Express.js",
//     categories: [
//       {
//         category: "Frameworks",
//         topics: [
//           {
//             name: "Core Concepts",
//             subtopics: [
//               { name: "Express or Hapi or Koa or NestJs or Feathers.JS" },
//               { name: "Concepts" },
//               { name: "Configuration" },
//               { name: "Routing" },
//               { name: "Middlewares" },
//               { name: "Error handling" },
//               { name: "MVC architecture" },
//               { name: "MVCS architecture" },
//               { name: "Best practices" },
//               { name: "Optimizations" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Service Development",
//         topics: [
//           {
//             name: "API Development",
//             subtopics: [
//               {
//                 name: "Creating RESTful HTTP services (starter setup, framework, configuration, models, data access ...)",
//               },
//               { name: "API documentation (Swagger)" },
//               { name: "Stateful vs stateless services (pros/cons)" },
//               { name: "GraphQL vs REST (pros/cons)" },
//               { name: "RPC" },
//             ],
//           },
//           {
//             name: "Authentication and Authorization",
//             subtopics: [
//               {
//                 name: "Authentication / authorization (JWT, Passport strategies)",
//               },
//               {
//                 name: "Authentication / authorization (JWT, Passport strategies, ...)",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Angular",
//     categories: [
//       {
//         name: "Core Features",
//         subtopics: [
//           { name: "angular cli" },
//           { name: "template syntax" },
//           { name: "dependency injection" },
//           { name: "main attribute and structural directives" },
//         ],
//       },
//       {
//         name: "Components",
//         subtopics: [
//           { name: "component" },
//           { name: "structure (template, styling and etc)" },
//           { name: "input and output" },
//           { name: "component nesting" },
//         ],
//       },
//       {
//         name: "Forms",
//         subtopics: [
//           { name: "forms" },
//           { name: "Template driven forms" },
//           { name: "reactive forms" },
//         ],
//       },
//       {
//         name: "Routing",
//         subtopics: [
//           { name: "routermodule configuration" },
//           { name: "router directives" },
//         ],
//       },
//       {
//         name: "State Management",
//         subtopics: [
//           {
//             name: "change detection (strategy, ngzone, changedetectionref, onpush)",
//           },
//           { name: "ngrx, ngxs" },
//           {
//             name: "change detection (tick(), runoutsideangular, expressionchangederror)",
//           },
//         ],
//       },
//       {
//         name: "RxJS",
//         subtopics: [
//           { name: "rxjs (map, switchmap)" },
//           { name: "rxjs (highordered operators, subjects)" },
//           { name: "rxjs (hot cold, multicasting)" },
//           { name: "rxjs (schedulers, connectable observable)" },
//         ],
//       },
//       {
//         name: "Lifecycle Hooks",
//         subtopics: [
//           { name: "lifecycle hooks" },
//           { name: "Basis of change detection" },
//         ],
//       },
//       {
//         name: "Testing",
//         subtopics: [{ name: "unit testing" }, { name: "testbed" }],
//       },
//       {
//         name: "Architecture",
//         subtopics: [
//           { name: "build tools (webpack/rollup/gulp)" },
//           { name: "what are SPA and MPA applications, their pros/cons" },
//           {
//             name: "how to organize modularity, state management and code reuse on the project",
//           },
//           {
//             name: "ivy internal data structure (tview, lview, bloom filter)",
//           },
//         ],
//       },
//       {
//         name: "Security",
//         subtopics: [
//           { name: "content security policy" },
//           { name: "subresource integrity" },
//           { name: "sanitizing" },
//         ],
//       },
//     ],
//   },

//   {
//     name: "Node.js",
//     categories: [
//       {
//         category: "Core Node.js",
//         topics: [
//           {
//             name: "Modules",
//             subtopics: [
//               { name: "standard syntax" },
//               { name: "ES6 syntax" },
//               { name: "module load system" },
//               { name: "global scope" },
//               { name: "require" },
//               { name: "js modules" },
//               { name: "import weight" },
//             ],
//           },
//           {
//             name: "Package Managers",
//             subtopics: [
//               { name: "NPM" },
//               { name: "cli commands" },
//               { name: "package lock" },
//               { name: "package structure" },
//               { name: "npm scripts" },
//               { name: "semantic versioning" },
//               { name: "shrinkwrap" },
//               { name: "yarn" },
//             ],
//           },
//           {
//             name: "File System",
//             "sub topics": [
//               { name: "difference between os" },
//               { name: "sync/async use cases" },
//             ],
//           },
//           {
//             name: "Promises",
//             subtopics: [
//               { name: "promises in node js" },
//               { name: "async/await" },
//             ],
//           },
//           {
//             name: "APIs",
//             subtopics: [
//               { name: "file system api" },
//               { name: "stream api" },
//               { name: "timer api" },
//               { name: "path api" },
//             ],
//           },
//           {
//             name: "Advanced Topics",
//             subtopics: [
//               { name: "events" },
//               { name: "control flow (sync vs async)" },
//               { name: "nodejs web api architecture" },
//               { name: "buffer" },
//               { name: "streams" },
//               {
//                 name: "Multithreading (child process (fork, clustering), worker threads)",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Errors",
//         topics: [
//           {
//             name: "Error Handling",
//             subtopics: [
//               { name: "handling" },
//               { name: "error class" },
//               { name: "custom errors handling layer" },
//               { name: "error logging" },
//               { name: "async error events" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "CLI",
//         topics: [
//           {
//             name: "Command Line",
//             subtopics: [
//               { name: "Environment variables" },
//               { name: "command parameters" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Testing",
//         topics: [
//           {
//             name: "Testing Types",
//             subtopics: [
//               { name: "Unit testing" },
//               { name: "integration testing" },
//               { name: "e2e testing" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Diagnostics and Debugging",
//         topics: [
//           {
//             name: "Debugging",
//             subtopics: [
//               { name: "logging approaches" },
//               { name: "profiling" },
//               { name: "heap and memory analysis" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "JavaScript (Shared Across MEAN)",
//     categories: [
//       {
//         category: "JavaScript",
//         topics: [
//           {
//             name: "Arrays",
//             subtopics: [
//               {
//                 name: "Built-in Methods",
//                 items: [
//                   {
//                     name: "pop",
//                     content: `<body id="yoopta-clipboard" data-editor-id="04209841-eb69-4715-b6d6-fab1d50d5487"><p data-meta-align="left" data-meta-depth="0" style="margin-left: 0px; text-align: left">This is HTML</p></body>`,
//                   },
//                   { name: "push" },
//                   { name: "slice" },
//                   { name: "splice" },
//                   { name: "parse/stringify" },
//                   { name: "concat" },
//                   { name: "shift" },
//                   { name: "unshift" },
//                 ],
//               },
//               {
//                 type: "Operations",
//                 items: [
//                   { name: "sort" },
//                   { name: "filter" },
//                   { name: "find" },
//                   { name: "map" },
//                   { name: "reduce" },
//                 ],
//               },
//               {
//                 type: "Loops",
//                 items: [
//                   { name: "for" },
//                   { name: "while vs do while" },
//                   { name: "some" },
//                   { name: "every" },
//                   { name: "for of" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Data Types",
//             subtopics: [
//               { type: "Comparison", items: [{ name: "NULL vs undefined" }] },
//               {
//                 type: "Special Types",
//                 items: [
//                   { name: "Symbol" },
//                   { name: "Set" },
//                   { name: "Map" },
//                   { name: "WeakSet" },
//                   { name: "WeakMap" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Objects",
//             subtopics: [
//               { type: "creation" },
//               {
//                 type: "Built-in Methods",
//                 items: [
//                   { name: "assign" },
//                   { name: "keys" },
//                   { name: "values" },
//                   { name: "hasOwnProperty" },
//                   { name: "entries" },
//                 ],
//               },
//               {
//                 type: "Operations",
//                 items: [{ name: "copy" }, { name: "deep copy" }],
//               },
//               {
//                 type: "Loops",
//                 items: [
//                   { name: "for in" },
//                   { name: "for of (keys and values)" },
//                 ],
//               },
//               {
//                 type: "Properties",
//                 items: [
//                   { name: "Enumerable" },
//                   { name: "Configurable" },
//                   { name: "Writable" },
//                   { name: "Property Descriptors" },
//                 ],
//               },
//               {
//                 type: "Advanced Concepts",
//                 items: [
//                   { name: "Optional chaining" },
//                   { name: "Getters/Setters" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Functions",
//         topics: [
//           {
//             name: "Core Concepts",
//             subtopics: [
//               {
//                 type: "Function Execution",
//                 items: [
//                   { name: "Context, this" },
//                   { name: "Call, Bind, Apply" },
//                   { name: "Closures" },
//                   { name: "Global Scope" },
//                 ],
//               },
//               {
//                 type: "Advanced Function Techniques",
//                 items: [
//                   { name: "Callbacks" },
//                   { name: "Recursion" },
//                   { name: "Parameters passing by value and by reference" },
//                   { name: "Chaining" },
//                   { name: "Currying" },
//                   { name: "Arguments Binding" },
//                   { name: "Memoization" },
//                 ],
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Promises",
//         topics: [
//           {
//             name: "Promise Concepts",
//             subtopics: [
//               { name: "Chaining" },
//               { name: "Callback hell" },
//               { name: "error handling" },
//               { name: "async/await" },
//               { name: "loops and promises" },
//               { name: "promise.all()" },
//               { name: "promise.allsettled()" },
//               { name: "promise.any()" },
//               { name: "promise.race()" },
//               { name: "how to make promise from callback (wrapping)" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Classes and OOP",
//         topics: [
//           {
//             name: "OOP Concepts",
//             subtopics: [
//               { name: "oop" },
//               { name: "classes" },
//               { name: "prototype" },
//               { name: "constructor" },
//               { name: "inheritance" },
//               { name: "set/get" },
//               { name: "public, static, private methods" },
//               { name: "prototypal inheritance" },
//               { name: "super keyword" },
//               { name: "static keyword" },
//               { name: "singleton pattern" },
//               { name: "instance of operation" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Errors",
//         topics: [
//           { name: "Handling" },
//           { name: "Throws" },
//           { name: "Custom errors" },
//         ],
//       },
//       {
//         category: "Regular Expressions",
//         topics: [
//           {
//             name: "RegExp",
//             subtopics: [
//               {
//                 name: "string methods and flags (match, matchall, test, g/i)",
//               },
//               { name: "replacements" },
//               { name: "ranges" },
//               { name: "grouping" },
//               { name: "greedy and lazy search" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Iterators and Generators",
//         topics: [
//           {
//             name: "Iteration",
//             subtopics: [
//               { name: "iterators" },
//               { name: "yield" },
//               { name: "generators" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "JS Under the Hood",
//         topics: [
//           {
//             name: "Execution",
//             subtopics: [
//               { name: "event loop" },
//               { name: "micro/macro/render/idle/event queues" },
//               { name: "module system (require, js module, import)" },
//               {
//                 name: "node.js event loop (flow, stages, limitations, libuv)",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Client-Side",
//         topics: [
//           {
//             name: "Browser Concepts",
//             subtopics: [
//               { name: "global object window (location, document, cookies)" },
//               {
//                 name: "nodes modification (node properties, attributes, data attributes, styling)",
//               },
//               {
//                 name: "dom manipulation (selection, traversing, modification)",
//               },
//               {
//                 name: "event handling (mouse, event listeners, propagation)",
//               },
//               { name: "ajax (fetch)" },
//               { name: "BOM" },
//               { name: "module system (require, js modules, import)" },
//               { name: "event loop (web api, call stack, queue)" },
//               { name: "cssom" },
//               {
//                 name: "event loop (micro/macro/render/idle/event queues, queues priority and order of consumption)",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "TypeScript (Used in Angular and Node.js)",
//     categories: [
//       {
//         category: "TypeScript",
//         topics: [
//           {
//             name: "Types",
//             subtopics: [
//               {
//                 type: "Core Types",
//                 items: [
//                   { name: "Primitives" },
//                   { name: "Unions" },
//                   { name: "Functions" },
//                   { name: "Custom Types" },
//                 ],
//               },
//               {
//                 type: "Generics",
//                 items: [
//                   { name: "Generic" },
//                   { name: "Partial" },
//                   { name: "Omit" },
//                   { name: "ReturnType" },
//                 ],
//               },
//               {
//                 type: "Advanced Types",
//                 items: [
//                   { name: "Guards" },
//                   { name: "Conditions" },
//                   { name: "Mappings" },
//                 ],
//               },
//             ],
//           },
//           {
//             name: "Configuration and Features",
//             subtopics: [
//               { name: "ts module system, resolution" },
//               { name: "describing variables" },
//               { name: "read-only properties, etc" },
//               { name: "infer" },
//               { name: "decorators understanding" },
//               { name: "build using tsc, tsconfig" },
//             ],
//           },
//           {
//             name: "OOP in TypeScript",
//             subtopics: [
//               { name: "classes" },
//               { name: "interfaces" },
//               { name: "inheritance" },
//               { name: "abstract classes" },
//               { name: "generic classes" },
//               { name: "access modifiers" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Supporting Technologies",
//     categories: [
//       {
//         category: "HTML",
//         topics: [
//           {
//             name: "HTML Concepts",
//             subtopics: [
//               { name: "How to build responsive web pages" },
//               { name: "URI URL (mailto, ...)" },
//               { name: "Audio" },
//               { name: "video" },
//               { name: "bom" },
//               { name: "cssom" },
//               { name: "ally specifications" },
//               { name: "responsive vs adaptive design" },
//               { name: "mobile first" },
//               { name: "desktop first" },
//               {
//                 name: "Progressive Enhancement vs Graceful Degradation approaches",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "CSS",
//         topics: [
//           {
//             name: "CSS Concepts",
//             subtopics: [
//               { name: "Standard and box block model" },
//               { name: "display property" },
//               {
//                 name: "transition, key frames, transformation, rotation, scaling",
//               },
//               { name: "pseudo-class and pseudo-elements" },
//               {
//                 name: "media queries (syntax and declaration, types, usage)",
//               },
//               { name: "visual effects (shadow, rounded corners, gradients)" },
//               {
//                 name: "positioning (document flow, position properties, overflow and z-index)",
//               },
//               { name: "flexbox (flex layout, axis, directions) or grid" },
//               { name: "CSS pre/post-processors (less, sass/scss, stylus)" },
//               { name: "frameworks" },
//               { name: "animations (transition/@keyframes)" },
//               { name: "media queries" },
//               { name: "import notation" },
//               { name: "animations via css and js" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Web Security",
//         topics: [
//           {
//             name: "Security Concepts",
//             subtopics: [
//               { name: "OWASP Top 10" },
//               { name: "CORS" },
//               { name: "XSS" },
//               { name: "XSRF" },
//               { name: "SQL Injection" },
//               { name: "Auth (JWT, OAuth, Basic)" },
//               { name: "CSP" },
//               { name: "possible protections" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Web Communication Protocols",
//         topics: [
//           {
//             name: "Protocols",
//             subtopics: [
//               { name: "http" },
//               { name: "https" },
//               { name: "basic understanding of RESTful API" },
//               { name: "http vs https" },
//               { name: "RESTful API" },
//               { name: "http vs https vs http/2 vs http/3" },
//               { name: "tcp vs udp" },
//               { name: "ws vs polling" },
//               { name: "RESTful vs RPC (JSON RPC) vs GraphQL" },
//               { name: "tcp/ip vs OSI model" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Development Practices",
//     categories: [
//       {
//         category: "Software Engineering Practices",
//         topics: [
//           {
//             name: "Practices",
//             subtopics: [
//               { name: "what is code review and why it is needed?" },
//               {
//                 name: "how to establish required code quality practices in the given context (project/stream)",
//               },
//               { name: "organize corresponding knowledge sharing" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Version Control Systems (VCS)",
//         topics: [
//           {
//             name: "Git",
//             subtopics: [
//               { name: "git clone" },
//               { name: "git checkout" },
//               { name: "git commit" },
//               { name: "git push" },
//               { name: "git pull" },
//               { name: "git ignore" },
//               { name: "how to resolve conflicts on pull/push" },
//               {
//                 name: "how to revert a commit? a push? update a commit message?",
//               },
//               { name: "git rebase" },
//               { name: "branching strategies" },
//               { name: "ssh vs https" },
//               { name: "configuration" },
//               { name: "hooks" },
//               { name: "choose appropriate VCS and branching strategy" },
//               {
//                 name: "use advanced features git: hooks, tags, pruning local and remote",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "CI/CD",
//         topics: [
//           {
//             name: "CI/CD Concepts",
//             subtopics: [
//               { name: "what is CI? CD? difference between them?" },
//               {
//                 name: "code quality practices (code review, static/dynamic code analysis, etc)",
//               },
//               { name: "how do you review pull requests" },
//               { name: "how do you merge pull requests" },
//               { name: "how often do you deliver code to production server" },
//               { name: "staging, server. why do we need it?" },
//               {
//                 name: "have you ever configure Jenkins/Bamboo/TeamCity? share your experience and explain steps?",
//               },
//               { name: "design CI/CD process, analysis if for bottlenecks" },
//               { name: "implement CI/CD pipelines" },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Automated Testing",
//         topics: [
//           {
//             name: "Testing",
//             subtopics: [
//               {
//                 name: "Automated Testing on all levels of Testing Pyramid: different test approaches, non-functional requirements related to performance and how they are measured",
//               },
//               {
//                 name: "establish required test automation according to the context",
//               },
//               {
//                 name: "conduct performance testing according to performance testing objectives",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Software Design",
//         topics: [
//           {
//             name: "Design Principles",
//             subtopics: [
//               { name: "design principles (KISS, DRY, YAGNI)" },
//               { name: "design principles (Clean Code principles, SOLID)" },
//               { name: "knowledge of main programming paradigms (OOP, FP)" },
//               {
//                 name: "understanding of purpose of non-functional requirements and their measurement",
//               },
//             ],
//           },
//           {
//             name: "Patterns",
//             subtopics: [
//               {
//                 name: "architectural patterns (Layered, Client-Server, MVC)",
//               },
//               { name: "design patterns (Decorator, Singleton, Factory)" },
//               {
//                 name: "architectural patterns (n-Tier, SOA, event-driven architecture, microservices, GRASP)",
//               },
//               { name: "design patterns (Dependency Injection)" },
//             ],
//           },
//           {
//             name: "Documentation",
//             subtopics: [
//               {
//                 name: "How to create technical documentation (coding standards, software engineering diagram)",
//               },
//               {
//                 name: "How to select proper approach (patterns, 3rd party libs/frameworks) for implementation of Cross-Cutting Concerns for the whole solution and/or its significant part",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Infrastructure and Deployment",
//     categories: [
//       {
//         category: "Infrastructure and Clouds",
//         topics: [
//           {
//             name: "Cloud Services",
//             subtopics: [
//               { name: "AWS or Azure or GCP or another" },
//               {
//                 name: "Infrastructural instruments and solutions (usage experience)",
//               },
//               {
//                 name: "Cloud vs On-Premise: pros/cons (auto scaling, cross regional, availability zones, reliability, security, pay-as-you-go)",
//               },
//               {
//                 name: "Running Node apps on a VPS/DS (pm2, docker, proxies, etc.)",
//               },
//               {
//                 name: "Serverless vs Serverfull solutions: pros/cons, when to use what, etc. (AWS Lambda, Azure functions or Google Cloud Functions, etc.)",
//               },
//             ],
//           },
//           {
//             name: "Monitoring and Security",
//             subtopics: [
//               {
//                 name: "Real-time application alerting, monitoring, healthcheck (e.g. using 3rd party services)",
//               },
//               {
//                 name: "Security management in clouds (IAM roles/permissions, privileges, service restrictions, etc.)",
//               },
//             ],
//           },
//           {
//             name: "Deployment",
//             subtopics: [
//               {
//                 name: "CDN building/usage (use cases, practical experience if any)",
//               },
//               {
//                 name: "Cloud deployment strategies (A/B, Canary, Blue-Green deployment, etc.)",
//               },
//               { name: "Cloud computing (PaaS vs IaaS)" },
//               { name: "Node.js Infrastructure As Code (IaC)" },
//               {
//                 name: "Deployment (Kubernetes, Terraform, AWS CloudFormation, Google Cloud Deployment Manager)",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Docker",
//         topics: [
//           {
//             name: "Docker Concepts",
//             subtopics: [
//               { name: "Difference between up/run/start" },
//               { name: "Container states (running/paused/restarting/exited)" },
//               {
//                 name: "Event loop (Micro/Macro/Render/Idle/Event queues, queues priority and order of consumption)",
//               },
//               { name: "Create docker container" },
//               { name: "Networks available by default (bridge/none/host)?" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Performance and Optimization",
//     categories: [
//       {
//         category: "Performance Optimization",
//         topics: [
//           {
//             name: "Techniques",
//             subtopics: [
//               { name: "Project Framework Optimization Techniques" },
//               { name: "Page load optimization techniques" },
//               { name: "JavaScript Profiling and Debugging" },
//               { name: "JavaScript Performance Optimization Techniques" },
//               { name: "memory leaks (detection tools and prevention)" },
//               { name: "Compression (types, approaches)" },
//               {
//                 name: "Caching (native techniques, 3rd party services, CDN)",
//               },
//               {
//                 name: "Clusterization and application scaling Load balancing",
//               },
//               { name: "Critical Rendering Path" },
//               { name: "Repaint Reflow Understanding" },
//               { name: "Google Lighthouse/PageSpeed Insights" },
//               { name: "JavaScript Obfuscation and Minification" },
//               { name: "Long computations" },
//               { name: "Network Optimizations" },
//               { name: "Reverse proxy solutions" },
//               { name: "RAIL" },
//               { name: "Service workers / Web workers" },
//               { name: "Chrome User Experience Report (CrUX)" },
//               {
//                 name: "How to set up continuous monitoring for performance measure",
//               },
//               {
//                 name: "How to identify and mitigate/fix performance issues using real user and synthetic measures",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Service Development Optimization",
//         topics: [
//           {
//             name: "Service Optimization",
//             subtopics: [
//               { name: "Service monitoring techniques" },
//               { name: "Stress / load, performance testing" },
//               { name: "Caching approaches and solutions" },
//               {
//                 name: "Understanding difference between Sync vs Async services communication",
//               },
//               { name: "When to use queues (Kafka, SQS, RabbitMQ, ...)" },
//               {
//                 name: "Application (performance) scalability approaches and techniques",
//               },
//               {
//                 name: "Availability, Reliability and fail tolerance techniques",
//               },
//               { name: "Async services communication" },
//               { name: "Queues" },
//               { name: "Message Brokers (RabbitMQ, Kafka, SQS, SNS ...)" },
//               {
//                 name: "Criticality matrix (and usage for error handling approaches)",
//               },
//               { name: "Consumer driven contract (pact, etc.)" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Software Engineering Processes",
//     categories: [
//       {
//         category: "Processes",
//         topics: [
//           {
//             name: "SDLC and Methodologies",
//             subtopics: [
//               { name: "SDLC major stages and roles etc" },
//               {
//                 name: "Main software development methodologies (Agile, Waterfall)",
//               },
//               { name: "Agile frameworks (Scrum, Kanban), roles/events" },
//               { name: "Main issue tracking systems (JIRA, etc)" },
//               { name: "Agile frameworks: pros and cons." },
//             ],
//           },
//           {
//             name: "Estimation",
//             subtopics: [
//               { name: "estimate the work via simple decomposition" },
//               {
//                 name: "Estimation techniques (by analogy, by experts, planning poker, decomposition, bucket, t-shirt, story points)",
//               },
//               {
//                 name: "Estimation notions (relative and absolute units) = Understanding purpose of DoR and DoD",
//               },
//               {
//                 name: "How to improve estimation in case of under/over estimation",
//               },
//               { name: "How to estimate unknown tasks" },
//             ],
//           },
//           {
//             name: "Metrics and Delivery",
//             subtopics: [
//               { name: "Key project/methodology metrics" },
//               {
//                 name: "How to maintain predictability of the delivery process using metrics (how to treat metrics, what decisions to apply, etc)",
//               },
//               {
//                 name: "How to Identify the non-functional requirements and control their fulfilment",
//               },
//             ],
//           },
//         ],
//       },
//       {
//         category: "Product Engineering Skills",
//         topics: [
//           {
//             name: "Skills",
//             subtopics: [
//               { name: "Taking ownership" },
//               { name: "Data structures and algorithms (DSA)" },
//               { name: "Technical proficiency" },
//               { name: "Problem solving" },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "SQL (Optional for MEAN with Relational DBs)",
//     categories: [
//       {
//         category: "SQL",
//         topics: [
//           {
//             name: "Core SQL",
//             subtopics: [
//               { name: "the select statement (purpose, syntax)" },
//               { name: "differentiating between PK, FK" },
//               { name: "joins (inner, outer (left, right, full))" },
//               {
//                 name: "DML constructions: insert, update, delete, merge, truncate",
//               },
//               { name: "DDL constructions: create, alter, drop" },
//               {
//                 name: "subqueries (returning one row, many rows, many columns)",
//               },
//             ],
//           },
//           {
//             name: "Theory and Concepts",
//             subtopics: [
//               { name: "base theory of data normalization" },
//               { name: "understanding of data access abstraction layers" },
//               { name: "query build ORM/ODM" },
//               { name: "transactions" },
//               { name: "ACID" },
//               {
//                 name: "understanding of relationship types (1 to 1, 1 to many, many to many)",
//               },
//               { name: "understanding of the basics of relational databases" },
//               { name: "differentiating between database and DBMS" },
//               { name: "differentiate between PK, FK, and candidate keys" },
//             ],
//           },
//           {
//             name: "Administration",
//             subtopics: [
//               {
//                 name: "availability/disaster recovery approaches (backups, monitoring, replications, ...)",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

export const DATA = [
    {
        "name": "Javascript",
        "categories": [
            {
                "name": "Functions",
                "Topics": [
                    {
                        "name": "Arrow Functions",
                        "Content": "<h1>Hello World</h1>"
                    },
                    { "name": "Closures" },
                    { "name": "Higher-Order Functions" },
                    { "name": "Async/Await" },
                    { "name": "Callbacks" }
                ]
            },
            {
                "name": "Variables",
                "Topics": [
                    "var vs let vs const",
                    "Scope",
                    "Hoisting",
                    "Template Literals"
                ]
            },
            {
                "name": "Objects",
                "Topics": [
                    "Prototypes",
                    "Classes",
                    "Object Methods",
                    "Destructuring"
                ]
            }
        ]
    },
    {
        "name": "Python",
        "categories": [
            {
                "name": "Control Flow",
                "Topics": [
                    "If-Else Statements",
                    "Loops",
                    "Exception Handling",
                    "Comprehensions"
                ]
            },
            {
                "name": "Data Structures",
                "Topics": [
                    "Lists",
                    "Dictionaries",
                    "Tuples",
                    "Sets"
                ]
            }
        ]
    },
    {
        "name": "React",
        "categories": [
            {
                "name": "Components",
                "Topics": [
                    "Functional Components",
                    "Class Components",
                    "Props",
                    "State"
                ]
            },
            {
                "name": "Hooks",
                "Topics": [
                    "useState",
                    "useEffect",
                    "useContext",
                    "Custom Hooks"
                ]
            }
        ]
    }
];
