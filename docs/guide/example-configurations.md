---
sidebar_position: 7
---

# Examples of YAML Configuration

Here are the examples of yaml logging configuration:

*Console Logging Configuration*

```yaml
logy:
  level: INFO

  console:
    enabled: true
    # Send output to stderr
    target: stderr
    format: "%d{2006-01-02 15:04:05.000} %l [%x{traceId},%x{spanId}] %p : %s%e%n"
    # Disable color coded output
    color: false
    level: DEBUG
```

*Console Json Logging Configuration*

```yaml
logy:
  level: INFO
  console:
    enabled: true
    # Send output to stderr
    target: stderr
    level: DEBUG
    json:
      enabled: true
      excluded-keys:
        - level
        - logger
      key-overrides:
        timestamp: "@timestamp"
      additional-fields:
        application-name: "my-logy-app"
```

*File Logging Configuration*

```yaml
logy:
  level: INFO
  file:
    enabled: true
    level: TRACE
    format: "d{2006-01-02 15:04:05} %p %s%e%n"
    # Send output to a file_trace.log under the /var directory
    name: file_trace.log
    path: /var
```

*File Json Logging Configuration*

```yaml
logy:
  level: INFO
  file:
    enabled: true
    level: TRACE
    # Send output to a file_trace.log under the /var directory
    name: file_trace.log
    path: /var
    json:
      enabled: true
      excluded-keys:
        - level
        - logger
      key-overrides:
        timestamp: "@timestamp"
      additional-fields:
        application-name: "my-logy-app"
```