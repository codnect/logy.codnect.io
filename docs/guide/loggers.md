---
sidebar_position: 5
---

# Loggers

A Logger instance is used to log messages for an application. Loggers are named,
using a hierarchical dot and slash separated namespace.

For example, the logger named `codnect.io` is a parent of the logger
named `codnect.io/logy`.
Similarly, `net` is a parent of `net/http` and an ancestor of `net/http/cookiejar`

Logger names can be arbitrary strings, however it's recommended that they are based on the package name or struct name
of the logged component.

Logging messages will be forwarded to handlers attached to the loggers.

### Creating Logger

Logy provides multiple ways of creating a logger.
You can either create a new logger with the `logy.Get()` function,
which creates a named logger with the name of the package it is called from:

```go
log := logy.Get()
```

For example, a logger created in the `codnect.io/logy` package would have the
name `codnect.io/logy`.

Alternatively, you can use the `logy.Named()` function to create a named logger with a specific name:

```go
log := logy.Named("myLogger")
```

This will create a logger with the given name.

You can also use the `logy.Of()` method to create a logger for a specific type:

```go
log := logy.Of[http.Client]
```

This will create a logger with the name `net/http.Client`.

Invoking the `logy.Named()` function with the same name or the `logy.Get()`function in the same package will return
always the exact same Logger.

```go
// x and y loggers will be the same
x = logy.Named("foo")
y = logy.Named("foo")

// z and q loggers will be the same
z = logy.Get()
q = logy.Get()
```