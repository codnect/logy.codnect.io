---
sidebar_position: 7
---

# Configure Logging

In order to configure the logging, you can use the following approaches:

* Environment Variables
* Programmatically

You can load the yaml logging configuration files as shown below.

```go
func init() {
    err := logy.LoadConfigFromYaml("logy.config.yaml")

    if err != nil {
        panic(err)
    }
}
```

As an alternative, you can configure the logging by invoking **logy.LoadConfig()** function.

```go
func init() {
    err := logy.LoadConfig(&logy.Config{
        Level:    logy.LevelTrace,
        Handlers: logy.Handlers{"console", "file"},
        Console: &logy.ConsoleConfig{
            Level:   logy.LevelTrace,
            Enabled: true,
            // this will be ignored because console json logging is enabled
            Format: "%d{2006-01-02 15:04:05.000} %l [%x{traceId},%x{spanId}] %p : %s%e%n",
            Color:   true,
            Json:    &logy.JsonConfig{
                Enabled: true,
                KeyOverrides: logy.KeyOverrides{
                    "timestamp": "@timestamp",
                },
                AdditionalFields: logy.JsonAdditionalFields{
                    "application-name": "my-logy-app",
                },
            },
        },
        File: &logy.FileConfig{
            Enabled: true,
            Name: "file_trace.log",
            Path: "/var",
            // this will be ignored because file json logging is enabled
            Format: "d{2006-01-02 15:04:05} %p %s%e%n",
            Json:    &logy.JsonConfig{
                Enabled: true,
                KeyOverrides: logy.KeyOverrides{
                    "timestamp": "@timestamp",
                },
                AdditionalFields: logy.JsonAdditionalFields{
                    "application-name": "my-logy-app",
                },
            },
        },
    })

    if err != nil {
        panic(err)
    }

}
```

### Logging Package

Logging is done on a per-package basis. Each package can be independently configured.
A configuration which applies to a package will also apply to all sub-categories of that package,
unless there is a more specific matching sub-package configuration.

For every package the same settings that are configured on ( console / file / syslog ) apply.

| Property                                            |                         Description                         |           Type | Default |
|:----------------------------------------------------|:-----------------------------------------------------------:|---------------:|:-------:|
| `logy.package`.`package-path`.`level`               |               The log level for this package                |           bool | `TRACE` |
| `logy.package`.`package-path`.`use-parent-handlers` | Specify whether this logger should user its parent handlers |           bool | `true`  |
| `logy.package`.`package-path`.`handlers`            |      The names of the handlers to link to this package      | list of string |         |

### Root Logger Configuration

The root logger is handled separately, and is configured via the following properties:

| Property        |                Description                |           Type |  Default  |
|:----------------|:-----------------------------------------:|---------------:|:---------:|
| `logy.level`    |    The log level for every log package    |           bool |  `TRACE`  |
| `logy.handlers` | The names of handlers to link to the root | list of string | [console] |

### Logging Format

By default, Logy uses a pattern-based logging format.

You can customize the format for each log handler using a dedicated configuration property.
For the console handler, the property is `logy.console.format`.

The following table shows the logging format string symbols that you can use to configure the format of the log
messages.

Supported logging format symbols:

| Symbol              |              Summary               |                                                Description                                                 |
|:--------------------|:----------------------------------:|:----------------------------------------------------------------------------------------------------------:|
| `%%`                |                `%`                 |                                           A simple `%%`character                                           |
| `%c`                |            Logger name             |                                              The logger name                                               |
| `%C`                |            Package name            |                                              The package name                                              |
| `%d{layout}`        |                Date                |                                     Date with the given layout string                                      |
| `%e`                |               Error                |                                           The error stack trace                                            |
| `%F`                |            Source file             |                                            The source file name                                            |
| `%i`                |             Process ID             |                                          The current process PID                                           |
| `%l`                |          Source location           |                          The source location(file name, line number, method name)                          |
| `%L`                |            Source line             |                                           The source line number                                           |
| `%m`                |            Full Message            |                                   The log message including error trace                                    |
| `%M`                |           Source method            |                                           The source method name                                           |
| `%n`                |              Newline               |                                         The line separator string                                          |
| `%N`                |            Process name            |                                      The name of the current process                                       |
| `%p`                |               Level                |                                      The logging level of the message                                      |
| `%s`                |           Simple message           |                                    The log message without error trace                                     |
| `%X{property-name}` |        Mapped Context Value        |                        The value from Mapped Context  `property-key=property-value`                        |
| `%x{property-name}` |  Mapped Context Value without key  |                   The value without key from Mapped Context  in format `property-value`                    |
| `%X`                |       Mapped Context Values        | All the values from Mapped Context in format `property-key1=property-value1,property-key2=property-value2` |
| `%x`                | Mapped Context Values without keys |        All the values without keys from Mapped Context in format `property-value1,property-value2`         |

### Console Handler Properties

You can configure the console handler with the following configuration properties:

