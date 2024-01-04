---
sidebar_position: 6
---

# Log Handlers

A log handler is a logging component that sends log messages to a writer. Logy
includes the following log handlers:

### Console Log Handler

The console log handler is enabled by default. It outputs all log messages to the console of your application.
(typically to the system's `stdout`)

### File Log Handler

The file log handler is disabled by default. It outputs all log messages to a file.
`Note that there is no support log file rotation.`

### Syslog Log Handler

The syslog log handler is disabled by default. It send all log messages to a syslog server (by default,
the syslog server runs on the same host as the application)

### External Log Handler

If you want a custom log handler, you can create your own log handler by implementing `logy.Handler` interface.
After completing its implementation, you must register it by using `logy.RegisterHandler` function.
```go
type Handler interface {
    Handle(record Record) error
    SetLevel(level Level)
    Level() Level
    SetEnabled(enabled bool)
    IsEnabled() bool
    IsLoggable(record Record) bool
    Writer() io.Writer
}
```

Here is an example of how you can register your custom handlers:

```go
// CustomHandler implements the Handler interface
type CustomHandler struct {
	
}

func newCustomHandler() *CustomHandler {
    return &CustomHandler{...}
}
...

func init() {
    logy.RegisterHandler("handlerName", newCustomHandler())
}
```