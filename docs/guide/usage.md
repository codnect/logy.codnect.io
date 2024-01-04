---
sidebar_position: 1
---

# Getting Started

### Installation

To use Logy in your Go project, you need to first install it using the following command:

```bash
go get -u codnect.io/logy
```

After installing Logy, you can import it in your Go code like this:

```go
import "codnect.io/logy"
```

Once you've imported Logy, you can start using it to log messages.

### Usage

Here's an example of how to use Logy:

```go
package main

import (
    "context"
    "codnect.io/logy"
)

func main() {
    // logy.Get() creates a logger with the name of the package it is called from
    log := logy.Get()

    // Logging messages with different log levels
    log.Info("This is an information message")
    log.Warn("This is a warning message")
    log.Error("This is an error message")
    log.Debug("This is a debug message")
    log.Trace("This is a trace message")
}
```

The above code produces the following result.

![Output](https://user-images.githubusercontent.com/5354910/226194630-778278b0-80a5-48bd-81f7-e22e4caa96db.png)

If you want to add contextual fields to your log messages, you can use the `logy.WithValue()` function to create a new
context with the desired fields.
This function returns a new context with the additional field(s) and copies any existing contextual fields from the
original context.

You can then use the new context to log messages with contextual fields using the `I()`, `W()`, `E()`, `D()`, and `T()`
methods.
These methods accept the context as the first argument, followed by the log message itself.

```go
package main

import (
    "context"
    "codnect.io/logy"
)

func main() {
    // logy.Get() creates a logger with the name of the package it is called from
    log := logy.Get()

    // Change console log format
    err := logy.LoadConfig(&logy.Config{
        Console: &logy.ConsoleConfig{
            Enabled: true,
            Format:  "%d{2006-01-02 15:04:05.000} %l [%x{traceId},%x{spanId}] %p %c : %s%e%n",
            Color:   true,
        },
    })

    if err != nil {
        panic(err)
    }

    // logy.WithValue() returns a new context with the given field and copies any 
    // existing contextual fields if they exist.
    // This ensures that the original context is not modified and avoids any potential 
    // issues.
    ctx := logy.WithValue(context.Background(), "traceId", "anyTraceId")
    // It will create a new context with the spanId and copies the existing fields
    ctx = logy.WithValue(ctx, "spanId", "anySpanId")

    // Logging messages with contextual fields
    log.I(ctx, "info message")
    log.W(ctx, "warning message")
    log.E(ctx, "error message")
    log.D(ctx, "debug message")
    log.T(ctx, "trace message")
}
```

The above code produces the following result.

![Output](https://user-images.githubusercontent.com/5354910/226194821-bd4e7211-b829-4927-a230-eca72701957a.png)

if you want to add a contextual field to an existing context, you can use the `logy.PutValue()` function
to directly modify the context. However, note that this should not be done across multiple goroutines as it is not safe.

```go
// It will put the field into original context, so the original context is changed.
logy.PutValue(ctx, "traceId", "anotherTraceId")
```

### Parameterized Logging

Logy provides support for parameterized log messages.

```go
package main

import (
    "context"
    "codnect.io/logy"
)

func main() {
    // logy.Get() creates a logger with the name of the package it is called from
    log := logy.Get()
	
    value := 30
    // Logging a parameterized message
    log.Info("The value {} should be between {} and {}", value, 128, 256)
}
```

The output of the above code execution looks as follows:

```bash
2023-03-19 21:13:06.029186  INFO codnect.io/logy/test    : The value 30 should be between 128 and 256
```

### Setting Logy As Default Logger

`SetAsDefaultLogger` sets **logy** as default logger, so that existing applications that use `log.Printf` and related functions
will send log records to **logy's handlers.**

Here is the way of how to set **logy** as default logger:
```go
logy.SetAsDefaultLogger()
```

### JSON Logging Format

Here is an example of how to enable the JSON formatting for console handler.

```go
package main

import (
    "context"
    "codnect.io/logy"
)

func main() {
    // logy.Get() creates a logger with the name of the package it is called from
    log := logy.Get()
	
    // Enabled the Json logging
    err := logy.LoadConfig(&logy.Config{
        Console: &logy.ConsoleConfig{
            Enabled: true,
            Json: &logy.JsonConfig{
                Enabled: true,
            },
        },
    })

    if err != nil {
       panic(err)
    }

    // logy.WithValue() returns a new context with the given field and copies any
    // existing contextual fields if they exist.
    ctx := logy.WithValue(context.Background(), "traceId", "anyTraceId")
    // It will create a new context with the spanId and copies the existing fields
    ctx = logy.WithValue(ctx, "spanId", "anySpanId")

    // Logging an information message
    log.Info("This is an information message")

    // Logging an information message with contextual fields
    log.I(ctx, "info message")
}
```

The output of the above code execution looks as follows:

```bash
{"timestamp":"2023-03-20T20:59:02+03:00","level":"INFO","logger":"codnect.io/logy/test","message":"This is an information message"}
{"timestamp":"2023-03-20T20:59:02+03:00","level":"INFO","logger":"codnect.io/logy/test","message":"info message","mappedContext":{"traceId":"anyTraceId","spanId":"anySpanId"}}
```

### Error and Stack Trace Logging
If you pass an error to the logging methods as the last argument, it will print the full stack trace along with the given error.

Here is an example:

```go
package main

import (
    "context"
    "errors"
    "codnect.io/logy"
)

func main() {
    // logy.Get() creates a logger with the name of the package it is called from
    log := logy.Get()
	
    value := "anyValue"
    err := errors.New("an error occurred")

    // Note that there must not be placeholder(curly braces) for the error. 
    // Otherwise, the only error string will be printed.
    log.Info("The value {} was not inserted", value, err)
    log.Warn("The value {} was not inserted", value, err)
    log.Error("The value {} was not inserted", value, err)
    log.Debug("The value {} was not inserted", value, err)
    log.Error("The value {} was not inserted", value, err)
}
```

The output of the above code execution looks as follows:

```bash
2023-03-20 21:17:03.165347  INFO codnect.io/logy/test    : The value anyValue was not inserted
Error: an error occurred
main.main()
    /Users/burakkoken/GolandProjects/procyon-projects/logy/test/main.go:19
2023-03-20 21:17:03.165428  WARN codnect.io/logy/test    : The value anyValue was not inserted
Error: an error occurred
main.main()
    /Users/burakkoken/GolandProjects/procyon-projects/logy/test/main.go:20
2023-03-20 21:17:03.165434 ERROR codnect.io/logy/test    : The value anyValue was not inserted
Error: an error occurred
main.main()
    /Users/burakkoken/GolandProjects/procyon-projects/logy/test/main.go:21
2023-03-20 21:17:03.165438 DEBUG codnect.io/logy/test    : The value anyValue was not inserted
Error: an error occurred
main.main()
    /Users/burakkoken/GolandProjects/procyon-projects/logy/test/main.go:22
2023-03-20 21:17:03.165441 ERROR codnect.io/logy/test    : The value anyValue was not inserted
Error: an error occurred
main.main()
    /Users/burakkoken/GolandProjects/procyon-projects/logy/test/main.go:23
```