| Property                                              |                                         Description                                         |                                                     Type |                   Default                    |
|:------------------------------------------------------|:-------------------------------------------------------------------------------------------:|---------------------------------------------------------:|:--------------------------------------------:|
| `logy.console.enabled`                                |                                 Enable the console logging                                  |                                                     bool |                    `true`                    |
| `logy.console.target`                                 |                              Override keys with custom values                               |                    Target(`stdout`, `stderr`, `discard`) |                   `stdout`                   |
| `logy.console.format`                                 | The console log format. Note that this value will be ignored if json is enabled for console |                                                   string | `d{2006-01-02 15:04:05.000000} %p %c : %m%n` |
| `logy.console.color`                                  |                Enable color coded output if the target terminal supports it                 |                                                     bool |                    `true`                    |
| `logy.console.level`                                  |                                    The console log level                                    | Level(`OFF`,`ERROR`,`WARN`,`INFO`,`DEBUG`,`TRACE`,`ALL`) |                   `TRACE`                    |
| `logy.console.json.enabled`                           |                             Enable the JSON console formatting                              |                                                     bool |                   `false`                    |
| `logy.console.json.excluded-keys`                     |                          Keys to be excluded from the Json output                           |                                           list of string |                                              |
| `logy.console.json.key-overrides`.`property-name`     |                              Override keys with custom values                               |                                        map[string]string |                                              |
| `logy.console.json.additional-fields`.`property-name` |                                   Additional field values                                   |                                           map[string]any |                                              |

### File Handler Properties

You can configure the file handler with the following configuration properties:

| Property                                           |                                          Description                                           |                                                     Type |                   Default                    |
|:---------------------------------------------------|:----------------------------------------------------------------------------------------------:|---------------------------------------------------------:|:--------------------------------------------:|
| `logy.file.enabled`                                |                                    Enable the file logging                                     |                                                     bool |                   `false`                    |
| `logy.file.format`                                 |     The file log format. Note that this value will be ignored if json is enabled for file      |                                                   string | `d{2006-01-02 15:04:05.000000} %p %c : %m%n` |
| `logy.file.name`                                   |                       The name of the file in which logs will be written                       |                                                   string |                  `logy.log`                  |
| `logy.file.path`                                   |                       The path of the file in which logs will be written                       |                                                   string |              Working directory               |
| `logy.file.level`                                  |                         The level of logs to be written into the file                          | Level(`OFF`,`ERROR`,`WARN`,`INFO`,`DEBUG`,`TRACE`,`ALL`) |                   `TRACE`                    |
| `logy.file.json.enabled`                           |                                Enable the JSON file formatting                                 |                                                     bool |                   `false`                    |
| `logy.file.json.excluded-keys`                     |                            Keys to be excluded from the Json output                            |                                           list of string |                                              |
| `logy.file.json.key-overrides`.`property-name`     |                                Override keys with custom values                                |                                        map[string]string |                                              |
| `logy.file.json.additional-fields`.`property-name` |                                    Additional field values                                     |                                           map[string]any |                                              |

### Syslog Handler Properties

You can configure the syslog handler with the following configuration properties:

| Property                         |                                            Description                                            |                                                                                                                                                                                                                                                                                                                          Type |                   Default                    |
|:---------------------------------|:-------------------------------------------------------------------------------------------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------:|
| `logy.syslog.enabled`            |                                     Enable the syslog logging                                     |                                                                                                                                                                                                                                                                                                                          bool |                   `false`                    |
| `logy.syslog.endpoint`           |                           The IP address and port of the syslog server                            |                                                                                                                                                                                                                                                                                                                     host:port |               `localhost:514`                |
| `logy.syslog.app-name`           |                 The app name used when formatting the message in `RFC5424` format                 |                                                                                                                                                                                                                                                                                                                        string |                                              |
| `logy.syslog.hostname`           |                       The name of the host the messages are being sent from                       |                                                                                                                                                                                                                                                                                                                        string |                                              |
| `logy.syslog.facility`           | The facility used when calculating the priority of the message in `RFC5424` and  `RFC3164` format | Facility(`kernel`,`user-level`,`mail-system`,`system-daemons`,`security`,`syslogd`,`line-printer`,`network-news`,`uucp`,`clock-daemon`,`security2`,`ftp-daemon`,`ntp`,`log-audit`,`log-alert`,`clock-daemon2`,`local-use-0`,`local-use-1`,`local-use-2`,`local-use-3`,`local-use-4`,`local-use-5`,`local-use-6`,`local-use-7` |                 `user-level`                 |
| `logy.syslog.log-type`           |                     The message format type used when formatting the message                      |                                                                                                                                                                                                                                                                                               SysLogType(`rfc5424`,`rfc3164`) |                  `rfc5424`                   |
| `logy.syslog.protocol`           |                         The protocol used to connect to the syslog server                         |                                                                                                                                                                                                                                                                                                         Protocol(`tcp`,`udp`) |                    `tcp`                     |
| `logy.syslog.block-on-reconnect` |             Enable or disable blocking when attempting to reconnect the syslog server             |                                                                                                                                                                                                                                                                                                                          bool |                   `false`                    |
| `logy.syslog.format`             |                                      The log message format                                       |                                                                                                                                                                                                                                                                                                                        string | `d{2006-01-02 15:04:05.000000} %p %c : %m%n` |
| `logy.syslog.level`              |                        The level of the logs to be logged by syslog logger                        |                                                                                                                                                                                                                                                                      Level(`OFF`,`ERROR`,`WARN`,`INFO`,`DEBUG`,`TRACE`,`ALL`) |                   `TRACE`                    |